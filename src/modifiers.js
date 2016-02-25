/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const modifiers = {
  /**
   * Library of modifiers
   */
  lib: {},

  /**
   * Validator method, used by model
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  validator: function(def, key, value) {
    if (modifiers.lib[def.modifier]) return modifiers.lib[def.modifier](value)
    throw new Error(`Modifier '${def.modifier}' does not exist`)
  },

  /**
   * Adds new modifier
   * @param {String} name The name of the modifier
   * @param {Function} fn The modifier's method
   */
  add: (name, fn) => {
    if (typeof name !== 'string') throw new Error('Modifier name should be a string')
    if (typeof fn !== 'function') throw new Error('Modifier method should be a function')
    modifiers.lib[name] = fn
  }
}

export default modifiers
