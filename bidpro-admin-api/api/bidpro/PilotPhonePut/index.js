const makeInjectable = require("../../../helpers/makeInjectable");
const { Types } = require("mongoose");

module.exports = makeInjectable(
  {
    defaults: {
      BidProModel: /* istanbul ignore next */ () => require("../models/pilots"),
    },
  },
  async function ({ BidProModel }, req, res) {
    if (!req.body) {
      return res.status(404).json({ error: "Missing body in Request" });
    }
    if (!req.body.pilotId) {
      return res.status(404).json({ error: "Missing pilotId in Request" });
    }

    if (!req.body.areaCode || !req.body.prefix || !req.body.suffix) {
      return res
        .status(404)
        .json({ error: "Must pass in fleet, seat, and domicile in Request" });
    }

    let pilotInfo = await BidProModel.findOne({ _id: req.body.pilotId });

    if (!pilotInfo || pilotInfo.length === 0) {
      return res.status(404).json({ error: "pilotInfo doesnt exist" });
    }

    const updatedPilot = await BidProModel.findOneAndUpdate(
      { _id: req.body.pilotId },
      {
        $set: {
          "pilotInfo.areaCode": req.body.areaCode,
          "pilotInfo.prefix": req.body.prefix,
          "pilotInfo.suffix": req.body.suffix,
        },
      },
      { new: true }
    );

    if (!updatedPilot || updatedPilot.length === 0) {
      return res.status(406).send();
    } else {
      return res.status(201).json(updatedPilot);
    }
  }
);
