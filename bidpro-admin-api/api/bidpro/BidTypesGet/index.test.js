const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("BidTypesGet returns list of bidtypes", async () => {
  const bidProDocuments = getJSON(
    "../api/bidpro/_test/documents/bidpro-get-documents.json"
  );
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn(bidProDocuments, "find");

  let req = {
    header: {},
  };

  let res = makeMockRes();
  await func.inject({ bidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  const bidProResponse = getJSON(
    "../api/bidpro/_test/json-responses/bidpro-get-response.json"
  );

  expect(JSON.stringify(body)).toBe(JSON.stringify(bidProResponse));
});
