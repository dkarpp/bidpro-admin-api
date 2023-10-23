const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({}, async function ({}, req, res) {
  if (
    !req.params ||
    !req.params.num1 ||
    !req.params.operator ||
    !req.params.num2
  ) {
    return res.status(404).send();
  }

  if (isNaN(req.params.num1) || isNaN(req.params.num2)) {
    return res.status(406).send();
  }

  //Error check that the operator is a +, -, * or /

  let operators = ["+", "-", "*", "/"];
  let operator = req.params.operator;
  if (!operators.includes(operator)) {
    return res.status(406).json({ error: "Operator must be a +, -, * or /" });
  }

  let num1 = Number(req.params.num1);
  let num2 = Number(req.params.num2);

  return res.status(200).json({ answer: eval(num1 + operator + num2) });
});
