const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/bidpro");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");
const { Types } = require("mongoose");

test("BidTypeImportCompletePut returns status code 404 with errors if missing params in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing params in Request" });
});
test("BidTypeImportCompletePut returns status code 404 with errors if missing id in request", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing id in Request" });
});
test("BidTypeImportCompletePut returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
    params: {
      id: "65544504b8915a0d762c2955",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});
test("BidTypeImportCompletePut returns status code 404 with errors if missing date in request", async () => {
  let req = {
    header: {},
    params: {
      id: "65544504b8915a0d762c2955",
    },
    body: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing date in Request" });
});

test("BidTypeImportCompletePut returns status code 404 with errors if bidType doesnt exist", async () => {
  //how did this work in importput

  const bidProDocument = getJSON(
    "../api/bidpro/_test/json-responses/bidtypeimport-response.json"
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn([], "findOne");

  let req = {
    header: {},
    params: {
      id: "65544504b8915a0d762c2955",
    },
    body: {
      date: new Date(),
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "bidType doesnt exist" });
});

test("BidTypeImportCompletePut returns status code 404 if status already 0", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/json-responses/bidtypeimportcancel-response.json" //can reuse the same bidType
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "save");

  let req = {
    header: {},
    params: {
      id: "65544504b8915a0d762c2955",
    },
    body: {
      date: new Date(),
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "bidType status is already 0" });
});

test("BidTypeImportCompletePut returns status code 406 if status was not updated", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/json-responses/bidtypeimport-response.json" //can reuse the same bidType
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "save");

  let req = {
    header: {},
    params: {
      id: "65544504b8915a0d762c2955",
    },
    body: {
      date: new Date(),
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(406);
});

test("BidTypeImportCompletePut returns status code 200 if status was updated successfully", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/json-responses/bidtypeimport-response.json"
  );

  const bidProResponse = getJSON(
    "../api/bidpro/_test/json-responses/bidtypeimportcancel-response.json"
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn(bidProResponse, "save");

  let req = {
    header: {},
    params: {
      id: "65544504b8915a0d762c2955",
    },
    body: {
      date: new Date(),
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(JSON.stringify(body)).toEqual(JSON.stringify(bidProResponse));
});
