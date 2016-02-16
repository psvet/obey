/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import _ from 'lodash'
import validate from './lib/validate'

const model = {
  /**
   * Parses a property from the model and returns the original
   * object with `validate` method
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
    const schema = _.cloneDeep(obj)
    const iterate = schemaObj => {
      for (let key in schemaObj) {
        if (typeof schemaObj[key] === 'object') {
          // Has sub-object, recurse
          iterate(schemaObj[key])
        } else {
          // Parse the schema definition
          schema[key] = model.parseProperty(schemaObj[key])
        }
      }
    }
    // Begin iteration
    iterate(schema)
    // Return built model
    return {
      schema,
      validate: validate(schema)
    }
  }
}

export default model
