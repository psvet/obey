/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const generators = {
  /**
   * Library of generators
   */
  lib: {},

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
