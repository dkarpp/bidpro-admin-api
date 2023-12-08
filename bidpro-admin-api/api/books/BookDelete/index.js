const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BooksModel: /* istanbul ignore next */ () => require("../models/book"),
    },
  },
  async function ({ BooksModel }, req, res) {
    if (!req.params) {
      return res.status(404).json({ errpr: "Missing Params from Request" });
    }
    if (!req.params.id) {
      return res
        .status(404)
        .json({ errpr: "Missing id from Params of Request" });
    }

    /*
    let book = await BooksModel.findOne({ _id: req.params.id });
    book.remove();
    await book.save();
    */

    let status = await BooksModel.deleteOne({ _id: req.params.id });
    if (status.deletedCount == 1) {
      return res.status(204).send();
    } else {
      return res
        .status(406)
        .json({ error: `Id ${req.params.id} was not deleted` });
    }
  }
);
