import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    order: v.number(),
    isActive: v.boolean(),
  }),

  menus: defineTable({
    name: v.string(),
    slug: v.string(),
    price: v.number(),
    categoryIds: v.array(v.id("categories")),
    isAvailable: v.boolean(),
    imageStorageId: v.optional(v.id("_storage")),
  }).index("by_slug", ["slug"]),
});
