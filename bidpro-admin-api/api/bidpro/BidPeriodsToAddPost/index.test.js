const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/bidpro");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");
const { Types } = require("mongoose");

test("BidPeriodsToAddPost returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});
test("BidPeriodsToAddPost returns status code 404 with errors if missing id in request", async () => {
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
test("BidPeriodsToAddPost returns status code 404 with errors if missing bidPeriodsToAdd in request", async () => {
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
  expect(body).toEqual({ error: "Missing bidPeriodsToAdd in Request" });
});

test("BidPeriodsToAddPost returns status code 404 bidType doesnt exist", async () => {
  const BidProModel = require("../models/bidpro");

  mockingoose(BidProModel).toReturn([], "findOne").toReturn([], "updateOne");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodsToAdd: [
        {
          _id: "6567f30abf3c4f0e7f8ee1b0",
          month: 3,
          year: 2023,
        },
        {
          _id: "6567f341814b6880a76adc39",
          month: 4,
          year: 2023,
        },
        {
          _id: "6567f344614dc1da0e314d8e",
          month: 5,
          year: 2023,
        },
      ],
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "bidType doesnt exist" });
});

test("BidPeriodsToAddPost returns status code 404 without errors if bidPeriods already exist", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-add-post-document.json"
  );

  const BidProModel = require("../models/bidpro");
  mockingoose(BidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "updateOne");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodsToAdd: [
        {
          _id: "6567f30abf3c4f0e7f8ee1b0",
          month: 3,
          year: 2023,
        },
        {
          _id: "6567f341814b6880a76adc39",
          month: 4,
          year: 2023,
        },
        {
          _id: "6567f344614dc1da0e314d8e",
          month: 8,
          year: 2023,
        },
      ],
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  //const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  //expect(body).toEqual({ error: "Missing year in Request" });
});

test("BidPeriodsToAddPost returns status code 404 without errors if bidPeriodsToAdd has a duplicate", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-add-post-document.json"
  );

  const BidProModel = require("../models/bidpro");
  mockingoose(BidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "updateOne");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodsToAdd: [
        {
          _id: "6567f30abf3c4f0e7f8ee1b0",
          month: 3,
          year: 2023,
        },
        {
          _id: "6567f341814b6880a76adc39",
          month: 4, //duplicate
          year: 2023,
        },
        {
          _id: "6567f344614dc1da0e314d8e",
          month: 4, //duplicate
          year: 2023,
        },
      ],
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  //const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  //expect(body).toEqual({ error: "Missing year in Request" });
});

test("BidPeriodsToAddPost return status code 406 bidType not added", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-add-post-document.json"
  );

  const BidProModel = require("../models/bidpro");
  mockingoose(BidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn([], "updateOne");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodsToAdd: [
        {
          _id: "65681f20bfca6c80d17f4fb1",
          month: 3,
          year: 2023,
        },
        {
          _id: "65681f344354396c22d494d5",
          month: 4,
          year: 2023,
        },
        {
          _id: "65681f3703f4ed7cea1400aa",
          month: 5,
          year: 2023,
        },
      ],
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body).toEqual({ error: "bidType not added" });
});

test("BidPeriodsToAddPost return status code 200 bidType successfully added", async () => {
  const bidProDocument = getJSON(
    "../api/bidpro/_test/documents/bidperiod-add-post-document.json"
  );

  const bidProUpdateReturn = getJSON(
    "../api/bidpro/_test/json-responses/bidperiod-add-post-response.json"
  );

  const BidProModel = require("../models/bidpro");
  mockingoose(BidProModel)
    .toReturn(bidProDocument, "findOne")
    .toReturn(bidProUpdateReturn, "updateOne");

  let req = {
    header: {},
    body: {
      bidTypeId: "65544504b8915a0d762c2955",
      bidPeriodsToAdd: [
        {
          _id: "65681f20bfca6c80d17f4fb1",
          month: 3,
          year: 2023,
        },
        {
          _id: "65681f344354396c22d494d5",
          month: 4,
          year: 2023,
        },
        {
          _id: "65681f3703f4ed7cea1400aa",
          month: 5,
          year: 2023,
        },
      ],
    },
  };

  let res = makeMockRes();
  await func.inject({ BidProModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(201);
  expect(JSON.stringify(body)).toEqual(JSON.stringify(bidProUpdateReturn));
});
