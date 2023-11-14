const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  let carTypes = [
    {
      color: "purple",
      type: "minivan",
      registration: new Date("2017-01-03"),
      capacity: 7,
    },
    {
      color: "red",
      type: "station wagon",
      registration: new Date("2018-03-23"),
      capacity: 5,
    },
    {
      color: "blue",
      type: "couple",
      registration: new Date("2016-05-08"),
      capacity: 4,
    },
    {
      color: "red",
      type: "crossover",
      registration: new Date("2016-11-10"),
      capacity: 4,
    },
  ];
  return res.status(200).json(carTypes);
});
