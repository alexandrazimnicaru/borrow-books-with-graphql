const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  books: [Book]!
  requested: [Book]!
  borrowed: [Book]!
  refreshToken: String!
  token: String!
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
  description: String
  owner: User!
  requestedBy: ID
  borrowedBy: ID
  createdAt: Int!
}

input NewBookInput {
  title: String!
  author: String!
  genre: String!
  description: String
}

input NewRequestBookInput {
  id: ID!
}

input NewLendBookInput {
  id: ID!
  requestedBy: ID!
}

type Query {
  me: User!
  books: [Book]!
  book(id: ID!): Book!
  requested: [Book]!
  borrowed: [Book]!
  search: [Book]!
}

type Mutation {
  login(input: NewUserInput!): User!
  addUser(input: NewUserInput!): User!
  addBook(input: NewBookInput!): Book!
  requestBook(input: NewRequestBookInput!): Book!
  lendBook(input: NewLendBookInput!): Book!
  returnBook(input: NewRequestBookInput!): Book!
}
`;

module.exports = typeDefs;
