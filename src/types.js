/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const types = {
  /**
   * Library of type strategies
   */
  strategies: {},

  /**
   * Validator method, used by model
   * @param {Object} schema The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  validator: function(schema, key, value) {
    const fail = message => {
      this.errors.push(key, value, message)
    }
    types.check({ schema, key, value, fail })
  },

  /**
   * Add (or override) type in the lib
   * @param {String} name The name of the type
   * @param {String} fn The type strategy method
   */
  add: (name, fn) => {
    types.strategies[name] = fn
  },

  /**
   * Process basic type validation
   * @param {String} type The type to check
   * @param {*} val The value to check
   * @returns {Boolean}
   */
  check: context => {
    if (!types.typeStrategies[context.schema.type]) {
      // @TODO: try/catch module not required
      types.strategies[context.schema.type] = require(`./types/${context.schema.type}`).default
    }
    return Promise.resolve(types.strategies[context.schema.type](context))
      .then(() => context.value)
  }
}

export default types
