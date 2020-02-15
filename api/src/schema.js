const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  books: [Book]!
}

input NewUserInput {
  username: String!
  password: String!
}

type Book {
  id: ID!
  title: String!
  author: String!
  genre: String!
  owner: User!
  createdAt: Int!
}

input NewBookInput {
  title: String!
  author: String!
  genre: String!
}

type Query {
  user(id: ID!): User!
  books(userId: ID): [Book]!
  book(id: ID!): Book!
}

type Mutation {
  addUser(input: NewUserInput!): User!
  addBook(input: NewBookInput!): Book!
}
`;

module.exports = typeDefs;
