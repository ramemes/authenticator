import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    accessToken: v.string(),
  },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new Error("Unauthorized");
    // }

    const checkedUser = await ctx.db
    .query("users")
    .withIndex("by_username", (q) => 
      q
        .eq("username", args.username)
    )
    .unique()

    if (checkedUser) {
      throw new Error("Username is taken")
    }

    const newUser = await ctx.db.insert("users", {
      username: args.username,
      password: args.password,
      accessToken: args.accessToken,
    });



    return newUser;
  },
})

export const verifyCredentials = mutation({
  args: { username: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const { username, password } = args;

    // Query the database for the user with the provided username
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("username"), username))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    //  compare the password
    if (user.password !== password) {
      throw new Error("Invalid credentials");
    }

    // Return the user ID if credentials are valid
    return user._id;
  },
});

export const getUserByToken = query({
  args: {
    accessToken: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_access_token", (q) => 
        q
          .eq("accessToken", args.accessToken)
      )
      .unique()
      

    return user;
  },
});


export const getUserByUsername = query({
  args: {
    username: v.string()
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => 
        q
          .eq("username", args.username)
      )
      .unique()

   return user;
  },
});

