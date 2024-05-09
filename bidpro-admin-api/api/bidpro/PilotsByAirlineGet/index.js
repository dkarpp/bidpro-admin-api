const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BidProModel: /* istanbul ignore next */ () => require("../models/pilots"),
    },
  },
  async function ({ BidProModel }, req, res) {
    if (!req.params || !req.params.airline) {
      return res.status(404).json({ error: "Missing Params in Request" });
    }

    if (typeof req.params.airline !== "string") {
      return res.status(404).json({ error: "airline must be a string" });
    }

    let pilots = await BidProModel.find({ airline: req.params.airline });

    if (pilots.length != 0) {
      return res.status(200).json(pilots);
    } else {
      return res.status(404).json({ error: "BidInfo Doesnt Exist" });
    }
  }
);
