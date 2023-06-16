import { makeExecutableSchema } from "@graphql-tools/schema";
import { mockDatabase as MockDB } from "../stores/mockDb";

import { GraphQLSchema, graphql } from "graphql";
import { createResolvers } from "./resolvers";

let typeDefs: string;
let schema: GraphQLSchema;

beforeAll(() => {
  typeDefs = `
  type User {
    id: String!
    name: String!
    posts: [Post]
  }

  type Post {
    id: String!
    userId: String!
    title: String!
    comments: [Comment]
  }

  type Comment {
    id: String!
    postId: String!
    body: String!
  }

  type Query {
    user(id: String!): User
  }
`;
  schema = makeExecutableSchema({
    typeDefs,
    resolvers: createResolvers(),
  });
});

describe("Resolvers", () => {
  it("should resolve user data and related posts", async () => {
    const index = Math.ceil(Math.random() * MockDB.users.length - 1);
    const { id: userId } = MockDB.users[index];

    const query = `
      {
        user(id: "${userId}") {
          id
          posts {
            id
            comments {
              id
            }
          }
        }
      }
    `;

    const result = await graphql({ schema, source: query });
    expect(result.data.user.id).toEqual(userId);

    const posts = result.data.user.posts;
    expect(posts.length).toBeGreaterThan(0);

    for (let post of posts) {
      expect(post.userId).toEqual(result.data?.user.id);

      const comments = post.comments;
      expect(comments.length).toBeGreaterThan(0);

      for (let comment of comments) {
        expect(comment.postId).toEqual(post.id);
      }
    }
  });
});
