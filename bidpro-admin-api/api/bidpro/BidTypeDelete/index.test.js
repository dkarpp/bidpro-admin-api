const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/pilots");
const mockingoose = require("mockingoose");

test("BidTypeDelete returns status code 404 with errors if missing params in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing params in Request" });
});

test("BidTypeDelete returns status code 404 with errors if missing seat in request", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing seat in Request" });
});

test("BidTypeDelete returns status code 404 with errors if missing fleet in request", async () => {
  let req = {
    header: {},
    params: {
      seat: "CPT",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing fleet in Request" });
});
test("BidTypeDelete returns status code 404 with errors if seat is not CPT or FO", async () => {
  let req = {
    header: {},
    params: {
      seat: "NOTFO",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "seat is not CPT or FO" });
});

test("BidTypeDelete returns status code 404 with errors if missing domicile in request", async () => {
  let req = {
    header: {},
    params: {
      seat: "CPT",
      fleet: "73G",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing domicile in Request" });
});
test("BidTypeDelete returns status code 404 with errors if fleet is not 3 or 4 letters", async () => {
  let req = {
    header: {},
    params: {
      seat: "CPT",
      fleet: "73",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "fleet is not 3 or 4 letters" });
});
test("BidTypeDelete returns status code 404 with errors if domicile is not 3 letters", async () => {
  let req = {
    header: {},
    params: {
      seat: "CPT",
      fleet: "73G",
      domicile: "GEGG",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "domicile is not 3 letters" });
});

test("BidTypeDelete returns status code 409 with errors if bidType is assigned to pilot", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn({ message: "notempty" }, "find");

  let req = {
    header: {},
    params: {
      seat: "CPT",
      fleet: "73G",
      domicile: "GEG",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(409);
  expect(body).toEqual({ error: "bidType is assigned to pilot" });
});

test("BidTypeDelete returns status code 406 if bidtype wasnt deleted", async () => {
  const bidProModel = require("../models/pilots");
  const bidTypeModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn([], "find");
  mockingoose(bidTypeModel).toReturn({ deletedCount: 0 }, "deleteOne");
  let req = {
    header: {},
    params: {
      seat: "CPT",
      fleet: "73G",
      domicile: "GEG",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body).toEqual({ error: "BidType was not deleted." });
});

test("BidTypeDelete returns status code 204 if bidtype was deleted", async () => {
  const bidProModel = require("../models/pilots");
  const bidTypeModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn([], "find");
  mockingoose(bidTypeModel).toReturn({ deletedCount: 1 }, "deleteOne");
  let req = {
    header: {},
    params: {
      seat: "CPT",
      fleet: "73G",
      domicile: "GEG",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(204);
});
