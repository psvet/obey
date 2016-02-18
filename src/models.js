/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import _ from 'lodash'
import Promise from 'bluebird'
import types from './types'
import modifiers from './modifiers'
import generators from './generators'
import validators from './lib/validators'

const models = {
  /**
   * Acts as validation for, and respective order of operations
   * of, properties for a schema-prop configuration
   */
  props: [
    { name: 'generator', fn: generators.validator },
    { name: 'default', fn: validators.default },
    { name: 'modifier', fn: modifiers.validator },
    { name: 'allowed', fn: validators.allowed },
    { name: 'min', fn: validators.min },
    { name: 'max', fn: validators.max },
    { name: 'type', fn: types.validator },
    { name: 'required', fn: validators.required }
  ],

  makeValidate: schema => {
    const context = {
      errors: []
    }
    return (obj) => {
      const validObj = {}
      _.forEach(schema, (val, key) => {
        if (!val.type) throw new Error('Every property must specify type')
        let chain = Promise.resolve(obj[key])
        _.forEach(models.props, prop => {
          if (val[prop.name]) {
            chain = chain.then(prop.fn.bind(context, schema, key)).then(res => {
              if (res === undefined) return val
              return res
            })
          }
        })
        validObj[key] = chain
      })
      return Promise.props(validObj)
    }
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

    // Return built model
    return {
      schema,
      validate: models.makeValidate(schema)
    }
  }
}

export default models
