const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/bidpro");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");
const { Types } = require("mongoose");

test("BidTypeImportPut returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});
test("BidTypeImportPut returns status code 404 with errors if missing bidTypeId in request", async () => {
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
test("BidTypeImportPut returns status code 404 with errors if bidType doesnt exist", async () => {
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
  expect(body).toEqual({ error: "bidType doesnt exist" });
});

test("BidTypeImportPut returns status code 404 if status already 1", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/json-responses/bidtypeimport-response.json" //can reuse the same bidType
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "save");

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
  expect(body).toEqual({ error: "bidType status is already 1" });
});

test("BidTypeImportPut returns status code 406 if status was not updated", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidtype-add-post-document.json" //can reuse the same bidType
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "save");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  // const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  //expect(body).toEqual(bidProResponse);
});

test("BidTypeImportPut returns status code 200 if status was updated successfully", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidtype-add-post-document.json" //can reuse the same bidType
  );

  const bidProResponse = getJSON(
    "../api/bidpro/_test/json-responses/bidtypeimport-response.json" //can reuse the same bidType
  );

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn(bidProResponse, "save");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(JSON.stringify(body)).toEqual(JSON.stringify(bidProResponse));
});
