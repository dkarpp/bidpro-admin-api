const path = require("path");
//const knex = require("knex");
//const knex = require("../db/knex")();

/**
 * Mount a route handler at `/api/{prefix}/{routeConfig.route}`
 */
module.exports = function mountRoute(app, prefix, routeConfig) {
  const route = path.posix.join("/api", prefix, routeConfig.route);
  const method = routeConfig.method.toLowerCase();

  if (app[method] == null) {
    throw new Error(`Express doesn't support method '${method}'`);
  }

  const mount = app[method].bind(app);

  const middleware = [];

  mount(route, ...middleware, (req, res) => {
    const func = require(routeConfig.entrypoint);

    func
      .inject({  })(req, res)
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({
            message: err.message,
          })
          .send();
      });
  });

  console.log(
    `  ${routeConfig.method.padStart(6)} ${route} [${routeConfig.name}]`
  );
};
