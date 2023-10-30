const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  let arrayOfObjectsToReturn = [
    {
      firstName: "Tom",
      lastName: "Jones",
      age: 45,
      isInSchool: false,
    },
    {
      firstName: "Billy",
      lastName: "Parks",
      age: 51,
      isInSchool: true,
    },
  ];

  return res.status(200).json(arrayOfObjectsToReturn);
});
