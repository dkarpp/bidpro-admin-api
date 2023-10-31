const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");

test("CarTypesGet returns an array", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({})(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200); // Returns status code 200
  expect(body.length).toBe(4); // Returns array of 4 objects

  //Returns an array with two objects that have the color of red
  const twoRed = body.filter((car) => car.color == "red");
  expect(twoRed.length).toEqual(2);

  //Returns an array with two objects that have a registration in the year of 2016
  const carsRegistered = body.filter(
    (car) => car.registration.getFullYear() == 2016
  );
  expect(carsRegistered.length).toEqual(2);

  //Returns an array with no objects that have a capacity of 2
  const carsWithCapacityOf2 = body.filter((car) => car.capacity == 2);
  expect(carsWithCapacityOf2.length).toEqual(0);

  //Returns an array with one object that have a capacity greater than 5
  const carsWithCapacityGreaterThan5 = body.filter((car) => car.capacity > 5);
  expect(carsWithCapacityGreaterThan5.length).toEqual(1);

  //Returns an array that has a property of color, type, registration and capacity for the first item (0)
  expect(body[0]).toHaveProperty("color");
  expect(body[0]).toHaveProperty("type");
  expect(body[0]).toHaveProperty("registration");
  expect(body[0]).toHaveProperty("capacity");
});
