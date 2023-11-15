const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BooksModel: () => require("../models/book"),
    },
  },
  async function ({ BooksModel }, req, res) {
    let books = await BooksModel.find();

    return res.status(200).json(books);
    //return res.status(201).send();
  }
);
