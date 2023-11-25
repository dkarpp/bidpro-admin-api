const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      bidProModel: () => require("../models/bidpro"),
    },
  },
  async function ({ bidProModel }, req, res) {
    if (
      !req.params ||
      !req.params.fleet ||
      !req.params.seat ||
      !req.params.domicile
    ) {
      return res.status(404).send();
    }

    let bidpro = await bidProModel.find({
      "bidType.fleet": req.params.fleet,
      "bidType.seat": req.params.seat,
      "bidType.domicile": req.params.domicile,
    });

    //Check that book was retrieved, return 404 if not found
    if (bidpro.length === 0) {
      return res.status(404).send();
    }

    //return the book
    return res.status(200).json(bidpro);
  }
);
