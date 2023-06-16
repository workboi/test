import faker from "faker";

export const mockDatabase = {
  users: Array(10)
    .fill(null)
    .map(() => ({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
    })),
  get posts() {
    return Array(100)
      .fill(null)
      .map(() => ({
        id: faker.datatype.uuid(),
        userId: faker.random.arrayElement(this.users).id,
        title: faker.lorem.sentence(),
      }));
  },
  get comments() {
    return Array(1000)
      .fill(null)
      .map(() => ({
        id: faker.datatype.uuid(),
        postId: faker.random.arrayElement(this.posts).id,
        body: faker.lorem.paragraph(),
      }));
  },
};

// Function to fetch a user by id
export const fetchUserById = async (id: string) => {
  const user = mockDatabase.users.find((user) => user.id === id);
  return user ? { ...user } : null;
};

// Function to fetch posts by userId
export const fetchPostsByUserId = async (userId: string) => {
  const posts = mockDatabase.posts.filter((post) => post.userId === userId);
  return posts.map((post) => ({ ...post }));
};

// Function to fetch comments by postId
export const fetchCommentsByPostId = async (postId: string) => {
  const comments = mockDatabase.comments.filter(
    (comment) => comment.postId === postId
  );
  return comments.map((comment) => ({ ...comment }));
};
