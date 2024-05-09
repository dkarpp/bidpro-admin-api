const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/bidpro");
const mockingoose = require("mockingoose");

test("BidPeriodDelete returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});

test("BidPeriodDelete returns status code 404 with errors if missing bidTypeId in request", async () => {
  let req = {
    header: {},
    body: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing bidTypeId in Request" });
});
test("BidPeriodDelete returns status code 404 with errors if missing bidPeriodToDelete in request", async () => {
  let req = {
    header: {},
    body: {
      bidTypeId: "6569850c12d7c0dd1c1aa819",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing bidPeriodToDelete in Request" });
});

test("BidPeriodDelete returns status code 404 with errors if missing month in request", async () => {
  let req = {
    header: {},
    body: {
      bidTypeId: "6569850c12d7c0dd1c1aa819",
      bidPeriodToDelete: {},
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing month in Request" });
});
test("BidPeriodDelete returns status code 404 with errors if missing year in request", async () => {
  let req = {
    header: {},
    body: {
      bidTypeId: "6569850c12d7c0dd1c1aa819",
      bidPeriodToDelete: {
        month: 3,
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing year in Request" });
});

test("BidPeriodDelete returns status code 406 bidPeriod was not deleted", async () => {
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn(null, "findOneAndUpdate");
  let req = {
    header: {},
    body: {
      bidTypeId: "6569850c12d7c0dd1c1aa819",
      bidPeriodToDelete: {
        month: 3,
        year: 2023,
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body).toEqual({
    error: `Bid period for month ${req.body.bidPeriodToDelete.month} and year ${req.body.bidPeriodToDelete.year} in bid type ${req.body.bidTypeId} was not deleted`,
  });
});

test("BidPeriodDelete returns status code 204 bidPeriod was deleted successfully", async () => {
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn({}, "findOneAndUpdate");

  let req = {
    header: {},
    body: {
      bidTypeId: "6569850c12d7c0dd1c1aa819",
      bidPeriodToDelete: {
        month: 3,
        year: 2023,
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(204);
});
