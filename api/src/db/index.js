const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('api/src/db/db.json');
const db = low(adapter);

const createUserModel = require('./user');
const createBookModel = require('./book');

module.exports = {
  models: {
    User: createUserModel(db),
    Book: createBookModel(db),
  },
  db
};
