const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("BidPeriodsByFleetSeatDomicileGet returns status code 404 for missing params", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();
  const bidProModel = require("../models/bidpro");
  await func.inject({ bidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("BidPeriodsByFleetSeatDomicileGet returns status code 404 for missing fleet, seat, and domicile", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  const bidProModel = require("../models/bidpro");
  await func.inject({ bidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

test("BidPeriodsByFleetSeatDomicileGet returns bidperiod based on fleet, seat, and domicile", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-by-seat-fleet-domicile-document.json"
  );
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn(bidProDocument, "find");

  let req = {
    header: {},
    params: {
      fleet: "A300",
      seat: "CPT",
      domicile: "DFW",
    },
  };

  let res = makeMockRes();
  await func.inject({ bidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  const bidProResponse = getJSON(
    "../api/bidpro/_test/json-responses/bidperiod-by-seat-fleet-domicile-response.json"
  );

  expect(JSON.stringify(body)).toBe(JSON.stringify(bidProResponse));
});
