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

    if (!req.body.seat && !req.body.fleet && !req.body.domicile) {
      return res
        .status(404)
        .json({ error: "Must pass in fleet, seat, or domicile in Request" });
    }

    let pilotInfo = await BidProModel.findOne({ _id: req.body.pilotId });

    if (!pilotInfo || pilotInfo.length === 0) {
      return res.status(404).json({ error: "pilotInfo doesnt exist" });
    }

    let updateFields = {};

    if (req.body.seat !== undefined) {
      if (req.body.seat !== "CPT" && req.body.seat !== "FO") {
        return res.status(404).json({ error: "seat is not CPT or FO" });
      } else {
        updateFields["bidInfo.seat"] = req.body.seat;
      }
    }

    if (req.body.fleet !== undefined) {
      if (req.body.fleet.length !== 3 && req.body.fleet.length !== 4) {
        return res.status(404).json({ error: "fleet is not 3 or 4 letters" });
      } else {
        updateFields["bidInfo.fleet"] = req.body.fleet;
      }
    }

    if (req.body.domicile !== undefined) {
      if (req.body.domicile.length !== 3) {
        return res.status(404).json({ error: "domicile is not 3 letters" });
      } else {
        updateFields["bidInfo.domicile"] = req.body.domicile;
      }
    }

    const updatedPilot = await BidProModel.findOneAndUpdate(
      { _id: req.body.pilotId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedPilot || updatedPilot.length === 0) {
      return res.status(406).send();
    } else {
      return res.status(201).json(updatedPilot);
    }
  }
);
