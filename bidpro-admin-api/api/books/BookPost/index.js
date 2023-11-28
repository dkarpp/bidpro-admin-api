const { Types } = require("mongoose");

const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BooksModel: /* istanbul ignore next */ () => require("../models/book"),
    },
  },
  async function ({ BooksModel }, req, res) {
    if (!req.body) {
      return res.status(404).json({ error: "Missing Body of Request" });
    }

    if (!req.body.title) {
      return res
        .status(404)
        .json({ error: "Missing title from Body of Request" });
    }

    if (!req.body.genre) {
      return res
        .status(404)
        .json({ error: "Missing genre from Body of Request" });
    }

    if (!req.body.author) {
      return res
        .status(404)
        .json({ error: "Missing author from Body of Request" });
    }

    if (
      req.body.read == undefined ||
      (req.body.read != true && req.body.read != false)
    ) {
      return res
        .status(404)
        .json({ error: "Missing read from Body of Request" });
    }

    req.body._id = new Types.ObjectId();

    let bookAdded = await BooksModel.create(req.body); //had to remove await. //use save

    if (!bookAdded) {
      return res.status(406).send(); //write unit test for this
    } else {
      // return res.status(200).send();
      return res.status(200).send(); //write unit test for this that will check for json being returned
    }
  }
);
