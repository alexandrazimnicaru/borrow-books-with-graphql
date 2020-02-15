const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { models, db } = require('./db');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    const users = db.get('user').value();
    const currentUser = users.filter(user => user.username === 'alex')[0];
    return { models, db, user: currentUser }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
