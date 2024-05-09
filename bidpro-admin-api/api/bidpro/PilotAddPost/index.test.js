const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BidProModel = require("../models/pilots");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("PilotAddPost returns status code 404 with errors if missing body in request", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing body in Request" });
});

test("PilotAddPost returns status code 404 with errors if missing airline in request", async () => {
  let req = {
    header: {},
    body: {},
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing airline in Request" });
});

test("PilotAddPost returns status code 404 with errors if missing pilotInfo in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing pilotInfo in Request" });
});

test("PilotAddPost returns status code 404 with errors if missing firstName in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {},
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing firstName in Request" });
});
test("PilotAddPost returns status code 404 with errors if missing lastName in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing lastName in Request" });
});
test("PilotAddPost returns status code 404 with errors if missing email in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing email in Request" });
});
test("PilotAddPost returns status code 404 with errors if missing areaCode in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing areaCode in Request" });
});
test("PilotAddPost returns status code 404 with errors if missing prefix in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing prefix in Request" });
});
test("PilotAddPost returns status code 404 with errors if missing suffix in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing suffix in Request" });
});
test("PilotAddPost returns status code 404 with errors if missing address1 in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing address1 in Request" });
});
test("PilotAddPost returns status code 404 with errors if missing address2 in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing address2 in Request" });
});
test("PilotAddPost returns status code 404 with errors if missing city in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing city in Request" });
});
test("PilotAddPost returns status code 404 with errors if missing state in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing state in Request" });
});

test("PilotAddPost returns status code 404 with errors if missing postalCode in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing postalCode in Request" });
});

test("PilotAddPost returns status code 404 with errors if missing bidInfo in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing bidInfo in Request" });
});

test("PilotAddPost returns status code 404 with errors if missing seat in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
      bidInfo: {},
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing seat in Request" });
});

test("PilotAddPost returns status code 404 with errors if seat is not CPT or FO", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
      bidInfo: {
        seat: "FOO",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "seat is not CPT or FO" });
});

test("PilotAddPost returns status code 404 with errors if missing fleet in request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
      bidInfo: {
        seat: "CPT",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing fleet in Request" });
});

test("PilotAddPost returns status code 404 with errors if fleet is not 3 or 4 letters", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
      bidInfo: {
        seat: "CPT",
        fleet: "73GAA",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "fleet is not 3 or 4 letters" });
});
test("PilotAddPost returns status code 404 with errors if missing domicile in Request", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
      bidInfo: {
        seat: "CPT",
        fleet: "73G",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing domicile in Request" });
});

test("PilotAddPost returns status code 404 with errors if domicile is not 3 letters", async () => {
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
      bidInfo: {
        seat: "CPT",
        fleet: "73G",
        domicile: "TEXAS",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "domicile is not 3 letters" });
});
test("PilotAddPost returns status code 404 if email already exists", async () => {
  const bidProModel = require("../models/pilots");

  const returnedInfo = {
    airline: "UPS",
    pilotInfo: {
      firstName: "Joe",
      lastName: "Jones",
      email: "jjones@ups.com",
      areaCode: "509",
      prefix: "555",
      suffix: "1212",
      address1: "1313 Mocking Bird Lane",
      address2: "null",
      city: "Spokane",
      state: "WA",
      postalCode: "99208",
    },
    bidInfo: {
      seat: "CPT",
      fleet: "73G",
      domicile: "GEG",
    },
  };

  mockingoose(bidProModel).toReturn(returnedInfo, "findOne"); //meaning its not null

  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
      bidInfo: {
        seat: "CPT",
        fleet: "73G",
        domicile: "GEG",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "email already exists" });
});

test("PilotAddPost returns status code 406 if bidInfo wasnt added", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn(null, "findOne").toReturn([], "save");

  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
      bidInfo: {
        seat: "CPT",
        fleet: "73G",
        domicile: "GEG",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(406);
});
test("PilotAddPost returns status code 201", async () => {
  const bidProModel = require("../models/pilots");
  mockingoose(bidProModel).toReturn(null, "findOne").toReturn({}, "save");
  let req = {
    header: {},
    body: {
      airline: "UPS",
      pilotInfo: {
        firstName: "Joe",
        lastName: "Jones",
        email: "jjones@ups.com",
        areaCode: "509",
        prefix: "555",
        suffix: "1212",
        address1: "1313 Mocking Bird Lane",
        address2: "null",
        city: "Spokane",
        state: "WA",
        postalCode: "99208",
      },
      bidInfo: {
        seat: "CPT",
        fleet: "73G",
        domicile: "GEG",
      },
    },
  };

  let res = makeMockRes();

  await func.inject({ BidProModel })(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
});
