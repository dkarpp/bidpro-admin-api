const { Types } = require("mongoose");

const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BidProModel: /* istanbul ignore next */ () => require("../models/bidpro"),
    },
  },
  async function ({ BidProModel }, req, res) {
    if (!req.body) {
      return res.status(404).json({ error: "Missing body in Request" });
    }
    if (!req.body.bidType) {
      return res.status(404).json({ error: "Missing bidType in Request" });
    }
    if (!req.body.bidType.fleet) {
      return res.status(404).json({ error: "Missing fleet in Request" });
    }
    if (
      req.body.bidType.fleet.length !== 3 &&
      req.body.bidType.fleet.length !== 4
    ) {
      return res.status(404).json({ error: "fleet is not 3 or 4 letters" });
    }

    if (!req.body.bidType.seat) {
      return res.status(404).json({ error: "Missing seat in Request" });
    }
    if (req.body.bidType.seat !== "CPT" && req.body.bidType.seat !== "FO") {
      return res.status(404).json({ error: "seat is not CPT or FO" });
    }
    if (!req.body.bidType.domicile) {
      return res.status(404).json({ error: "Missing domicile in Request" });
    }
    if (req.body.bidType.domicile.length !== 3) {
      return res.status(404).json({ error: "domicile is not 3 letters" });
    }
    if (!req.body.bidPeriods) {
      return res.status(404).json({ error: "Missing bidPeriods in Request" });
    }

    let bidType = await BidProModel.find({
      "bidType.fleet": req.body.bidType.fleet,
      "bidType.seat": req.body.bidType.seat,
      "bidType.domicile": req.body.bidType.domicile,
    });

    if (bidType.length != 0) {
      return res.status(404).json({ error: "bidType already exists" });
      //bidType already exists
    }

    req.body._id = new Types.ObjectId();
    let bidTypeInstance = new BidProModel(req.body);
    let bidTypeAdded = await bidTypeInstance.save();

    if (!bidTypeAdded || bidTypeAdded == null || bidTypeAdded.length == 0) {
      return res.status(406).send();
    } else {
      return res.status(201).json(bidTypeAdded);
    }
  }
);
