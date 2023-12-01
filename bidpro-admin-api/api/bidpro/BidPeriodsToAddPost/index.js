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
    if (!req.body.bidPeriodsToAdd) {
      return res
        .status(404)
        .json({ error: "Missing bidPeriodsToAdd in Request" });
    }

    let bidType = await BidProModel.findOne({ _id: req.body.bidTypeId });

    if (!bidType || bidType.length === 0) {
      return res.status(404).json({ error: "bidType doesnt exist" });
    }

    const bidPeriodAlreadyExists = await req.body.bidPeriodsToAdd.some(
      (periodToAdd) =>
        bidType.bidPeriods.some(
          (bidPeriod) =>
            bidPeriod.month === periodToAdd.month &&
            bidPeriod.year === periodToAdd.year
        )
    );

    if (bidPeriodAlreadyExists) {
      return res.status(404).send(); //return error and dont insert without displaying error code
    }

    const bidPeriodHasDuplicate = req.body.bidPeriodsToAdd.some(
      (
        period,
        index //foreach bidPeriodsToAdd
      ) =>
        req.body.bidPeriodsToAdd
          .slice(index + 1) //create a new array starting from index + 1
          .some(
            (existingPeriod) =>
              existingPeriod.month === period.month &&
              existingPeriod.year === period.year
          )
    );
    if (bidPeriodHasDuplicate) {
      return res.status(404).send(); //duplicate detected in bidPeriodsToAdd dont display error code.
    }

    let bidTypeAdded = await BidProModel.updateOne(
      { _id: req.body.bidTypeId },
      { $push: { bidPeriods: req.body.bidPeriodsToAdd } }, //push so that it does not replace the previous bidperiod (aka appends)
      { new: true } //returns new code in response
    );

    if (!bidTypeAdded || bidTypeAdded == null || bidTypeAdded.length == 0) {
      return res.status(406).json({ error: "bidType not added" });
    } else {
      return res.status(201).json(bidTypeAdded);
    }
  }
);
