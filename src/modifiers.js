/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const modifiers = {
  /**
   * Library of modifiers
   */
  lib: {},

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
