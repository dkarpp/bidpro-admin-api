const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BidProModel: /* istanbul ignore next */ () => require("../models/pilots"),
    },
  },
  async function ({ BidProModel }, req, res) {
    if (!req.params || !req.params.email) {
      return res.status(404).json({ error: "Missing Params in Request" });
    }

    if (typeof req.params.email !== "string") {
      return res.status(404).json({ error: "email must be a string" });
    }

    const emailRegex = new RegExp(`^${req.params.email}$`, "i");

    let pilots = await BidProModel.findOne({
      "pilotInfo.email": { $regex: emailRegex },
    });

    if (pilots != null) {
      return res.status(200).json(pilots);
    } else {
      return res.status(404).json({ error: "Email Doesnt Exist" });
    }
  }
);
