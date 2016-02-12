/**
 * This model exposes the public api methods for obey
 */
const obey = {
  /**
   * Creates a model from a definition object
   * @param {Object} obj The definition object
   * @returns {Object}
   */
  model: obj => {
    return obj
  },

  /**
   * Creates and stores a rule
   * @param {String} name The rule's name
   * @param {Function} fn The method for the rule
   */
  rule: (name, fn) => {
    return { name, fn }
  },

  /**
   * Creates and stores a modifier
   * @param {String} name The modifier's name
   * @param {Function} fn The method for the modifier
   */
  modifier: (name, fn) => {
    return { name, fn }
  },

  /**
   * Creates and stores a generator
   * @param {String} name The generator's name
   * @param {Function} fn The method for the generator
   */
  generator: (name, fn) => {
    return { name, fn }
  }
}

export default obey
