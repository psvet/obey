/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const rules = {
  /**
   * Library of rules
   */
  lib: {},

  /**
   * Adds a rule
   * @param {String} name The name of the rule
   * @param {Function} fn The rule's method
   */
  add: (name, fn) => {
    if (typeof name !== 'string') throw new Error('Rule name should be a string')
    if (typeof fn !== 'function') throw new Error('Rule method should be a function')
    rules.lib[name] = fn
  }
}

export default rules
