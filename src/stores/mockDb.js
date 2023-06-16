"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCommentsByPostId =
  exports.fetchPostsByUserId =
  exports.fetchUserById =
  exports.mockDatabase =
    void 0;
const faker_1 = __importDefault(require("faker"));
exports.mockDatabase = {
  users: Array(10)
    .fill(null)
    .map(() => ({
      id: faker_1.default.datatype.uuid(),
      name: faker_1.default.name.findName(),
    })),
  get posts() {
    return Array(100)
      .fill(null)
      .map(() => ({
        id: faker_1.default.datatype.uuid(),
        userId: faker_1.default.random.arrayElement(this.users).id,
        title: faker_1.default.lorem.sentence(),
      }));
  },
  get comments() {
    return Array(1000)
      .fill(null)
      .map(() => ({
        id: faker_1.default.datatype.uuid(),
        postId: faker_1.default.random.arrayElement(this.posts).id,
        body: faker_1.default.lorem.paragraph(),
      }));
  },
};
// Function to fetch a user by id
const fetchUserById = async (id) => {
  const user = exports.mockDatabase.users.find((user) => user.id === id);
  return user ? { ...user } : null;
};
exports.fetchUserById = fetchUserById;
// Function to fetch posts by userId
const fetchPostsByUserId = async (userId) => {
  const posts = exports.mockDatabase.posts.filter(
    (post) => post.userId === userId
  );
  return posts.map((post) => ({ ...post }));
};
exports.fetchPostsByUserId = fetchPostsByUserId;
// Function to fetch comments by postId
const fetchCommentsByPostId = async (postId) => {
  const comments = exports.mockDatabase.comments.filter(
    (comment) => comment.postId === postId
  );
  return comments.map((comment) => ({ ...comment }));
};
exports.fetchCommentsByPostId = fetchCommentsByPostId;
