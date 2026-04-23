import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const toggleLike = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");

    const existingLike = await ctx.db
      .query("likes")
      .withIndex("by_user_post", (q) =>
        q.eq("userId", user._id).eq("postId", args.postId)
      )
      .unique();

    if (existingLike) {
      await ctx.db.delete(existingLike._id);
      await ctx.db.patch(args.postId, {
        likesCount: Math.max(0, (post.likesCount || 0) - 1),
      });
      return false;
    } else {
      await ctx.db.insert("likes", {
        userId: user._id,
        postId: args.postId,
      });
      await ctx.db.patch(args.postId, {
        likesCount: (post.likesCount || 0) + 1,
      });

      if (post.userId !== user._id) {
        await ctx.db.insert("notifications", {
          receiverId: post.userId,
          senderId: user._id,
          type: "like",
          postId: args.postId,
        });
      }
      return true;
    }
  },
});

export const getPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.userId);
        return { ...post, author };
      })
    );
  },
});