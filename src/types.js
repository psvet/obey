/*
 * Copyright (c) 2015 TechnologyAdvice
 */
import _ from 'lodash'
import strategies from './types/index'

/**
 * Types determine and execute the appropriate validation to be performed on the
 * data during validation
 * @namespace types
 */
const types = {
  /**
   * @memberof types
   * @property {Object} Contains type strategies
   */
  strategies,

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
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   * @returns {*|Promise.<*>} The value if empty or undefined, check method if value requires type validation
   */
  validate: function(def, value, key, errors) {
    const parsedDef = types.checkSubType(def)
    const fail = message => {
      errors.push({ type: def.type, sub: def.sub, key, value, message })
    }
    // Handle `empty` prop for string values
    if (def.empty && typeof value === 'string' && def.type !== 'array' && value.length === 0) {
      return value
    }
    // Don't run if undefined on required
    if (def.required && value === undefined) {
      errors.push({ type: 'required', sub: 'default', key, value, message: `Property '${key}' is required` })
      return value
    }
    // Execute check
    return types.check({ def: parsedDef, key, value, fail, errors })
  },

  /**
   * Add (or override) a type in the library
   * @memberof types
   * @param {string} name The name of the type
   * @param {Object|function} handler The type strategy method
   */
  add: (name, handler) => {
    types.strategies[name] = _.isFunction(handler) ? { default: handler } : handler
  },

  /**
   * Ensures that the strategy exists, loads if not already in memory, then ensures
   * subtype and returns the applied type strategy
   * @memberof types
   * @param {{def: Object, key: string, value: *, fail: function, errors: Array<{Object}>}} context A type context
   * @returns {Promise.<*>} Resolves with the provided data, possibly modified by the type strategy
   */
  check: context => {
    if (!types.strategies[context.def.type]) {
      if (context.def.type.match(/[\/\\]/)) {
        throw new Error(`Illegal type name: ${context.def.type}`)
      }
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
