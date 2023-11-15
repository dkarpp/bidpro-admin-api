const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      bidProModel: () => require("../models/bidpro"),
    },
  },
  async function ({ bidProModel }, req, res) {
    if (!req.params || !req.params.id) {
      return res.status(404).send();
    }

    let bidpro = await bidProModel.find({ _id: req.params.id });

    //Check that value was retrieved, return 404 if not found
    if (bidpro.length === 0) {
      return res.status(404).send();
    }

    return res.status(200).json(bidpro);
  }
);
