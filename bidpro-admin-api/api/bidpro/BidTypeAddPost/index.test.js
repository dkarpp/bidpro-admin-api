const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/bidpro");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("BidTypeAddPost return status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});

test("BidTypeAddPost return status code 404 with errors if missing bidType in request", async () => {
  let req = {
    header: {},
    body: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing bidType in Request" });
});

test("BidTypeAddPost return status code 404 with errors if missing fleet in request", async () => {
  let req = {
    header: {},
    body: {
      bidType: {},
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing fleet in Request" });
});

test("BidTypeAddPost return status code 404 with errors if fleet is not 3 or 4 letters", async () => {
  let req = {
    header: {},
    body: {
      bidType: {
        fleet: "73G5G",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "fleet is not 3 or 4 letters" });
});

test("BidTypeAddPost return status code 404 with errors if missing seat in request", async () => {
  let req = {
    header: {},
    body: {
      bidType: {
        fleet: "73G",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing seat in Request" });
});

test("BidTypeAddPost return status code 404 with errors if seat is not CPT or FO", async () => {
  let req = {
    header: {},
    body: {
      bidType: {
        fleet: "73G",
        seat: "PILOT",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "seat is not CPT or FO" });
});

test("BidTypeAddPost return status code 404 with errors if missing domicile in request", async () => {
  let req = {
    header: {},
    body: {
      bidType: {
        fleet: "73G",
        seat: "CPT",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing domicile in Request" });
});

test("BidTypeAddPost return status code 404 with errors if domicile is not 3 letters", async () => {
  let req = {
    header: {},
    body: {
      bidType: {
        fleet: "73G",
        seat: "CPT",
        domicile: "GEGG",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "domicile is not 3 letters" });
});

test("BidTypeAddPost return status code 404 with errors if missing bidPeriods in request", async () => {
  let req = {
    header: {},
    body: {
      bidType: {
        fleet: "73G",
        seat: "CPT",
        domicile: "GEG",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing bidPeriods in Request" });
});

test("BidTypeAddPost return status code 404 with errors if bidType already exists", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidtype-add-post-document.json"
  );
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn(bidProDocument, "find");

  let req = {
    header: {},
    body: {
      bidType: {
        fleet: "73G",
        seat: "CPT",
        domicile: "GEG",
      },
      bidPeriods: [
        {
          _id: "65681265964bb7d147bd93c1",
          month: 1,
          year: 2023,
        },
        {
          _id: "656812690a18b3e54a5110f4",
          month: 2,
          year: 2023,
        },
        {
          _id: "6568126d35098f6e721d5605",
          month: 3,
          year: 2023,
        },
      ],
      status: 0,
      importedOn: "2023-05-08T07:00:00.000Z",
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "bidType already exists" });
});

test("BidTypeAddPost return status code 406 bidType wasnt added", async () => {
  const bidProModel = require("../models/bidpro");
  mockingoose(bidProModel).toReturn([], "find").toReturn([], "save");

  let req = {
    header: {},
    body: {
      bidType: {
        fleet: "73A",
        seat: "CPT",
        domicile: "DAY",
      },
      bidPeriods: [
        {
          _id: "65681265964bb7d147bd93c1",
          month: 1,
          year: 2023,
        },
        {
          _id: "656812690a18b3e54a5110f4",
          month: 2,
          year: 2023,
        },
        {
          _id: "6568126d35098f6e721d5605",
          month: 3,
          year: 2023,
        },
      ],
      status: 0,
      importedOn: "2023-05-08T07:00:00.000Z",
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});

test("BidTypeAddPost return status code 200 bidType successfully added", async () => {
  const bidProModel = require("../models/bidpro");

  const bidTest = {
    _id: "6568e4c967e17517373a9eaa",
    bidType: { fleet: "73A", seat: "CPT", domicile: "DAY" },
    bidPeriods: [
      {
        _id: "65681265964bb7d147bd93c1",
        month: 1,
        year: 2023,
      },
      {
        _id: "656812690a18b3e54a5110f4",
        month: 2,
        year: 2023,
      },
      {
        _id: "6568126d35098f6e721d5605",
        month: 3,
        year: 2023,
      },
    ],
    status: 0,
    importedOn: "2023-05-08T07:00:00.000Z",
  };
  mockingoose(bidProModel).toReturn([], "find").toReturn(bidTest, "save");

  let req = {
    header: {},
    body: {
      bidType: {
        fleet: "73A",
        seat: "CPT",
        domicile: "DAY",
      },
      bidPeriods: [
        {
          _id: "65681265964bb7d147bd93c1",
          month: 1,
          year: 2023,
        },
        {
          _id: "656812690a18b3e54a5110f4",
          month: 2,
          year: 2023,
        },
        {
          _id: "6568126d35098f6e721d5605",
          month: 3,
          year: 2023,
        },
      ],
      status: 0,
      importedOn: "2023-05-08T07:00:00.000Z",
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(201);
  expect(JSON.stringify(body)).toBe(JSON.stringify(bidTest));
});
