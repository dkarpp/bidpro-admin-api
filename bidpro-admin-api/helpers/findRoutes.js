const path = require("path");
const fs = require("fs");
const YAML = require("js-yaml");
const asExpressRoute = require("./asExpressRoute");

/**
 * Dig through a directory to find all route configs.
 */
module.exports = function findRoutes(directory) {
  directory = path.resolve(directory);

  const routes = [];

  for (const file of fs.readdirSync(directory)) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const name = file;
      const entrypoint = path.join(filePath, "index.js");

      let configPath = path.join(filePath, "route.yaml");

      if (fs.existsSync(configPath)) {
        const config = YAML.load(fs.readFileSync(configPath));

        routes.push({
          name,
          entrypoint,
          method: config.method.trim().toUpperCase(),
          route: asExpressRoute(config.route),
        });
      }
    }
  }

  routes.sort((a, b) => {
    if (a.route < b.route) {
      return -1;
    } else if (a.route > b.route) {
      return +1;
    } else {
      return 0;
    }
  });

  return routes;
};
