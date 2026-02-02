import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getMenu = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("menus")
      .withIndex("by_creation_time", (q) => q)
      .order("desc")
      .collect();
  },
});

export const getMenuBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const menus = await ctx.db
      .query("menus")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();

    return await Promise.all(
      menus.map(async (menu) => {
        const resolvedImageUrl =
          menu.imageStorageId !== undefined
            ? await ctx.storage.getUrl(menu.imageStorageId)
            : null;
        return {
          ...menu,
          imageUrl: resolvedImageUrl,
        };
      }),
    );
  },
});
