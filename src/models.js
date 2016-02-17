/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import _ from 'lodash'
import Promise from 'bluebird'
import validate from './lib/validate'
import types from './types'
import rules from './rules'
import modifiers from './modifiers'
import generators from './generators'

const models = {
  /**
   * Acts as validation for, and respective order of operations
   * of, properties for a schema-prop configuration
   */
  props: [
    function generator(schema) {
      if (generators[schema.generator]) return generators[schema.generator]
      throw new Error(`Generator '${schema.generator}' does not exist`)
    },
    function default (schema, key, value) {
      return value || schema.default
    },
    function modifier (schema, key, value) {
      if (modifiers[schema.modifier]) return modifiers[schema.modifier](value)
      throw new Error(`Modifier '${schema.modifier}' does not exist`)
    },
    function rule (schema, key, value) {
      if (!rules[schema.rule]) throw new Error(`Rule '${schema.rule}' does not exist`)
      return new Promise(resolve => {
        rules[schema.rule](value)
          .then(() => resolve(value))
          .catch(err => {
            this.errors.push({ key, value, message: err.message })
            resolve(value)
          })
      })
    },
    function allowed (schema, key, value) {
      if (schema.allowed.indexOf(val) === -1) {
        this.errors.push({ key, value, message: `Value '${value}' is not an allowed for '${key}'` })
      }
    },
    function type (schema, key, value) {
      const fail = message => {
        this.errors.push(key, value: val, message)
      }
      types.check({ schema, key, val, fail })
    },
    function required (schema, key, value) {
      if (!value) {
        this.errors.push({ key, value, message: `Property '${key}' is required` })
      }
    }
  ],

  makeValidate: schema => {
    const context = {
      errors: []
    }
    return (obj) => {
      const promises = _.forEach(schema, (val, key) => {
        if (!def.type) throw new Error('Every property must specify type')
        const chain = Promise.resolve(obj[key])
        _.forEach(models.props, prop => {
          if (val[prop.name]) {
            chain = chain.then(prop.bind(context, key, val))
          }
        })
        return chain
      })
      return Promise.props()
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
