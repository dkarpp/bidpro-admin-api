const express = require("express");
const YAML = require("js-yaml");
const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");
mongoose.connect("MONGODB_DB_CONNECTION").catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 3750;

app.use(express.json());

//Routes
const findRoutes = require("./helpers/findRoutes");
const mountRoute = require("./helpers/mountRoute");

const { routes } = YAML.load(fs.readFileSync("./api/routes.yaml"));

routes.forEach((route) => {
  const routeDir = path.join(__dirname, "api", route.path);

  findRoutes(routeDir).forEach((fn) => {
    mountRoute(app, route.prefix, fn);
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
