const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("CarsGet returns status code 200 and an array of strings", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();
  await func.inject({})(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200); // Returns status code 200
  expect(body).toEqual(expect.any(Array)); // Expecting body to be any array
  body.forEach((param) => {
    expect(param).toEqual(expect.any(String)); // Expects any array params in body to be a string
  });
});

test("CarsGet returns an array of three strings", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();
  await func.inject({})(req, res);
  const body = res.json.mock.calls[0][0];

  expect(body.length).toBe(3); // Returns array of 3 strings
});
test("CarsGet returns an array that contains the first item of Saab, second item of Volvo and third item of BMW", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();
  await func.inject({})(req, res);
  const body = res.json.mock.calls[0][0];

  expect(body).toEqual(["Saab", "Volvo", "BMW"]); // Returns an array that contains the first item of Saab, second item of Volvo and third item of BMW
});
