import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    username: v.string(),
    fullname: v.string(),
    image: v.string(),
    bio: v.optional(v.string()), 
    followersCount: v.optional(v.number()), 
    followingCount: v.optional(v.number()),
    postsCount: v.optional(v.number()),
  }).index("by_clerkId", ["clerkId"]), 

  posts: defineTable({
    userId: v.id("users"),
    content: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    likesCount: v.number(),
    commentsCount: v.number(),
  }).index("by_user", ["userId"]),

  likes: defineTable({
    userId: v.id("users"),
    postId: v.id("posts"),
  })
    .index("by_user_post", ["userId", "postId"])
    .index("by_post", ["postId"]),

  bookmarks: defineTable({
    userId: v.id("users"),
    postId: v.id("posts"),
  })
    .index("by_user_post", ["userId", "postId"])
    .index("by_post", ["postId"]),

  comments: defineTable({
    userId: v.id("users"),
    postId: v.id("posts"),
    content: v.string(),
  }).index("by_post", ["postId"]),

  follows: defineTable({
    followerId: v.id("users"),
    followingId: v.id("users"),
  }).index("by_both", ["followerId", "followingId"]), 

  notifications: defineTable({
    receiverId: v.id("users"),
    senderId: v.id("users"),
    type: v.union(v.literal("like"), v.literal("comment"), v.literal("follow")),
    postId: v.optional(v.id("posts")),
    commentId: v.optional(v.id("comments")),
    content: v.optional(v.string()),
    read: v.boolean(),
  })
    .index("by_receiver", ["receiverId"])
    .index("by_post", ["postId"]),
});