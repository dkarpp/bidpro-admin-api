const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/pilots");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("PilotAddressPut returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});

test("PilotAddressPut returns status code 404 with errors if missing pilotId in request", async () => {
  let req = {
    header: {},
    body: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing pilotId in Request" });
});
test("PilotAddressPut returns status code 404 with errors if missing new address in request", async () => {
  let req = {
    header: {},
    body: {
      pilotId: "65750a81dd9fc2bb1b1413e9",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Must have an address to change!" });
});

test("PilotAddressPut returns status code 404 with errors if pilot doesnt exist", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn([], "findOne");

  let req = {
    header: {},
    body: {
      pilotId: "65750a81dd9fc2bb1b1413e9",
      state: "TX",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "pilotInfo doesnt exist" });
});

test("PilotAddressPut returns status code 406 if address wasnt updated", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel)
    .toReturn({}, "findOne")
    .toReturn([], "findOneAndUpdate");

  let req = {
    header: {},
    body: {
      pilotId: "65750a81dd9fc2bb1b1413e9",
      state: "TX",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});
test("PilotAddressPut returns status code 201 if address was updated", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel)
    .toReturn({}, "findOne")
    .toReturn({}, "findOneAndUpdate");

  let req = {
    header: {},
    body: {
      pilotId: "65750a81dd9fc2bb1b1413e9",
      state: "TX",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
});
