const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  return res.status(200).json(["Element 1", "Element 2", "Element 3"]);
  //  return res.status(200).json({ message: "Hello Tom Jones" });
});
