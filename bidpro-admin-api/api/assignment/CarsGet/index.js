const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  return res.status(200).json(["Saab", "Volvo", "BMW"]);
});
