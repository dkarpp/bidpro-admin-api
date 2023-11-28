const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BooksModel: /* istanbul ignore next */ () => require("../models/book"),
    },
  },
  async function ({ BooksModel }, req, res) {
    if (!req.body) {
      return res.status(404).json({ error: "Missing Body from Request" });
    }
    if (!req.body.id) {
      return res.status(404).json({ error: "Missing id from Request" });
    }
    let book = await BooksModel.findById(req.body.id);

    if (req.body.title) {
      book.title = req.body.title;
    }
    if (req.body.genre) {
      book.genre = req.body.genre;
    }
    if (req.body.author) {
      book.author = req.body.author;
    }
    if (req.body.read == true || req.body.read == false) {
      book.read = req.body.read;
    }

    await book.save();

    return res.status(200).json(book);
  }
);
