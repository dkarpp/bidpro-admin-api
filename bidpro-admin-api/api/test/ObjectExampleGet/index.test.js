const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("ObjectExampleGet returns an object", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual({
    firstName: "Tom",
    lastName: "Jones",
    age: 45,
    isInSchool: false,
  });
  expect(body).toHaveProperty("age");
});
