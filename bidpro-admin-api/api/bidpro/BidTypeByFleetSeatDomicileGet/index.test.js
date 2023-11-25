const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("BidTypeByFleetSeatDomicileGet returns status code 404 for missing params", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();
  const bidProModel = require("../models/bidpro");
  await func.inject({ bidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("BidTypeByFleetSeatDomicileGet returns status code 404 for missing seat, fleet, and domicile", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  const bidProModel = require("../models/bidpro");

  await func.inject({ bidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("BidTypeByFleetSeatDomicileGet returns bid type based on fleet, seat, and domicile", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidpro-by-seat-fleet-domicile-document.json"
  );
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn(bidProDocument, "find");

  let req = {
    header: {},
    params: {
      fleet: "757",
      seat: "CPT",
      domicile: "GEG",
    },
  };

  let res = makeMockRes();
  await func.inject({ bidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  const bidProResponse = getJSON(
    "../api/bidpro/_test/json-responses/bidpro-by-seat-fleet-domicile-response.json"
  );

  //expect(body).toEqual(books);
  expect(JSON.stringify(body)).toBe(JSON.stringify(bidProResponse));
});
