/* istanbul ignore file */

/**
 * Wrap a function in a simple DI system. Returns a wrapped version of the function that will receive default params when
 * called normally, but also includes an `.inject({ ...params: any })` method that returns a bound function that will
 * receive the supplied params instead of defaults (with defaults for fields that aren't passed).
 *
 * @param config - An object with options. Most important is the `defaults` object, with functions for generating default dependencies.
 * @param func - The function to wrap. Receives injected param object, then the arguments it's called with.
 */
module.exports = function makeInjectable(config, func) {
  if (config.defaults == null) {
    console.warn("Config object has no 'defaults' field.");
  }
  /**
   * This is the actual function that is exported and run, either by
   * the Functions runtime or by unit test code.
   */
  async function wrapper(...params) {
    // If first param has __injected__, merge provided deps with defaults
    // If first param doesn't, it's probably a context, so use only defaults
    const injected =
      params[0].__injected__ === true ? params.shift() : undefined;
    const [deps, constructedKeys] = await mergeDefaults(config, injected);
    await func(deps, ...params);
    if (config.cleanup) {
      // Cleanup functions will be run for each constructed dep if they're defined.
      // Injected deps are assumed to be cleaned up by the code that injects them.
      for (const key of constructedKeys) {
        if (config.cleanup[key]) {
          try {
            await config.cleanup[key](deps[key]);
          } catch (err) {
            console.warn(
              `Dependency '${key}' cleanup function crashed: ${err.message}`
            );
            console.error(err);
          }
        }
      }
    }
  }
  // Return a copy of the function with deps object bound as first argument.
  wrapper.inject = (deps) =>
    wrapper.bind(
      null,
      Object.assign(Object.assign({}, deps), { __injected__: true })
    );
  return wrapper;
};
/**
 * Merges passed params, falling back to defaults for keys that aren't passed.
 */
async function mergeDefaults(config, params) {
  const merged = {};
  const constructedKeys = [];
  if (params) {
    for (const key in params) {
      if (key !== "__injected__" && !(key in config.defaults)) {
        console.warn(
          `Param '${key}' was injected but not defined in defaults.`
        );
      }
    }
  }
  for (const key in config.defaults) {
    if (params == null) {
      merged[key] = await config.defaults[key]();
      constructedKeys.push(key);
    } else if (params[key]) {
      merged[key] = params[key];
    } else {
      merged[key] = await config.defaults[key]();
      constructedKeys.push(key);
    }
  }
  return [merged, constructedKeys];
}
