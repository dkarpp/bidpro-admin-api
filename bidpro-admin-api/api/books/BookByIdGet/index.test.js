const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("BookByIdGet returns status code 404 for missing params", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  const BooksModel = require("../models/book");

  await func.inject({ BooksModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("BookByIdGet returns status code 404 for missing id", async () => {
  let req = {
    header: {},
    params: {},
  };

  let res = makeMockRes();

  const BooksModel = require("../models/book");

  await func.inject({ BooksModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("BookByIdGet returns status code 404 if the document is not found for id", async () => {
  let req = {
    header: {},
    params: {
      id: "aegseg",
    },
  };

  let res = makeMockRes();

  const BooksModel = require("../models/book");
  mockingoose(BooksModel).toReturn([], "find");

  await func.inject({ BooksModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("BookByIdGet returns book based on id", async () => {
  const bookDocument = getJSON(
    "../api/books/_test/documents/book-by-id-get-document.json"
  );
  const BooksModel = require("../models/book");
  mockingoose(BooksModel).toReturn(bookDocument, "find");

  let req = {
    header: {},
    params: {
      id: "654032720d8b454a3e6d6615",
    },
  };

  let res = makeMockRes();

  await func.inject({ BooksModel })(req, res);

  const body = res.json.mock.calls[0][0];

  //console.log(JSON.stringify(body));

  expect(res.status).toHaveBeenCalledWith(200);
  const bookResponse = getJSON(
    "../api/books/_test/json-responses/book-by-id-get-response.json"
  );

  //expect(body).toEqual(books);
  expect(JSON.stringify(body)).toBe(JSON.stringify(bookResponse));
});
