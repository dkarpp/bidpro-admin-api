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
    if (!req.body.bidTypeId) {
      return res.status(404).json({ error: "Missing id in Request" });
    }
    if (!req.body.bidPeriodToAdd) {
      return res
        .status(404)
        .json({ error: "Missing bidPeriodToAdd in Request" });
    }
    if (!req.body.bidPeriodToAdd.month) {
      return res.status(404).json({ error: "Missing month in Request" });
    }
    if (!req.body.bidPeriodToAdd.year) {
      return res.status(404).json({ error: "Missing year in Request" });
    }

    // let bidType = await BidProModel.findById(req.body.bidTypeId);
    let bidType = await BidProModel.findOne({ _id: req.body.bidTypeId });

    if (!bidType || bidType.length === 0) {
      return res.status(404).json({ error: "bidType doesnt exist" });
    }

    bidType.bidPeriods.forEach((bidPeriod) => {
      if (
        bidPeriod.month == req.body.bidPeriodToAdd.month &&
        bidPeriod.year == req.body.bidPeriodToAdd.year
      ) {
        return res.status(404).json({ error: "bidPeriod already exists" });
      }
    });

    let bidTypeAdded = await BidProModel.updateOne(
      //doesnt work with unit test. returns 404.
      { _id: req.body.bidTypeId },
      { $push: { bidPeriods: req.body.bidPeriodToAdd } }, //push so that it does not replace the previous bidperiod (aka appends)
      { new: true } //returns new code in response
    );

    console.log(bidTypeAdded);
    if (!bidTypeAdded || bidTypeAdded == null || bidTypeAdded.length == 0) {
      return res.status(406).json({ error: "bidType not found" });
    } else {
      return res.status(200).json(bidTypeAdded);
    }
  }
);
