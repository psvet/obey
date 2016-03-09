/*
 * Copyright (c) 2015 TechnologyAdvice
 */

/**
 * Generators allow for methods which generate values during validation when a
 * value is not supplied
 * @namespace generators
 */
const generators = {
  /**
   * @memberof generators
   * @property {Object} Library of generators
   */
  lib: {},

  /**
   * Execute method calls the appropriate generator and returns the method or
   * throws and error if the generator does not exist
   * @memberof generators
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   * @returns {Function} The generator function
   */
  execute: function(def, key, value) {
    if (value !== undefined) return value
    if (generators.lib[def.generator]) return generators.lib[def.generator]()
    throw new Error(`Generator '${def.generator}' does not exist`)
  },

  /**
   * Adds a generator to the library
   * @memberof generators
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
