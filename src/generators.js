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
    return { name, fn }
  }
}

export default generators
