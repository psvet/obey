/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import model from './model'
import types from './types'
import rules from './rules'
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
  model: obj => model.build(obj),

  /**
   * Creates and stores (or replaces) a type
   * @param {String} name The name of the type
   * @param {String} regex The regex for the type test
   */
  type: (name, regex) => types.add(name, regex),

  /**
   * Creates and stores a rule
   * @param {String} name The rule's name
   * @param {Function} fn The method for the rule
   */
  rule: (name, fn) => rules.add(name, fn),

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
