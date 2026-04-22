import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("by_clerk_id", ["userId"]),
  posts: defineTable({
    userId: v.id("users"),
    content: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
  }).index("by_user", ["userId"]),
  likes: defineTable({
    userId: v.id("users"),
    postId: v.id("posts"),
  }).index("by_user_and_post", ["userId", "postId"]),
  bookmarks: defineTable({
    userId: v.id("users"),
    postId: v.id("posts"),
  }).index("by_user_and_post", ["userId", "postId"]),
});