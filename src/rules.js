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
    return { name, fn }
  }
}

export default rules
