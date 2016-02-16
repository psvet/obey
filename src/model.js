/*
 * Copyright (c) 2015 TechnologyAdvice
 */

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
   * Iterates over raw model schema object and composes a built
   * model object with validate method
   * @param {Object} obj Raw model object
   * @returns {Object}
   */
  build: obj => {
    // Setup model object
    const composedModel = {
      schema: _.cloneDeep(obj)
    }
    /** const iterate = schema => {
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
    */
    // Return built model
    return composedModel
  }
}

export default model
