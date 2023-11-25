const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      bidProModel: () => require("../models/bidpro"),
    },
  },
  async function ({ bidProModel }, req, res) {
    let bidpro = await bidProModel.find();

    return res.status(200).json(bidpro);
  }
);
