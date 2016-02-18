/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import models from './models'
import types from './types'
import modifiers from './modifiers'
import generators from './generators'

/**
 * This object exposes the top-level public api methods for obey
 */
const obey = {
  /**
   * Returns a composed model from a definition object
   * @param {Object} obj The definition object
   * @returns {Object}
   */
  model: obj => models.build(obj),

  /**
   * Creates and stores (or replaces) a type
   * @param {String} name The name of the type
   * @param {Function} fn The type evaluation method
   */
  type: (name, fn) => types.add(name, fn),

  /**
   * Creates and stores a modifier
   * @param {String} name The modifier's name
   * @param {Function} fn The method for the modifier
   */
  modifier: (name, fn) => modifiers.add(name, fn),

  /**
   * Creates and stores a generator
   * @param {String} name The generator's name
   * @param {Function} fn The method for the generator
   */
  generator: (name, fn) => generators.add(name, fn)
}

export default obey
