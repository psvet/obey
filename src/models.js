/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import _ from 'lodash'
import rules from './rules'

const models = {
  /**
   * Builds validation methods against properties
   * @param {Object} schema The model configuration schema
   * @param {String} (prefix) The parent key name on nested objects
   * @returns {Function}
   */
  /* makeValidate: (schema, prefix = '') => {
    /*return (obj) => {
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

  }, */

  /**
   * Returns model object with schema obj and validate method
   * @param {Object} obj Raw model object
   * @returns {Object}
   */
  build: obj => {
    // Sanity check
    if (!_.isObject(obj)) throw new Error('Model must be an object')
    // Setup model object
    const object = _.cloneDeep(obj)
    // Return built model
    return {
      object,
      validate: data => rules.add({ type: 'object', keys: object }).validate(data)
    }
  }
}

export default models
