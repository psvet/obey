/**
 * @namespace plugins
 */
const plugins = {
  /**
   * @memberof plugins
   * @property {Object} Library of plugins
   */
  lib: {},
  /**
   * Adds a package to the library
   * @memberof creators
   * @param {string} name The name of the package
   * @param {function|Object} fn The package reference
   */
  add: (name, pkg) => {
    if (typeof name !== 'string') throw new Error('plugin name should be a string')
    if (typeof pkg !== 'object' && typeof pkg !== 'function') {
      throw new Error('plugin package should be an object or function')
    }
    plugins.lib[name] = pkg
  }
}

module.exports = plugins
