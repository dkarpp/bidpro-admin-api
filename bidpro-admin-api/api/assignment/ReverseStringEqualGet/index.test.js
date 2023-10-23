const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("ReverseStringEqualGet returns status code 404 for missing params", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("ReverseStringEqualGet returns status code 403 for a first string with less than three characters", async () => {
  let req = {
    header: {},
    params: {
      firstString: "ab",
      secondString: "abc",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
});

test("ReverseStringEqualGet returns status code 403 for a second string with less than three characters", async () => {
  let req = {
    header: {},
    params: {
      firstString: "abcd",
      secondString: "ab",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
});

test("ReverseStringEqualGet returns status code 406 for second string not being the reverse of the first string", async () => {
  let req = {
    header: {},
    params: {
      firstString: "abcd",
      secondString: "abcde",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});

test("ReverseStringEqualGet returns status code 200 with second string being the reverse of the first string", async () => {
  let req = {
    header: {},
    params: {
      firstString: "abcd",
      secondString: "dcba",
    },
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual({ reversed: "dcba" });
});
