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
    // console.log(num1);
    return res.status(406).send();
  }

  let num1 = Number(req.params.num1);
  let operator = req.params.operator;
  let num2 = Number(req.params.num2);

  //if (operator != "+" || "-" || "*" || "/")
  switch (operator) {
    case "+":
    case "-":
    case "*":
    case "/":
      break;
    default:
      return res.status(406).send();
  }

  let doMath = eval(num1 + operator + num2);

  return res.status(200).json({ answer: doMath });

  //Error check for params and error check for num1 + num2
  //If error, return status code 404

  //Error check that num1 and num2 are numbers
  //if not a number, return status code 406

  //return status code 200 with the answer
  /*
  if (!req.params || !req.params.num1 || !req.params.num2) {
    return res.status(404).send();
  }

  if (isNaN(req.params.num1) || isNaN(req.params.num2)) {
    // console.log(num1);
    return res.status(406).send();
  }

  let num1 = Number(req.params.num1);
  let num2 = Number(req.params.num2);
  // console.log(`answer: ${num1 + num2}`);
  return res.status(200).json({ answer: num1 + num2 });*/
});
