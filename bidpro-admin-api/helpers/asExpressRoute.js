/**
 * Converts an Azure Functions style route notation into an Express style.
 *
 * An Azure-style `user/{username}/role/{roleId}` becomes `/user/:username/role/:roleId`.
 */
module.exports = function asExpressRoute(route) {
  const replaced = route.replace(/(\{.+?\})/g, (segment) => {
    return segment.replace("{", ":").replace("}", "");
  });

  if (replaced[0] !== "/") {
    return "/" + replaced;
  } else {
    return replaced;
  }
};
