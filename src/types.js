/*
 * Copyright (c) 2015 TechnologyAdvice
 */
import _ from 'lodash'

const types = {
  /**
   * Library of type strategies
   */
  strategies: {},

  /**
   * Checks for and applies sub-type to definition
   * @param {Object} def The rule defintion
   * @returns {Object}
   */
  checkSubType: def => {
    if (def.type.indexOf(':') >= 0) {
      const fullType = def.type.split(':')
      def.type = fullType[0]
      def.sub = fullType[1]
    } else {
      def.sub = 'default'
    }
    return def
  },

  /**
   * Validator method, used by model
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  validator: function(def, key, value) {
    const fail = message => {
      this.errors.push({ key, value, message })
    }
    // Execute check
    return types.check({ def: types.checkSubType(def), key, value, fail, errors: this.errors })
  },

  /**
   * Add (or override) type in the lib
   * @param {String} name The name of the type
   * @param {Object|Function} handler
   * @param {String} fn The type strategy method
   */
  add: (name, handler) => {
    types.strategies[name] = _.isFunction(handler) ? { default: handler } : handler
  },

  /**
   * Process basic type validation
   * @param {String} type The type to check
   * @param {*} val The value to check
   * @returns {Boolean}
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
    } else {
      return Promise.resolve(types.strategies[context.def.type][context.def.sub](context))
        .then(res => res === undefined ? context.value : res)
    }
  }
}

export default types
