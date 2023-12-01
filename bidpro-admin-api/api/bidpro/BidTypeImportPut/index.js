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

    let bidType = await BidProModel.findOne({ _id: req.body.bidTypeId });

    if (!bidType) {
      return res.status(404).json({ error: "bidType doesnt exist" });
    }

    if (bidType.status === 1) {
      return res.status(404).json({ error: "bidType status is already 1" });
    }

    bidType.status = 1;
    let bidTypeInstance = new BidProModel(bidType);
    let bidTypeSave = await bidTypeInstance.save();
    // let bidTypeSave = await bidType.save();

    if (
      !bidTypeSave ||
      bidTypeSave == null ||
      bidTypeSave.length == 0 ||
      bidTypeSave.status != 1
    ) {
      return res.status(406).send();
    } else {
      return res.status(200).json(bidTypeSave);
    }
  }
);
