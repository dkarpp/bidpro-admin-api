const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("CarsGet returns an array", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200); // Returns status code 200
  expect(body.length).toBe(3); // Returns array of 3 strings
  expect(body).toEqual(["Saab", "Volvo", "BMW"]); // Returns an array that contains the first item of Saab, second item of Volvo and third item of BMW
});
