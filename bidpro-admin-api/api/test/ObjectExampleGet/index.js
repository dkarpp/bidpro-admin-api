const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  let objectToReturn = {
    firstName: "Tom",
    lastName: "Jones",
    age: 45,
    isInSchool: false,
  };

  return res.status(200).json(objectToReturn);
});
