const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("hello name return message with the string Hello Tommy Jones", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual({ message: "Hello Tom Jones" });
});
