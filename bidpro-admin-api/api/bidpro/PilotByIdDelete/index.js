const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BidProModel: /* istanbul ignore next */ () => require("../models/pilots"),
    },
  },
  async function ({ BidProModel }, req, res) {
    if (!req.params || !req.params.pilotid) {
      return res.status(404).json({ error: "Missing params in Request" });
    }

    let pilots = await BidProModel.deleteOne({ _id: req.params.pilotid });

    if (pilots.deletedCount == 1) {
      return res.status(204).send();
    } else {
      return res
        .status(406)
        .json({ error: `Id ${req.params.pilotid} was not deleted` });
    }
  }
);
