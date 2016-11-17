/*
 * Copyright (c) 2015 TechnologyAdvice
 */
import dot from 'dot-object'

const validators = {
  /**
   * Validator default method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   */
  default: function(def, value) {
    return value || def.default
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
    if (subIsArray && sub.indexOf(value) === -1) {
      errors.push({ type, sub, key, value, message: `Value '${value}' is not allowed` })
    } else if (!subIsArray && sub !== value) {
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
    if (Array.isArray(value) || typeof value === 'string' && value.length < def.min) {
      errors.push({ type, sub, key, value, message: `Length must be greater than ${def.min}` })
    } else if (typeof value === 'number' && value < def.min) {
      errors.push({ type, sub, key, value, message: `Value must be greater than ${def.min}` })
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
    if (Array.isArray(value) || typeof value === 'string' && value.length > def.max) {
      errors.push({ type, sub, key, value, message: `Length must be less than ${def.max}` })
    } else if (typeof value === 'number' && value > def.max) {
      errors.push({ type, sub, key, value, message: `Value must be less than ${def.max}` })
    }
  },

  /**
   * Validator requireIf method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   * @param {Object} data The full initial data object
   */
  requireIf: function(def, value, key, errors, data) {
    const type = 'requireIf'
    const sub = def.requireIf
    if (dot.pick(sub, data) !== undefined && value === undefined) {
      errors.push({ type, sub, key, value, message: `Value required because '${sub}' exists`})
    }
  },

  /**
   * Validator requireIfNot method, used by model
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @param {string} key The key name of the property
   * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} errors An error array
   * to which any additional error objects will be added
   * @param {Object} data The full initial data object
   */
  requireIfNot: function(def, value, key, errors, data) {
    const type = 'requireIfNot'
    const sub = def.requireIfNot
    if (dot.pick(sub, data) === undefined && value === undefined) {
      errors.push({ type, sub, key, value, message: `Value required because '${sub}' is undefined`})
    }
  }
}

export default validators
