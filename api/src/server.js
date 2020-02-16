const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { models, db } = require('./db');
const jsonwebtoken = require('jsonwebtoken');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    const token = req.headers.authorization || '';
    if (!token) {
      return { models, db, user: null };
    }

    // extract JWT without Bearer
    const split = token.split(' ');
    const jwt = split && split[1];
    if (!jwt) {
      return { models, db, user: null };
    }

    const decoded = jsonwebtoken.verify(jwt, 'mock-secret');
    const users = db.get('user').value();
    const currentUser = users.filter(user => user.id === decoded.id)[0];
    return { models, db, user: currentUser || null }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
