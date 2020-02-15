module.exports = {
  Query: {
    user(_, { id }, { models }) {
      return models.User.findOne({id});
    },
    books(_, { input }, { models }) {
      return models.Book.findMany(input || {});
    },
    book(_, { id }, { models }) {
      return models.Book.findOne({id});
    },
  },
  Mutation: {
    addUser(_, { input }, { models }) {
      return models.User.create({ ...input });
    },
    addBook(_, { input }, { models, user }) {
      return models.Book.create({ ...input, user: user.id });
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
    }
  },
};
