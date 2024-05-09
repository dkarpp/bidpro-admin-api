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
    if (!req.body.airline) {
      return res.status(404).json({ error: "Missing airline in Request" });
    }
    if (!req.body.pilotInfo) {
      return res.status(404).json({ error: "Missing pilotInfo in Request" });
    }
    if (!req.body.pilotInfo.firstName) {
      return res.status(404).json({ error: "Missing firstName in Request" });
    }
    if (!req.body.pilotInfo.lastName) {
      return res.status(404).json({ error: "Missing lastName in Request" });
    }
    if (!req.body.pilotInfo.email) {
      return res.status(404).json({ error: "Missing email in Request" });
    }
    if (!req.body.pilotInfo.areaCode) {
      return res.status(404).json({ error: "Missing areaCode in Request" });
    }
    if (!req.body.pilotInfo.prefix) {
      return res.status(404).json({ error: "Missing prefix in Request" });
    }
    if (!req.body.pilotInfo.suffix) {
      return res.status(404).json({ error: "Missing suffix in Request" });
    }
    if (!req.body.pilotInfo.address1) {
      return res.status(404).json({ error: "Missing address1 in Request" });
    }
    if (!req.body.pilotInfo.address2) {
      return res.status(404).json({ error: "Missing address2 in Request" });
    }
    if (!req.body.pilotInfo.city) {
      return res.status(404).json({ error: "Missing city in Request" });
    }
    if (!req.body.pilotInfo.state) {
      return res.status(404).json({ error: "Missing state in Request" });
    }
    if (!req.body.pilotInfo.postalCode) {
      return res.status(404).json({ error: "Missing postalCode in Request" });
    }
    if (!req.body.bidInfo) {
      return res.status(404).json({ error: "Missing bidInfo in Request" });
    }
    if (!req.body.bidInfo.seat) {
      return res.status(404).json({ error: "Missing seat in Request" });
    }
    if (req.body.bidInfo.seat !== "CPT" && req.body.bidInfo.seat !== "FO") {
      return res.status(404).json({ error: "seat is not CPT or FO" });
    }
    if (!req.body.bidInfo.fleet) {
      return res.status(404).json({ error: "Missing fleet in Request" });
    }
    if (
      req.body.bidInfo.fleet.length !== 3 &&
      req.body.bidInfo.fleet.length !== 4
    ) {
      return res.status(404).json({ error: "fleet is not 3 or 4 letters" });
    }
    if (!req.body.bidInfo.domicile) {
      return res.status(404).json({ error: "Missing domicile in Request" });
    }
    if (req.body.bidInfo.domicile.length !== 3) {
      return res.status(404).json({ error: "domicile is not 3 letters" });
    }

    const emailRegex = new RegExp(`^${req.body.pilotInfo.email}$`, "i");

    let pilots = await BidProModel.findOne({
      "pilotInfo.email": { $regex: emailRegex },
    });

    if (pilots != null) {
      return res.status(404).json({ error: "email already exists" });
    }

    req.body._id = new Types.ObjectId();
    let bidTypeInstance = new BidProModel(req.body);
    let bidTypeAdded = await bidTypeInstance.save();

    if (!bidTypeAdded || bidTypeAdded == null || bidTypeAdded.length == 0) {
      return res.status(406).send();
    } else {
      //return res.status(201).json(bidTypeAdded); //If I want to display the added bidType
      return res.status(201).send();
    }
  }
);
