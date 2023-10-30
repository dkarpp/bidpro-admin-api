const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  //Missing params check
  if (!req.params || !req.params.inputString) {
    return res.status(404).send();
  }

  //If input string < 3 letters then return 403
  let inputString = req.params.inputString;
  if (inputString.length < 3) {
    return res.status(403).send();
  }

  //reverse the input string
  let reversed = [...inputString].reverse().join("");

  //return status 200 with reversed input string.
  return res.status(200).json({ reversed: reversed.toString() });
});
