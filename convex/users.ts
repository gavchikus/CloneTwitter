import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    username: v.string(),
    fullname: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) return;

    await ctx.db.insert("users", {
      username: args.username,
      fullname: args.fullname,
      email: args.email,
      bio: args.bio,
      image: args.image,
      clerkId: args.clerkId,
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
    });
  },
});

export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    if (!args.clerkId) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const isFollowing = query({
  args: { followingId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;
    
    const currentUser = await ctx.db.query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
      
    if (!currentUser) return false;

    const follow = await ctx.db.query("follows")
      .withIndex("by_both", (q) => 
        q.eq("followerId", currentUser._id).eq("followingId", args.followingId)
      )
      .unique();
      
    return !!follow;
  },
});

export const toggleFollow = mutation({
  args: { followingId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentUser = await ctx.db.query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser || currentUser._id === args.followingId) return;

    const existing = await ctx.db.query("follows")
      .withIndex("by_both", (q) => 
        q.eq("followerId", currentUser._id).eq("followingId", args.followingId)
      )
      .unique();

    const target = await ctx.db.get(args.followingId);
    if (!target) throw new Error("Target user not found");

    if (existing) {
      await ctx.db.delete(existing._id);
      await ctx.db.patch(currentUser._id, { 
        followingCount: Math.max(0, (currentUser.followingCount || 1) - 1) 
      });
      await ctx.db.patch(args.followingId, { 
        followersCount: Math.max(0, (target.followersCount || 1) - 1) 
      });
    } else {
      // Підписка
      await ctx.db.insert("follows", { 
        followerId: currentUser._id, 
        followingId: args.followingId 
      });
      await ctx.db.patch(currentUser._id, { 
        followingCount: (currentUser.followingCount || 0) + 1 
      });
      await ctx.db.patch(args.followingId, { 
        followersCount: (target.followersCount || 0) + 1 
      });
      
      // Створення сповіщення
      await ctx.db.insert("notifications", { 
        receiverId: args.followingId, 
        senderId: currentUser._id, 
        type: "follow", 
        read: false 
      });
    }
  },
});

export const getAuthenticatedUser = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  return await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q: any) => q.eq("clerkId", identity.subject))
    .unique();
};