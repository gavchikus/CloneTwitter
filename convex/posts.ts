import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    let currentUserId = null;

    if (identity) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("userId", identity.subject))
        .first();
      if (user) currentUserId = user._id;
    }

    const posts = await ctx.db.query("posts").order("desc").collect();

    return Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.userId);

        let isLiked = false;
        let isBookmarked = false;

        if (currentUserId) {
          const like = await ctx.db
            .query("likes")
            .withIndex("by_user_and_post", (q) =>
              q.eq("userId", currentUserId!).eq("postId", post._id)
            )
            .first();
          isLiked = !!like;

          const bookmark = await ctx.db
            .query("bookmarks")
            .withIndex("by_user_and_post", (q) =>
              q.eq("userId", currentUserId!).eq("postId", post._id)
            )
            .first();
          isBookmarked = !!bookmark;
        }

        return {
          ...post,
          author,
          isLiked,
          isBookmarked,
        };
      })
    );
  },
});