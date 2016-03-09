/*
 * Copyright (c) 2015 TechnologyAdvice
 */
import _ from 'lodash'

/**
 * Types determine and execute the appropriate validation to be performed on an
 * object during validation
 * @namespace types
 */
const types = {
  /**
   * @memberof types
   * @property {Object} Contains type strategies
   */
  strategies: {},

  /**
   * Checks for and applies sub-type to definition
   * @memberof types
   * @param {Object} def The rule defintion
   * @returns {Object}
   */
  checkSubType: def => {
    const fullType = def.type.split(':')
    if (fullType.length === 2) {
      def.type = fullType[0]
      def.sub = fullType[1]
    } else {
      def.sub = 'default'
    }
    return def
  },

  /**
   * Sets up the `fail` method and handles `empty` or `undefined` values. If neither
   * empty or undefined, calls the appropriate `type` and executes validation
   * @memberof types
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   * @returns {*} The value if empty or undefined, check method if value requires type validation
   */
  validate: function(def, key, value) {
    const parsedDef = types.checkSubType(def)
    const fail = message => {
      this.errors.push({ type: def.type, sub: def.sub, key, value, message })
    }
    // Handle `empty` prop for string values
    if (def.empty && typeof value === 'string' && def.type !== 'array' && value.length === 0) {
      return value
    }
    // Don't run if undefined on required
    if (def.required && value === undefined) {
      this.errors.push({ type: 'required', sub: 'default', key, value, message: `Property '${key}' is required` })
      return value
    }
    // Execute check
    return types.check({ def: parsedDef, key, value, fail, errors: this.errors })
  },

  /**
   * Add (or override) a type in the library
   * @memberof types
   * @param {String} name The name of the type
   * @param {Object|Function} handler
   * @param {String} fn The type strategy method
   */
  add: (name, handler) => {
    types.strategies[name] = _.isFunction(handler) ? { default: handler } : handler
  },

  /**
   * Ensures that the strategy exists, loads if not already in memory, then ensures
   * subtype and returns the applied type strategy
   * @memberof types
   * @param {String} type The type to check
   * @param {*} val The value to check
   * @returns {Object} The type execution function promise resolution
   */
  check: context => {
    if (!types.strategies[context.def.type]) {
      try {
        types.strategies[context.def.type] = require(`./types/${context.def.type}`).default
      } catch (e) {
        /* istanbul ignore else */
        if (e.message.indexOf('Cannot find module') >= 0) {
          throw new Error(`Type '${context.def.type}' does not exist`)
        } else {
          throw e
        }
      }
    }
    // Ensure subtype
    if (!types.strategies[context.def.type][context.def.sub]) {
      throw new Error(`Type '${context.def.type}:${context.def.sub}' does not exist`)
    }
    return Promise.resolve(types.strategies[context.def.type][context.def.sub](context))
      .then(res => res === undefined ? context.value : res)
  }
}

export default types
