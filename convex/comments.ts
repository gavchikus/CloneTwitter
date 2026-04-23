import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const addComment = mutation({
  args: { postId: v.id("posts"), content: v.string() },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");

    await ctx.db.insert("comments", {
      userId: user._id,
      postId: args.postId,
      content: args.content,
    });

    await ctx.db.patch(args.postId, {
      commentsCount: (post.commentsCount || 0) + 1,
    });

    if (post.userId !== user._id) {
      await ctx.db.insert("notifications", {
        receiverId: post.userId,
        senderId: user._id,
        type: "comment",
        postId: args.postId,
      });
    }
  },
});

export const getComments = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();

    return Promise.all(
      comments.map(async (comment) => {
        const author = await ctx.db.get(comment.userId);
        return { ...comment, author };
      })
    );
  },
});