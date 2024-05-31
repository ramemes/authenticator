import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema ({
  users: defineTable({
    username: v.string(),
    password: v.string(),
    accessToken: v.string(),
  })
    .index("by_username",["username"])
    .index("by_access_token",["accessToken"])
    .index("by_details", ["username", "password"])
})