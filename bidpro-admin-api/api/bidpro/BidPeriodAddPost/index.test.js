const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/bidpro");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");
const { Types } = require("mongoose");

test("BidPeriodAddPost returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});
test("BidPeriodAddPost returns status code 404 with errors if missing id in request", async () => {
  let req = {
    header: {},
    body: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing id in Request" });
});
test("BidPeriodAddPost returns status code 404 with errors if missing bidPeriodToAdd in request", async () => {
  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing bidPeriodToAdd in Request" });
});
test("BidPeriodAddPost returns status code 404 with errors if missing month in request", async () => {
  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodToAdd: {},
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing month in Request" });
});
test("BidPeriodAddPost returns status code 404 with errors if missing year in request", async () => {
  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodToAdd: { month: 3 },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing year in Request" });
});

test("BidPeriodAddPost returns status code 404 bidTypeId doesnt exist", async () => {
  const BidProModel = require("../models/bidpro");

  mockingoose(BidProModel).toReturn([], "findOne").toReturn([], "updateOne");

  const bidTypeId = "65544504b8915a0d762c2955";
  let req = {
    header: {},
    body: {
      bidTypeId: bidTypeId,
      bidPeriodToAdd: {
        _id: "65681756d85efb0e2170240c",
        month: 3,
        year: 2023,
      },
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "bidType doesnt exist" });
});

test("BidPeriodAddPost returns status code 404 bidPeriod already exists", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-add-post-document.json"
  );
  const BidProModel = require("../models/bidpro");

  mockingoose(BidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "updateOne");

  const bidTypeId = "65544504b8915a0d762c2955";
  let req = {
    header: {},
    body: {
      bidTypeId: bidTypeId,
      bidPeriodToAdd: {
        _id: "65681756d85efb0e2170240c",
        month: 8,
        year: 2023,
      },
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "bidPeriod already exists" });
});

test("BidPeriodAddPost returns status code 406 bidType not added", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-add-post-document.json"
  );
  const BidProModel = require("../models/bidpro");

  mockingoose(BidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "updateOne");

  const bidTypeId = "65544504b8915a0d762c2955";
  let req = {
    header: {},
    body: {
      bidTypeId: bidTypeId, //63ee74d48076e9e5afa59f78
      bidPeriodToAdd: {
        _id: "65681756d85efb0e2170240c", //or generate a new id
        month: 3,
        year: 2023,
      },
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  //const body = res.json.mock.calls[0][0];
  expect(res.status).toHaveBeenCalledWith(406);
  //expect(body).toEqual({ error: "Missing bidPeriods in Request" });
});

test("BidPeriodAddPost returns status code 200 bidType successfully added", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-add-post-document.json"
  );
  const BidProModel = require("../models/bidpro");

  const updatedReturn = {
    bidTypeId: "65544504b8915a0d762c2955", //63ee74d48076e9e5afa59f78
    bidPeriodToAdd: {
      _id: "65681756d85efb0e2170240c", //or generate a new id
      month: 3,
      year: 2023,
    },
  };

  mockingoose(BidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn(updatedReturn, "updateOne");

  const bidTypeId = "65544504b8915a0d762c2955";
  let req = {
    header: {},
    body: {
      bidTypeId: bidTypeId, //63ee74d48076e9e5afa59f78
      bidPeriodToAdd: {
        _id: "65681756d85efb0e2170240c", //or generate a new id
        month: 3,
        year: 2023,
      },
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual(updatedReturn);
});
