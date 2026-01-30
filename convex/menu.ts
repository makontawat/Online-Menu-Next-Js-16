import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// export const getMenu = query({
//   args: {},
//   handler: async (ctx) => {
//     const menus = await ctx.db.query("menus").order("desc").collect();

//     return await Promise.all(
//       menus.map(async (menu) => {
//         return {
//           ...menu,
//         };
//       }),
//     );
//   },
// });

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
    const menu = await ctx.db
      .query("menus")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!menu) {
      throw new ConvexError("Menu not found");
    }

    const imageUrl = menu.imageStorageId
      ? await ctx.storage.getUrl(menu.imageStorageId)
      : null;

    return { ...menu, imageUrl };
  },
});
