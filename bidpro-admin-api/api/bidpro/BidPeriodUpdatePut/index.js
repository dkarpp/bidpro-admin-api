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
    if (!req.body.bidTypeId) {
      return res.status(404).json({ error: "Missing bidTypeId in Request" });
    }
    if (!req.body.bidPeriodToUpdate) {
      return res
        .status(404)
        .json({ error: "Missing bidPeriodToUpdate in Request" });
    }
    if (!req.body.bidPeriodToUpdate.bidPeriodId) {
      return res.status(404).json({ error: "Missing bidPeriodId in Request" });
    }
    if (!req.body.bidPeriodToUpdate.month) {
      return res.status(404).json({ error: "Missing month in Request" });
    }
    if (!req.body.bidPeriodToUpdate.year) {
      return res.status(404).json({ error: "Missing year in Request" });
    }

    let bidType = await BidProModel.findOne({ _id: req.body.bidTypeId });

    if (!bidType || bidType.length === 0) {
      return res.status(404).json({ error: "bidType doesnt exist" });
    }

    let bidPeriodFound = false;
    bidType.bidPeriods.forEach((bidPeriod) => {
      if (bidPeriod._id == req.body.bidPeriodToUpdate.bidPeriodId) {
        bidPeriod.month = req.body.bidPeriodToUpdate.month;
        bidPeriod.year = req.body.bidPeriodToUpdate.year;
        bidPeriodFound = true;
      }
    });

    if (!bidPeriodFound) {
      return res.status(404).json({ error: "bidPeriod id not found" });
    }

    let bidTypeInstance = new BidProModel(bidType);
    let bidTypeSave = await bidTypeInstance.save();

    if (!bidTypeSave || bidTypeSave == null || bidTypeSave.length == 0) {
      return res.status(406).send();
    } else {
      return res.status(200).json(bidTypeSave);
    }
  }
);
