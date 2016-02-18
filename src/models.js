/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import _ from 'lodash'
import Promise from 'bluebird'
import validate from './lib/validate'
import types from './types'
import modifiers from './modifiers'
import generators from './generators'

const models = {
  /**
   * Acts as validation for, and respective order of operations
   * of, properties for a schema-prop configuration
   */
  props: [{
    name: 'generator',
    fn: function(schema) {
      if (generators[schema.generator]) return generators[schema.generator]
      throw new Error(`Generator '${schema.generator}' does not exist`)
    }
  }, {
    name: 'default',
    fn: function(schema, key, value) {
      return value || schema.default
    }
  }, {
    name: 'modifier',
    fn: function(schema, key, value) {
      if (modifiers[schema.modifier]) return modifiers[schema.modifier](value)
      throw new Error(`Modifier '${schema.modifier}' does not exist`)
    }
  }, {
    name: 'allowed',
    fn: function(schema, key, value) {
      if (schema.allowed.indexOf(value) === -1) {
        this.errors.push({ key, value, message: `Value '${value}' is not an allowed for '${key}'` })
      }
    }
  }, {
    name: 'min',
    fn: function(schema, key, value) {
      if (typeof value === 'array' || typeof value === 'string' && value.length < schema.min) {
        this.errors.push({ key, value, message: `Value is less than ${schema.min}` })
      } else if (typeof value === 'number' && value < schema.min) {
        this.errors.push({ key, value, message: `Value is less than ${schema.min}` })
      }
      return value
    }
  }, {
    name: 'max',
    fn: function(schema, key, value) {
      if (typeof value === 'array' || typeof value === 'string' && value.length > schema.max) {
        this.errors.push({ key, value, message: `Value is greater than ${schema.max}` })
      } else if (typeof value === 'number' && value > schema.max) {
        this.errors.push({ key, value, message: `Value is greater than ${schema.max}` })
      }
      return value
    }
  }, {
    name: 'type',
    fn: function(schema, key, value) {
      const fail = message => {
        this.errors.push(key, value, message)
      }
      types.check({ schema, key, value, fail })
    }
  }, {
    name: 'required',
    fn: function(schema, key, value) {
      if (!value) {
        this.errors.push({ key, value, message: `Property '${key}' is required` })
      }
    }
  }],

  makeValidate: schema => {
    const context = {
      errors: []
    }
    return (obj) => {
      const promises = _.forEach(schema, (val, key) => {
        if (!val.type) throw new Error('Every property must specify type')
        const chain = Promise.resolve(obj[key])
        _.forEach(models.props, prop => {
          if (val[prop.name]) {
            chain = chain.then(prop.fn.bind(context, key, val))
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
