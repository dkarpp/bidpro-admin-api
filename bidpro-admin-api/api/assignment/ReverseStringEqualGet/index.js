const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  //Missing params check
  if (!req.params || !req.params.firstString || !req.params.secondString) {
    return res.status(404).send();
  }

  //If string 1 & string 2 < 3 letters then return 403
  let first = req.params.firstString;
  let second = req.params.secondString;
  if (first.length < 3 || second.length < 3) {
    return res.status(403).send();
  }

  //Get the first string and reverse it. Then check if second string = first string

  let reversed = [...first].reverse().join("");
  if (second != reversed) {
    return res.status(406).send();
  }
  //console.log(reversed);

  return res.status(200).json({ reversed: reversed.toString() });
});
