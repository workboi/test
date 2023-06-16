# Backend Developer Test

In this test, you'll be implementing GraphQL resolvers for a simple schema using DataLoader and a provided mock database.

## The Task

You'll find a mock database with random data in `src/stores/mockDatabase.ts`. The data includes users, posts, and comments.

Your task is to implement the resolver functions in `src/resolvers/resolvers.ts` using DataLoader to fetch this data efficiently. A function named `createResolvers` has been provided for you that takes the mock database as a parameter. You'll be expected to use the functions within this mock database to create your DataLoaders and resolvers.

## Requirements

- Please do **not** modify the test in `resolvers.test.ts`.
- You should only modify the `resolvers.ts` file to implement the resolvers.
- Please use the provided mock database functions and DataLoader to batch and cache fetch operations.
- Fix any Typing errors and warning prompted by TS

## Steps

1. Install the necessary dependencies with `npm install`.
2. Within `resolvers.ts`, replace the placeholder comments with your own DataLoader instances. Use the `DB` parameter within the `createResolvers` function to access the mock database functions.
3. Run the test with `npm test`. The test should pass if the resolvers are correctly implemented.

Good luck!
