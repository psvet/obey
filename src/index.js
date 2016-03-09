/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import rules from './rules'
import types from './types'
import modifiers from './modifiers'
import generators from './generators'
import validators from './lib/validators'
import ValidationError from './lib/error'

/**
 * This object exposes the top-level public api methods for obey
 * @namespace obey
 */
export default {
  /**
   * API, exposes modules to make lib API accessible
   */
  rules, types, modifiers, generators, validators, ValidationError,

  /**
   * Returns a composed rule from a definition object
   * @memberof obey
   * @param {Object} def The rule definition
   * @returns {Object}
   */
  rule: def => rules.build(def),

  /**
   * Returns a composed model from a definition object
   * @memberof obey
   * @param {Object} obj The definition object
   * @param {Boolean} (strict) Whether or not to enforce strict validation
   * @returns {Object}
   */
  model: (obj, strict = true) => rules.build({ type: 'object', keys: obj, strict }),

  /**
   * Creates and stores (or replaces) a type
   * @memberof obey
   * @param {String} name The name of the type
   * @param {Object|Function} handler The type method or object of methods
   */
  type: (name, handler) => types.add(name, handler),

  /**
   * Creates and stores a modifier
   * @memberof obey
   * @param {String} name The modifier's name
   * @param {Function} fn The method for the modifier
   */
  modifier: (name, fn) => modifiers.add(name, fn),

  /**
   * Creates and stores a generator
   * @memberof obey
   * @param {String} name The generator's name
   * @param {Function} fn The method for the generator
   */
  generator: (name, fn) => generators.add(name, fn)
}
