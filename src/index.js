/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import rules from './rules'
import types from './types'
import modifiers from './modifiers'
import creators from './creators'
import validators from './lib/validators'
import ValidationError from './lib/error'

/**
 * The main object for Obey; exposes the core API methods for standard use as
 * well as the API for all other modules
 * @namespace obey
 */
export default {
  /**
   * API, exposes modules to make lib API accessible
   */
  rules, types, modifiers, creators, validators, ValidationError,

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
   * @param {boolean} [strict=true] Whether or not to enforce strict validation
   * @returns {Object}
   */
  model: (obj, strict = true) => rules.build({ type: 'object', keys: obj, strict }),

  /**
   * Creates and stores (or replaces) a type
   * @memberof obey
   * @param {string} name The name of the type
   * @param {Object|function} handler The type method or object of methods
   */
  type: (name, handler) => types.add(name, handler),

  /**
   * Creates and stores a modifier
   * @memberof obey
   * @param {string} name The modifier's name
   * @param {function} fn The method for the modifier
   */
  modifier: (name, fn) => modifiers.add(name, fn),

  /**
   * Creates and stores a creator
   * @memberof obey
   * @param {string} name The creator's name
   * @param {function} fn The method for the creator
   */
  creator: (name, fn) => creators.add(name, fn)
}
