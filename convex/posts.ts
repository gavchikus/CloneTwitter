import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const MAX_POST_LENGTH = 280;

export const getFeed = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_createdAt")
      .order("desc")
      .take(50);
  },
});

export const createPost = mutation({
  args: {
    text: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("No auth");
    }

    const text = args.text.trim();

    if (!text) {
      throw new Error("text is required");
    }

    if (text.length > MAX_POST_LENGTH) {
      throw new Error(`must be ${MAX_POST_LENGTH} characters or less`);
    }

    return await ctx.db.insert("posts", {
      authorId: identity.subject,
      authorName: identity.name ?? identity.email ?? "Unknown user",
      authorImageUrl: identity.pictureUrl,
      text,
      imageUrl: args.imageUrl,
      createdAt: Date.now(),
    });
  },
});
