const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  //Error check to verify I received the name
  //Return an error if missing the name.

  if (!req.params || !req.params.name) {
    return res.status(404).send();
  }

  //Error check that the name is at least three letters
  //Return an error if name is less than three characters
  let name = req.params.name;

  if (name.length < 3) {
    return res
      .status(406)
      .json({ error: "Invalid Name - Must be at least three characters" });
  }

  //return the message Hello Name (name being the param passed in)
  return res.status(200).json({ message: `Hello ${name}` });
});
