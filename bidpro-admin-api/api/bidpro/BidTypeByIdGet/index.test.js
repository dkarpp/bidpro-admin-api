const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("BidTypeByIdGet returns status code 404 for missing params", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  const bidProModel = require("../models/bidpro");
  await func.inject({ bidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

test("BidTypeByIdGet returns status code 404 for missing id", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  const bidProModel = require("../models/bidpro");

  await func.inject({ bidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("BidTypeByIdGet returns status code 404 if the document is not found for id", async () => {
  let req = {
    header: {},
    params: {
      id: "aegseg",
    },
  };

  let res = makeMockRes();

  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn([], "find");
  await func.inject({ bidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

test("BookByIdGet returns 200 based on id", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidpro-by-id-get-document.json"
  );
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn(bidProDocument, "find");

  let req = {
    header: {},
    params: {
      id: "655441e9b8915a0d762c294c",
    },
  };

  let res = makeMockRes();
  await func.inject({ bidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  const bidProResponse = getJSON(
    "../api/bidpro/_test/json-responses/bidpro-by-id-get-response.json"
  );

  //expect(body).toEqual(books);
  expect(JSON.stringify(body)).toBe(JSON.stringify(bidProResponse));
});
