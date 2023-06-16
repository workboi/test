import { mockDatabase as MockDB } from "../stores/mockDb";

export const createResolvers = (DB = MockDB) => ({
  Query: {
    user: (_, { id }) => {
      // TODO: Use DataLoader to fetch the user by id from the DB.
      // Replace the line below with your implementation.
      throw new Error("Not implemented");
    },
  },
  User: {
    posts: (user) => {
      // TODO: Use DataLoader to fetch the posts by the user's id from the DB.
      // Replace the line below with your implementation.
      throw new Error("Not implemented");
    },
  },
  Post: {
    comments: (post) => {
      // TODO: Use DataLoader to fetch the comments by the post's id from the DB.
      // Replace the line below with your implementation.
      throw new Error("Not implemented");
    },
  },
});
