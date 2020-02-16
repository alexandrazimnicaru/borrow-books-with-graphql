const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  books: [Book]!
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
  createdAt: Int!
}

input NewBookInput {
  title: String!
  author: String!
  genre: String!
  description: String
}

type Query {
  me: User!
  books: [Book]!
  book(id: ID!): Book!
}

type Mutation {
  login(input: NewUserInput!): User!
  addUser(input: NewUserInput!): User!
  addBook(input: NewBookInput!): Book!
}
`;

module.exports = typeDefs;
