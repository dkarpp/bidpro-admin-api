const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/pilots");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("PilotPhonePut returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});

test("PilotPhonePut returns status code 404 with errors if missing pilotId in request", async () => {
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
test("PilotPhonePut returns status code 404 with errors if missing areaCode in request", async () => {
  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({
    error: "Must pass in fleet, seat, and domicile in Request",
  });
});
test("PilotPhonePut returns status code 404 with errors if missing prefix in request", async () => {
  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      areaCode: "201",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({
    error: "Must pass in fleet, seat, and domicile in Request",
  });
});
test("PilotPhonePut returns status code 404 with errors if missing suffix in request", async () => {
  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      areaCode: "201",
      prefix: "453",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({
    error: "Must pass in fleet, seat, and domicile in Request",
  });
});

test("PilotPhonePut returns status code 404 if pilotInfo doesnt exist", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn([], "findOne");
  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      areaCode: "301",
      prefix: "453",
      suffix: "0012",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({
    error: "pilotInfo doesnt exist",
  });
});

test("PilotPhonePut returns status code 406 if pilotInfo wasnt updated", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel)
    .toReturn({}, "findOne")
    .toReturn([], "findOneAndUpdate");
  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      areaCode: "301",
      prefix: "453",
      suffix: "0012",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});

test("PilotPhonePut returns status code 201 if updated successfully", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel)
    .toReturn({}, "findOne")
    .toReturn({}, "findOneAndUpdate");
  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      areaCode: "301",
      prefix: "453",
      suffix: "0012",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
});
