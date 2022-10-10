/*
 * Copyright (c) 2015 TechnologyAdvice
 */
/* eslint no-console: 0, consistent-return: 0 */
const dot = require('dot-object')
const jexl = require('jexl')
const plugins = require('./plugins')
const cloneDeep = require('lodash/cloneDeep')

const validators = {
  /**
   * Validator default method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   */
  default: function(def, value) {
    if (/^(number|boolean)$/.test(def.type)) {
      if (value === 0 || value === false) return value
    }
    return value || cloneDeep(def.default)
  },

  /**
   * Validator allowed method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   */
  allow: function(def, value, key, errors) {
    const type = 'allow'
    const sub = typeof def.allow === 'object' && !Array.isArray(def.allow) ? Object.keys(def.allow) : def.allow
    const subIsArray = Array.isArray(sub)
    if ((subIsArray && sub.indexOf(value) === -1) || (!subIsArray && sub !== value)) {
      if (value === '' && def.empty) return
      errors.push({ type, sub, key, value, message: `Value '${value}' is not allowed` })
    }
  },

  /**
   * Validator min method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   */
  min: function(def, value, key, errors) {
    const type = 'min'
    const sub = def.min
    if ((Array.isArray(value) || typeof value === 'string') && value.length < def.min) {
      errors.push({ type, sub, key, value, message: `Length must be greater than or equal to ${def.min}` })
    } else if (typeof value === 'number' && value < def.min) {
      errors.push({ type, sub, key, value, message: `Value must be greater than or equal to ${def.min}` })
    }
  },

  /**
   * Validator max method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   */
  max: function(def, value, key, errors) {
    const type = 'max'
    const sub = def.max
    if ((Array.isArray(value) || typeof value === 'string') && value.length > def.max) {
      errors.push({ type, sub, key, value, message: `Length must be less than or equal to ${def.max}` })
    } else if (typeof value === 'number' && value > def.max) {
      errors.push({ type, sub, key, value, message: `Value must be less than or equal to ${def.max}` })
    }
  },

  /**
   * Validator requiredIf method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   * @param {Object} data The full initial data object
   */
  requiredIf: function(def, value, key, errors, data) {
    const type = 'requiredIf'
    const sub = def.requiredIf
    if (typeof sub === 'object') {
      const field = Object.keys(sub)[0]
      const fieldArr = Array.isArray(sub[field]) ? sub[field] : [ sub[field] ]
      fieldArr.some(val => {
        /* istanbul ignore else */
        if (dot.pick(field, data) === val && value === undefined) {
          errors.push({ type, sub, key, value, message: `Value required by existing '${field}' value` })
          return true
        }
      })
    } else if (dot.pick(sub, data) !== undefined && value === undefined) {
      errors.push({ type, sub, key, value, message: `Value required because '${sub}' exists` })
    }
  },
  /**
   * Alias for requiredIf
   */
  requireIf: function(def, value, key, errors, data) {
    console.log('-----\nObey Warning: `requireIf` should be `requiredIf`\n-----')
    def.requiredIf = def.requireIf
    delete def.requireIf
    validators.requiredIf(def, value, key, errors, data)
  },

  /**
   * Validator requiredIfNot method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   * @param {Object} data The full initial data object
   */
  requiredIfNot: function(def, value, key, errors, data) {
    const type = 'requiredIfNot'
    const sub = def.requiredIfNot
    if (typeof sub === 'object') {
      const field = Object.keys(sub)[0]
      const fieldArr = Array.isArray(sub[field]) ? sub[field] : [ sub[field] ]
      fieldArr.some(val => {
        /* istanbul ignore else */
        if (dot.pick(field, data) !== val && value === undefined) {
          errors.push({ type, sub, key, value, message: `Value required because '${field}' value is not one specified` })
          return true
        }
      })
    } else if (dot.pick(sub, data) === undefined && value === undefined) {
      errors.push({ type, sub, key, value, message: `Value required because '${sub}' is undefined`})
    }
  },
  /**
   * Alias for requiredIfNot
   */
  requireIfNot: function(def, value, key, errors, data) {
    console.log('-----\nObey Warning: `requireIfNot` should be `requiredIfNot`\n-----')
    def.requiredIfNot = def.requireIfNot
    delete def.requireIfNot
    validators.requiredIfNot(def, value, key, errors, data)
  },

  /**
   * Validator equalTo method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   * @param {Object} data The full initial data object
   */
  equalTo: function(def, value, key, errors, data) {
    const type = 'equalTo'
    const sub = def.equalTo
    if (dot.pick(sub, data) !== value) {
      errors.push({ type, sub, key, value, message: `Value must match ${sub} value`})
    }
  },

  /**
   * Validator jexl method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   * @param {Object} data The full initial data object
   */
  jexl: (def, value, key, errors, data) => {
    const type = 'jexl'
    const sub = Array.isArray(def.jexl) ? def.jexl : [ def.jexl ]
    const promises = sub.map((obj) => {
      const {
        expr,
        message = 'Value failed Jexl evaluation'
      } = obj
      const instance = plugins.lib.jexl || jexl
      return instance.eval(expr, { root: data, value })
        .then(val => {
          if (!val) errors.push({ type, sub: obj, key, value, message })
        })
        .catch(() => {
          errors.push({ type, sub: obj, key, value, message })
        })
    })
    Promise.all(promises)
  }
}

module.exports = validators
