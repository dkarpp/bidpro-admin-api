const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/bidpro");
const mockingoose = require("mockingoose");

test("PilotsByEmailGet returns status code 404 with errors if missing params in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing Params in Request" });
});

test("PilotsByEmailGet returns status code 404 with errors if missing email in params", async () => {
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

test("PilotsByEmailGet returns status code 404 with errors if email is not a string", async () => {
  let req = {
    header: {},
    params: {
      email: 242,
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "email must be a string" });
});

test("PilotsByEmailGet returns status code 404 with errors if pilot doesnt exist", async () => {
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn(null, "findOne");

  let req = {
    header: {},
    params: {
      email: "tmt@alaskaair.com",
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Email Doesnt Exist" });
});

test("PilotsByEmailGet returns status code 200 with pilot info", async () => {
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn({}, "findOne"); //{} means its not empty

  let req = {
    header: {},
    params: {
      email: "tmt@alaskaair.com",
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
});
