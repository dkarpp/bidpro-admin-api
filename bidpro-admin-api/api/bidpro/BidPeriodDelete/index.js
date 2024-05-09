//delete the bid period by id from bid type

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
    if (!req.body.bidPeriodToDelete) {
      return res
        .status(404)
        .json({ error: "Missing bidPeriodToDelete in Request" });
    }
    if (!req.body.bidPeriodToDelete.month) {
      return res.status(404).json({ error: "Missing month in Request" });
    }
    if (!req.body.bidPeriodToDelete.year) {
      return res.status(404).json({ error: "Missing year in Request" });
    }

    const bidTypeId = req.body.bidTypeId;
    const bidPeriodToDelete = req.body.bidPeriodToDelete;

    let pilots = await BidProModel.findOneAndUpdate(
      {
        _id: bidTypeId,
        "bidPeriods.month": bidPeriodToDelete.month,
        "bidPeriods.year": bidPeriodToDelete.year,
      },
      {
        $pull: {
          bidPeriods: {
            month: bidPeriodToDelete.month,
            year: bidPeriodToDelete.year,
          },
        },
      },
      { new: true } //If I wanna return a json of the updated bidtype and display it
    );

    if (pilots) {
      return res.status(204).send();
    } else {
      return res.status(406).json({
        error: `Bid period for month ${bidPeriodToDelete.month} and year ${bidPeriodToDelete.year} in bid type ${bidTypeId} was not deleted`,
      });
    }
  }
);
