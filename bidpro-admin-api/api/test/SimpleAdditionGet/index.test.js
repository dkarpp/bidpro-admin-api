const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("SimpleAdditionGet returns status code 404 for missing params", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("SimpleAdditionGet returns status code 404 for missing num1", async () => {
  let req = {
    header: {},
    params: {
      num2: 2,
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("SimpleAdditionGet returns status code 404 for missing num2", async () => {
  let req = {
    header: {},
    params: {
      num1: 2,
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("SimpleAdditionGet returns status code 406 for num1 is not a number", async () => {
  let req = {
    header: {},
    params: {
      num1: "s",
      num2: 4,
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});

test("SimpleAdditionGet returns status code 406 for num2 is not a number", async () => {
  let req = {
    header: {},
    params: {
      num1: 4,
      num2: "something",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});

test("SimpleAdditionGet returns status code 200 with the answer", async () => {
  let req = {
    header: {},
    params: {
      num1: 5,
      num2: 4,
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual({ answer: 9 });
});
