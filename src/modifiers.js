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
    return { name, fn }
  }
}

export default modifiers
