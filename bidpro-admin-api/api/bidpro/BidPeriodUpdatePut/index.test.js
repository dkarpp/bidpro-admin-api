const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/bidpro");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");
const { Types } = require("mongoose");

test("BidPeriodUpdatePut returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});
test("BidPeriodUpdatePut returns status code 404 with errors if missing bidTypeId in request", async () => {
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

test("BidPeriodUpdatePut returns status code 404 with errors if missing bidPeriodToUpdate in request", async () => {
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
  expect(body).toEqual({ error: "Missing bidPeriodToUpdate in Request" });
});

test("BidPeriodUpdatePut returns status code 404 with errors if missing bidPeriodId in request", async () => {
  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodToUpdate: {},
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing bidPeriodId in Request" });
});

test("BidPeriodUpdatePut returns status code 404 with errors if missing month in request", async () => {
  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodToUpdate: {
        bidPeriodId: "6567f30abf3c4f0e7f8ee1b0",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing month in Request" });
});
test("BidPeriodUpdatePut returns status code 404 with errors if missing year in request", async () => {
  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodToUpdate: {
        bidPeriodId: "6567f30abf3c4f0e7f8ee1b0",
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

test("BidPeriodUpdatePut returns status code 404 with errors if bidType doesnt exist", async () => {
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn([], "findOne");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodToUpdate: {
        bidPeriodId: "6567f30abf3c4f0e7f8ee1b0",
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

test("BidPeriodUpdatePut returns status code 404 with errors if bidPeriod id doesnt exist", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-update-put-document.json"
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn(bidProDocument, "findOne");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodToUpdate: {
        bidPeriodId: "6567f30abf3c4f033f8ee1b0", //random id that doesnt exist
        month: 3,
        year: 2023,
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "bidPeriod id not found" });
});

test("BidPeriodUpdatePut returns status code 406 if status was not updated", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-update-put-document.json"
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "save");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodToUpdate: {
        bidPeriodId: "6567f30abf3c4f0e7f8ee1b0",
        month: 3,
        year: 2023,
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(406);
});

test("BidPeriodUpdatePut returns status code 200 if status was updated successfully", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-update-put-document.json"
  );

  const bidProResponse = getJSON(
    "../api/bidpro/_test/json-responses/bidperiod-update-put-response.json"
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn(bidProResponse, "save");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodToUpdate: {
        bidPeriodId: "6567f30abf3c4f0e7f8ee1b0",
        month: 3,
        year: 2024,
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(JSON.stringify(body)).toEqual(JSON.stringify(bidProResponse));
});
