const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BooksModel: () => require("../models/book"),
    },
  },
  async function ({ BooksModel }, req, res) {
    //Error check for params and params.id
    if (!req.params || !req.params.id) {
      return res.status(404).send();
    }

    //Retrieve Book using the id
    let book = await BooksModel.find({ _id: req.params.id });

    //Check that book was retrieved, return 404 if not found
    if (book.length === 0) {
      return res.status(404).send();
    }

    //return the book
    return res.status(200).json(book);
  }
);
