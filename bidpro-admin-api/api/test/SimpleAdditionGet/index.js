const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  let num1 = req.params.num1;
  let num2 = req.params.num2;

  if (!req.params || !num1 || !num2) {
    return res.status(404).send();
  }

  if (isNaN(num1) || isNaN(num2)) {
    // console.log(num1);
    return res.status(406).send();
  }

  // console.log(`answer: ${num1 + num2}`);
  return res.status(200).json({ answer: num1 + num2 });
});
