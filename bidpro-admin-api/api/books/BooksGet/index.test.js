const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("BooksGet returns list of books", async () => {
  const booksDocuments = getJSON(
    "../api/books/_test/documents/books-get-documents.json"
  );
  const BooksModel = require("../models/book");
  mockingoose(BooksModel).toReturn(booksDocuments, "find");

  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BooksModel })(req, res);

  const body = res.json.mock.calls[0][0];

  //console.log(JSON.stringify(body));

  expect(res.status).toHaveBeenCalledWith(200);
  const booksResponse = getJSON(
    "../api/books/_test/json-responses/books-get-response.json"
  );

  //expect(body).toEqual(books);
  expect(JSON.stringify(body)).toBe(JSON.stringify(booksResponse));
});
