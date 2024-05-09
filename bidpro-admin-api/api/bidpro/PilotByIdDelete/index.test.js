const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/pilots");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("PilotByIdDelete returns status code 404 with errors if missing params in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing params in Request" });
});
test("PilotByIdDelete returns status code 404 with errors if missing pilotid in request", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing params in Request" });
});

test("PilotByIdDelete returns status code 406 with errors if pilot wasnt deleted", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn([], "deleteOne");

  let req = {
    header: {},
    params: {
      pilotid: "65750a81dd9fc2bb1b1413e9",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body).toEqual({ error: `Id ${req.params.pilotid} was not deleted` });
});

test("PilotByIdDelete returns status code 204 if pilot was deleted", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn({ deletedCount: 1 }, "deleteOne");

  let req = {
    header: {},
    params: {
      pilotid: "65750a81dd9fc2bb1b1413e9",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(204);
});
