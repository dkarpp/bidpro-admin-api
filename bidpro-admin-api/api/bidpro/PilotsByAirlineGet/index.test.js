const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/bidpro");
const mockingoose = require("mockingoose");

test("PilotsByAirlineGet returns status code 404 with errors if missing params in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing Params in Request" });
});

test("PilotsByAirlineGet returns status code 404 with errors if missing airline in params", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing Params in Request" });
});

test("PilotsByAirlineGet returns status code 404 with errors if airline is not a string", async () => {
  let req = {
    header: {},
    params: {
      airline: 242,
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "airline must be a string" });
});

test("PilotsByAirlineGet returns status code 404 with errors if BidInfo doesnt exist", async () => {
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn([], "find");

  let req = {
    header: {},
    params: {
      airline: "UPS",
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "BidInfo Doesnt Exist" });
});

test("PilotsByAirlineGet returns status code 200 with all pilots", async () => {
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn({}, "find"); //{} means its not empty

  let req = {
    header: {},
    params: {
      airline: "UPS",
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
});
