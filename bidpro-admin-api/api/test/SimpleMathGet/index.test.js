const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("SimpleMathGet returns status code 404 for missing params", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("SimpleMathGet returns status code 404 for missing num1", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("SimpleMathGet returns status code 404 for missing operator", async () => {
  let req = {
    header: {},
    params: {
      num1: 10,
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("SimpleMathGet returns status code 404 for missing num2", async () => {
  let req = {
    header: {},
    params: {
      num1: 10,
      operator: "+",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("SimpleMathGet returns status code 406 for num1 is not a number", async () => {
  let req = {
    header: {},
    params: {
      num1: "abc",
      operator: "+",
      num2: 5,
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});

test("SimpleMathGet returns status code 406 for num2 is not a number", async () => {
  let req = {
    header: {},
    params: {
      num1: 10,
      operator: "+",
      num2: "xyz",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});

test("SimpleMathGet returns status code 406 and error message if operator is not a +, -, * or /", async () => {
  let req = {
    header: {},
    params: {
      num1: 10,
      operator: "abc",
      num2: 5,
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});

test("SimpleMathGet returns status code 200 with the answer", async () => {
  let req = {
    header: {},
    params: {
      num1: 10,
      operator: "+",
      num2: 5,
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual({ answer: 15 });
});
