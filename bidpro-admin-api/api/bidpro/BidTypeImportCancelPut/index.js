const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      BidProModel: /* istanbul ignore next */ () => require("../models/bidpro"),
    },
  },
  async function ({ BidProModel }, req, res) {
    if (!req.params) {
      return res.status(404).json({ error: "Missing params in Request" });
    }
    if (!req.params.id) {
      return res.status(404).json({ error: "Missing bidTypeId in Request" });
    }

    let bidType = await BidProModel.findOne({ _id: req.params.id });

    if (!bidType || bidType.length === 0) {
      return res.status(404).json({ error: "bidType doesnt exist" });
    }

    if (bidType.status === 0) {
      return res.status(404).json({ error: "bidType status is already 0" });
    }
    //add null check?

    bidType.status = 0;
    bidType.importedOn = null;

    let bidTypeInstance = new BidProModel(bidType);
    let bidTypeSave = await bidTypeInstance.save();
    // let bidTypeSave = await bidType.save();

    if (
      !bidTypeSave ||
      bidTypeSave == null ||
      bidTypeSave.length == 0 ||
      bidTypeSave.status != 0
    ) {
      return res.status(406).send();
    } else {
      return res.status(200).json(bidTypeSave);
    }
  }
);
