//delete the bid type unless assigned to pilot.

const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BidProModel: /* istanbul ignore next */ () => require("../models/pilots"),
      BidTypeModel: /* istanbul ignore next */ () =>
        require("../models/bidpro"),
    },
  },
  async function ({ BidProModel, BidTypeModel }, req, res) {
    if (!req.params) {
      return res.status(404).json({ error: "Missing params in Request" });
    }
    if (!req.params.seat) {
      return res.status(404).json({ error: "Missing seat in Request" });
    }
    if (req.params.seat !== "CPT" && req.params.seat !== "FO") {
      return res.status(404).json({ error: "seat is not CPT or FO" });
    }
    if (!req.params.fleet) {
      return res.status(404).json({ error: "Missing fleet in Request" });
    }
    if (req.params.fleet.length !== 3 && req.params.fleet.length !== 4) {
      return res.status(404).json({ error: "fleet is not 3 or 4 letters" });
    }
    if (!req.params.domicile) {
      return res.status(404).json({ error: "Missing domicile in Request" });
    }
    if (req.params.domicile.length !== 3) {
      return res.status(404).json({ error: "domicile is not 3 letters" });
    }

    let pilots = await BidProModel.find({
      "bidInfo.seat": req.params.seat,
      "bidInfo.fleet": req.params.fleet,
      "bidInfo.domicile": req.params.domicile,
    });

    if (pilots.length != 0) {
      return res.status(409).json({ error: "bidType is assigned to pilot" });
    }

    let bidType = await BidTypeModel.deleteOne({
      "bidType.seat": req.params.seat,
      "bidType.fleet": req.params.fleet,
      "bidType.domicile": req.params.domicile,
    });

    if (bidType.deletedCount == 1 || bidType.length == 0) {
      return res.status(204).send();
    } else {
      return res.status(406).json({
        error: "BidType was not deleted.",
      });
    }
  }
);
