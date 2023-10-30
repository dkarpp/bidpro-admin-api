const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("ArrayExampleGet returns an array", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body.length).toBe(3);
  expect(body).toEqual(["Element 1", "Element 2", "Element 3"]);

  //expect(body).toEqual({ message: "Hello Tom Jones" });
});
