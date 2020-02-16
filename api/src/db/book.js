const nanoid = require('nanoid');

const createBookModel = db => ({
  findMany(filter) {
    return db.get('book')
      .filter(filter)
      .orderBy(['createdAt'], ['desc'])
      .value();
  },

  findOne(filter) {
    return db.get('book')
      .find(filter)
      .value();
  },

  create(book) {
    const newBook = { id: nanoid(), createdAt: Date.now(), ...book };
    
    db.get('book')
      .push(newBook)
      .write();

    return newBook;
  },

  update(filter, update) {
    db.get('book')
      .find(filter)
      .assign(update)
      .write();

    return db.get('book')
      .find(filter)
      .value();
  },
});

module.exports = createBookModel;
