/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const generators = {
  /**
   * Library of generators
   */
  lib: {},

  /**
   * Validator method, used by model
   * @param {Object} schema The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  validator: function(schema, key, value) {
    if (value !== undefined) return value
    if (generators.lib[schema.generator]) return generators.lib[schema.generator]()
    throw new Error(`Generator '${schema.generator}' does not exist`)
  },

  /**
   * Adds a generator to the library
   * @param {String} name The name of the generator
   * @param {Function} fn The generator's method
   */
  add: (name, fn) => {
    if (typeof name !== 'string') throw new Error('Generator name should be a string')
    if (typeof fn !== 'function') throw new Error('Generator method should be a function')
    generators.lib[name] = fn
  }
}

export default generators
