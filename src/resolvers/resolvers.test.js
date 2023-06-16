"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@graphql-tools/schema");
const mockDb_1 = require("../stores/mockDb");
const graphql_1 = require("graphql");
const resolvers_1 = require("./resolvers");
let typeDefs;
let schema;
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
    schema = (0, schema_1.makeExecutableSchema)({
        typeDefs,
        resolvers: (0, resolvers_1.createResolvers)(),
    });
});
describe("Resolvers", () => {
    it("should resolve user data and related posts", async () => {
        const index = Math.ceil(Math.random() * mockDb_1.mockDatabase.users.length - 1);
        const { id: userId } = mockDb_1.mockDatabase.users[index];
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
        const result = await (0, graphql_1.graphql)({ schema, source: query });
        expect(result.data.user.id).toEqual(userId);
        const posts = result.data.user.posts;
        expect(posts.length).toBeGreaterThan(0);
        for (let post of posts) {
            //@ts-expect-error
            expect(post.userId).toEqual(result.data?.user.id);
            const comments = post.comments;
            expect(comments.length).toBeGreaterThan(0);
            for (let comment of comments) {
                expect(comment.postId).toEqual(post.id);
            }
        }
    });
});
