const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const BooksModel = require("../models/book");
const mockingoose = require("mockingoose");
const { getJSON } = require("../../../helpers/readFile");

test("BookPost return status code 404 with errors if missing body", async () => {
  let req = {
    header: {},
  };

  let res = makeMockRes();

  await func.inject({ BooksModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing Body of Request" });
});

test("BookPost return status code 404 with errors if missing title from body of request", async () => {
  let req = {
    header: {},
    body: {},
  };

  let res = makeMockRes();

  await func.inject({ BooksModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing title from Body of Request" });
});

test("BookPost return status code 404 with errors if missing genre from body of request", async () => {
  let req = {
    header: {},
    body: { title: "Lord of the Rings" },
  };

  let res = makeMockRes();

  await func.inject({ BooksModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing genre from Body of Request" });
});

test("BookPost return status code 404 with errors if missing author from body of request", async () => {
  let req = {
    header: {},
    body: { title: "Lord of the Rings", genre: "Fantasy" },
  };

  let res = makeMockRes();

  await func.inject({ BooksModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing author from Body of Request" });
});

test("BookPost return status code 404 with errors if missing read from body of request", async () => {
  let req = {
    header: {},
    body: {
      title: "Lord of the Rings",
      genre: "Fantasy",
      author: "J.R.R. Tolkien",
    },
  };

  let res = makeMockRes();

  await func.inject({ BooksModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);
  expect(body).toEqual({ error: "Missing read from Body of Request" });
});

/**
 * You will finish the Unit Testing for the successful response
 */

test("BookPost return status code 200 if successfully added", async () => {
  let req = {
    header: {},
    body: {
      title: "Lord of the Rings",
      genre: "Fantasy",
      author: "J.R.R. Tolkien",
      read: true,
    },
  };
  let res = makeMockRes();
  await func.inject({ BooksModel })(req, res);

  expect(res.status).toHaveBeenCalledWith(200);

  //expect(body).toEqual(books);
  //expect(body).toBe(JSON.stringify(bookPostResponse));

  /*
  let res = makeMockRes();

  await func.inject({ BooksModel })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual({ BooksModel });*/

  //api\books\_test\documents\book-post-document.json
});

/*
test("BookPost return status code 200 if successfully added", async () => {
  let req = {
    header: {},
    body: {
      title: "The Lord of the Rings",
      genre: "Fantasy",
      author: "J.R.R. Tolkein",
      read: true,
    },
  };

  let res = makeMockRes();

  await func.inject({ BooksModel })(req, res);
  //const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);
  // expect(body).toEqual({ error: "Missing read from Body of Request" });
  //expect(body).toEqual({ error: "Missing read from Body of Request" });
});
*/
