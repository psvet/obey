/*
 * Copyright (c) 2015 TechnologyAdvice
 */

/**
 * Modifiers allow for coercion/modification of a value present in the object
 * when validation occurs
 * @namespace modifiers
 */
const modifiers = {
  /**
   * @memberof modifiers
   * @property {Object} Library of modifiers
   */
  lib: {},

  /**
   * Execute method calls the appropriate modifier and passes in the value or
   * throws an error if the modifier does not exist
   * @memberof modifiers
   * @param {Object} def The property configuration
   * @param {string} key The key name of the property
   * @param {*} value The value being validated
   * @returns {function} The modifier function
   */
  execute: function(def, key, value) {
    if (modifiers.lib[def.modifier]) return modifiers.lib[def.modifier](value)
    throw new Error(`Modifier '${def.modifier}' does not exist`)
  },

  /**
   * Adds new modifier to the library
   * @memberof modifiers
   * @param {string} name The name of the modifier
   * @param {function} fn The modifier's method
   */
  add: (name, fn) => {
    if (typeof name !== 'string') throw new Error('Modifier name should be a string')
    if (typeof fn !== 'function') throw new Error('Modifier method should be a function')
    modifiers.lib[name] = fn
  }
}

export default modifiers
