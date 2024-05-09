const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/pilots");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("PilotBidInfoPut returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});

test("PilotBidInfoPut returns status code 404 with errors if missing pilotId in request", async () => {
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
test("PilotBidInfoPut returns status code 404 with errors if missing fleet, seat, or domicile in request", async () => {
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
    error: "Must pass in fleet, seat, or domicile in Request",
  });
});

test("PilotBidInfoPut returns status code 404 with errors if pilot doesnt exist", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn([], "findOne");

  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      seat: "NOTFO",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "pilotInfo doesnt exist" });
});

test("PilotBidInfoPut returns status code 404 with errors if seat is not CPT or FO", async () => {
  const pilotReturn = getJSON(
    "../api/bidpro/_test/documents/pilotbidinfo-document.json"
  );
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn(pilotReturn, "findOne");

  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      seat: "NOTFO",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({
    error: "seat is not CPT or FO",
  });
});

test("PilotBidInfoPut returns status code 404 with errors if fleet is not 3 or 4 letters", async () => {
  const pilotReturn = getJSON(
    "../api/bidpro/_test/documents/pilotbidinfo-document.json"
  );
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn(pilotReturn, "findOne");

  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      fleet: "TEXAS",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({
    error: "fleet is not 3 or 4 letters",
  });
});

test("PilotBidInfoPut returns status code 404 with errors if domicile is not 3 letters", async () => {
  const pilotReturn = getJSON(
    "../api/bidpro/_test/documents/pilotbidinfo-document.json"
  );
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn(pilotReturn, "findOne");

  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      domicile: "GEGGG",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({
    error: "domicile is not 3 letters",
  });
});

test("PilotBidInfoPut returns status code 406 if pilot was not updated", async () => {
  const pilotReturn = getJSON(
    "../api/bidpro/_test/documents/pilotbidinfo-document.json"
  );
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel)
    .toReturn(pilotReturn, "findOne")
    .toReturn([], "findOneAndUpdate");

  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      domicile: "GEG",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});

test("PilotBidInfoPut returns status code 201 updated successfully", async () => {
  const pilotReturn = getJSON(
    "../api/bidpro/_test/documents/pilotbidinfo-document.json"
  );

  const updated = {
    pilotInfo: {
      firstName: "Tom",
      lastName: "Jones",
      email: "tttjones@ups.com",
      areaCode: "509",
      prefix: "555",
      suffix: "1212",
      address1: "1313 Mocking Bird Lane",
      address2: null,
      city: "Spokane",
      state: "WA",
      postalCode: "99208",
    },
    bidInfo: {
      seat: "CPT",
      fleet: "53A",
      domicile: "GEG",
    },
    _id: "6576c595c00bf2392a2c3528",
    airline: "UPS",
  };

  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel)
    .toReturn(pilotReturn, "findOne")
    .toReturn(updated, "findOneAndUpdate");

  let req = {
    header: {},
    body: {
      pilotId: "656dfb178c6dd51c6ac62d0a",
      seat: "CPT",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
});
