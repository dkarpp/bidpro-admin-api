const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("ReverseStringGet returns status code 404 for missing params", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("ReverseStringGet returns status code 403 if string passed in is less than three characters", async () => {
  let req = {
    header: {},
    params: {
      inputString: "ab",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
});

test("ReverseStringGet returns status code 200 with a reverse string of the string passed into the method", async () => {
  let req = {
    header: {},
    params: {
      inputString: "Hello World",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual({ reversed: "dlroW olleH" });
});
