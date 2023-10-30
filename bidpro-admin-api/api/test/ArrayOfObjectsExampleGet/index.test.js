const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("ArrayOfObjectsExampleGet returns an array of objects", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body.length).toBe(2);
  expect(body).toMatchObject([
    {
      firstName: "Tom",
      lastName: "Jones",
      age: 45,
      isInSchool: false,
    },
    {
      firstName: "Billy",
      lastName: "Parks",
      age: 51,
      isInSchool: true,
    },
  ]);

  expect(body[1]).toHaveProperty("firstName");
  expect(body[1]).toHaveProperty("lastName");
  expect(body[1]).toHaveProperty("age");
  expect(body[1]).toHaveProperty("isInSchool");
  expect(body[1].lastName).toEqual("Parks");
});
