import _ from 'lodash'

const model = {
  /**
   * Parses a property from the model and returns the original
   * object with `_validate` method
   * @param {Object} def The configuration definition to parse
   * @returns {Object}
   */
  parseProperty: def => {
    _.forOwn(def, (key, val) => {
      return { key, val }
    })
  },

  /**
   * Iterates over raw model object and composes _validate
   * method for each property which is called when model is
   * validated
   * @param {Object} obj Raw model object
   * @returns {Object}
   */
  build: obj => {
    const iterate = schema => {
      for (let key in schema) {
        if (typeof schema[key] === 'object') {
          // Has sub-object, recurse
          iterate(schema[key])
        } else {
          // Parse the schema definition
          schema[key] = model.parseProperty(schema[key])
        }
      }
    }
    // Begin iteration
    iterate(obj)
    // Return built model
    return obj
  }
}

export default model
