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
    if (
      !req.body.address1 &&
      !req.body.address2 &&
      !req.body.city &&
      !req.body.state &&
      !req.body.postalCode
    ) {
      return res.status(404).json({ error: "Must have an address to change!" });
    }

    let pilotInfo = await BidProModel.findOne({ _id: req.body.pilotId });

    if (!pilotInfo || pilotInfo.length === 0) {
      return res.status(404).json({ error: "pilotInfo doesnt exist" });
    }

    let updateFields = {};

    if (req.body.address1 !== undefined) {
      updateFields["pilotInfo.address1"] = req.body.address1;
    }
    if (req.body.address2 !== undefined) {
      updateFields["pilotInfo.address2"] = req.body.address2;
    }
    if (req.body.city !== undefined) {
      updateFields["pilotInfo.city"] = req.body.city;
    }
    if (req.body.state !== undefined) {
      updateFields["pilotInfo.state"] = req.body.state;
    }
    if (req.body.postalCode !== undefined) {
      updateFields["pilotInfo.postalCode"] = req.body.postalCode;
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
