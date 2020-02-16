const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const getTokens = id => ({
  refreshToken: jsonwebtoken.sign({ id }, 'mock-secret', { expiresIn: '7d'}),
  token: jsonwebtoken.sign({ id }, 'mock-secret', { expiresIn: '2h'}),
});

module.exports = {
  Query: {
    me(_, { id }, { models, user }) {
      return user;
    },
    books(_, { input }, { models, user }) {
      if (!user) {
        return;
      }
      return models.Book.findMany({ user: user.id });
    },
    book(_, { id }, { models, user }) {
      if (!user) {
        return;
      }
      return models.Book.findOne({id});
    },
    search(_, { id }, { models, user }) {
      if (!user) {
        return;
      }
      return models.Book.findMany(book => book.user !== user.id && !book.borrowedBy);
    },
    requested(_, { input }, { models, user }) {
      if (!user) {
        return;
      }
      return models.Book.findMany({ requestedBy: user.id });
    },
    borrowed(_, { input }, { models, user }) {
      if (!user) {
        return;
      }
      return models.Book.findMany({ borrowedBy: user.id });
    },
  },
  Mutation: {
    login(_, { input }, { models }) {
      const user = models.User.findOne({ username: input.username });
      if (!user) {
        return;
      }

      const valid = bcrypt.compareSync(input.password, user.password);
      if (!valid) {
        return;
      }

      return { ...user, ...getTokens(user.id) };
    },
    addUser(_, { input }, { models }) {
      const hash = bcrypt.hashSync(input.password, 10);
      const user = models.User.create({ username: input.username, password: hash });
      return { ...user, ...getTokens(user.id) };
    },
    addBook(_, { input }, { models, user }) {
      if (!user) {
        return;
      }
      return models.Book.create({ ...input, user: user.id });
    },
    requestBook(_, { input }, { models, user }) {
      if (!user) {
        return;
      }
      return models.Book.update({ id: input.id }, { requestedBy: user.id });
    },
    lendBook(_, { input }, { models, user }) {
      if (!user) {
        return;
      }
      return models.Book.update({
        id: input.id,
        user: user.id,
      }, {
        borrowedBy: input.requestedBy,
        requestedBy: ''
      });
    },
    returnBook(_, { input }, { models, user }) {
      if (!user) {
        return;
      }
      return models.Book.update({
        id: input.id,
        user: user.id,
      }, { borrowedBy: '' });
    },
  },
  Book: {
    owner(book, _, { models }) {
      return models.User.findOne({ id: book.user });
    },
  },
  User: {
    books(user, _, { models }) {
      return models.Book.findMany({ user: user.id });
    },
    requested(user, _, { models }) {
      return models.Book.findMany({ requestedBy: user.id });
    },
    borrowed(user, _, { models }) {
      return models.Book.findMany({ borrowedBy: user.id });
    },
  },
};
