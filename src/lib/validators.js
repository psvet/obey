/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const validators = {
  /**
   * Validator default method, used by model
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  default: function(def, key, value) {
    return value || def.default
  },

  /**
   * Validator allowed method, used by model
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  allow: function(def, key, value) {
    const type = 'allow'
    const sub = def.allow
    if (Array.isArray(def.allow) && def.allow.indexOf(value) === -1) {
      this.errors.push({ type, sub, key, value, message: `Value '${value}' is not allowed` })
    } else if (!Array.isArray(def.allow) && def.allow !== value) {
      this.errors.push({ type, sub, key, value, message: `Value '${value}' is not allowed` })
    }
  },

  /**
   * Validator min method, used by model
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  min: function(def, key, value) {
    const type = 'min'
    const sub = def.min
    if (Array.isArray(value) || typeof value === 'string' && value.length < def.min) {
      this.errors.push({ type, sub, key, value, message: `Length must be greater than ${def.min}` })
    } else if (typeof value === 'number' && value < def.min) {
      this.errors.push({ type, sub, key, value, message: `Value must be greater than ${def.min}` })
    }
  },

  /**
   * Validator max method, used by model
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  max: function(def, key, value) {
    const type = 'max'
    const sub = def.max
    if (Array.isArray(value) || typeof value === 'string' && value.length > def.max) {
      this.errors.push({ type, sub, key, value, message: `Length must be less than ${def.max}` })
    } else if (typeof value === 'number' && value > def.max) {
      this.errors.push({ type, sub, key, value, message: `Value must be less than ${def.max}` })
    }
  }
}

export default validators
