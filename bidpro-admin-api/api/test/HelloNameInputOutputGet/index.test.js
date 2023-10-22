const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("helloNameInputOutputGet return status code 404 for missing params", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("helloNameInputOutputGet return status code 404 for missing name", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("helloNameInputOutputGet return status code 406 with the string Invalid Name - Must be at least three characters", async () => {
  let req = {
    header: {},
    params: {
      name: "To",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body).toEqual({
    error: "Invalid Name - Must be at least three characters",
  });
});

test("HelloNameInputOutputGet return status of 200 with the string Hello and name provided as input", async () => {
  let req = {
    header: {},
    params: {
      name: "Tom",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual({ message: `Hello Tom` });
});
