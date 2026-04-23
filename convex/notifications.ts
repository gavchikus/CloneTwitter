import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const getNotifications = query({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) return [];

    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_receiver", (q) => q.eq("receiverId", user._id))
      .order("desc")
      .collect();

    return await Promise.all(
      notifications.map(async (n) => {
        const sender = await ctx.db.get(n.senderId);
        const post = n.postId ? await ctx.db.get(n.postId) : null;
        return { ...n, sender, post };
      })
    );
  },
});