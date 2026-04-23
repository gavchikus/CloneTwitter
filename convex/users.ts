import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";

export const getAuthenticatedUser = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .unique();
};

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    username: v.string(),
    fullname: v.string(),
    image: v.string(),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) return existingUser._id;

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      username: args.username,
      fullname: args.fullname,
      image: args.image,
      bio: args.bio || "",
      followers: 0,
      following: 0,
      posts: 0,
    });
  },
});