/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import _ from 'lodash'
import Promise from 'bluebird'
import types from './types'
import modifiers from './modifiers'
import generators from './generators'
import validators from './lib/validators'
import ValidationError from './lib/error'

const models = {
  /**
   * Acts as validation setup for, and respective order of operations
   * of, properties for a schema-prop configuration
   */
  props: [
    { name: 'generator', fn: generators.validator },
    { name: 'default', fn: validators.default },
    { name: 'modifier', fn: modifiers.validator },
    { name: 'allow', fn: validators.allow },
    { name: 'min', fn: validators.min },
    { name: 'max', fn: validators.max },
    { name: 'type', fn: types.validator },
    { name: 'required', fn: validators.required }
  ],

  /**
   * Builds validation methods against properties
   * @param {Object} schema The model configuration schema
   * @param {String} (prefix) The parent key name on nested objects
   * @returns {Function}
   */
  makeValidate: (schema, prefix = '') => {
    return (obj) => {
      const context = { errors: [] }
      const validObj = {}
      _.forOwn(schema, (cfg, key) => {
        if (!cfg.type) throw new Error('Model properties must define a \'type\'')
        let keyName = `${prefix}${key}`
        let chain = Promise.resolve(obj[key])
        _.forEach(models.props, prop => {
          if (cfg[prop.name]) {
            chain = chain.then(prop.fn.bind(context, cfg, keyName)).then(res => {
              return res === undefined ? obj[key] : res
            })
          }
        })
        validObj[key] = chain
      })
      return Promise.props(validObj)
        .then(res => {
          if (context.errors.length > 0) throw new ValidationError(context.errors)
          return res
        })
    }
  },

  /**
   * Returns model object with schema obj and validate method
   * @param {Object} obj Raw model object
   * @returns {Object}
   */
  build: obj => {
    // Setup model object
    const schema = _.cloneDeep(obj)
    // Return built model
    return {
      schema,
      validate: models.makeValidate(schema)
    }
  }
}

export default models
