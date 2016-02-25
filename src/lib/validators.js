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
    if (Array.isArray(def.allow) && def.allow.indexOf(value) === -1) {
      this.errors.push({ key, value, message: `Value '${value}' is not allowed` })
    } else if (!Array.isArray(def.allow) && def.allow !== value) {
      this.errors.push({ key, value, message: `Value '${value}' is not allowed` })
    }
  },

  /**
   * Validator min method, used by model
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  min: function(def, key, value) {
    if (Array.isArray(value) || typeof value === 'string' && value.length < def.min) {
      this.errors.push({ key, value, message: `Length must be greater than ${def.min}` })
    } else if (typeof value === 'number' && value < def.min) {
      this.errors.push({ key, value, message: `Value must be greater than ${def.min}` })
    }
  },

  /**
   * Validator max method, used by model
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  max: function(def, key, value) {
    if (Array.isArray(value) || typeof value === 'string' && value.length > def.max) {
      this.errors.push({ key, value, message: `Length must be less than ${def.max}` })
    } else if (typeof value === 'number' && value > def.max) {
      this.errors.push({ key, value, message: `Value must be less than ${def.max}` })
    }
  },

  /**
   * Validator requires method, used by model
   * @param {Object} def The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  required: function(def, key, value) {
    if (def.required && !value) {
      this.errors.push({ key, value, message: `Property '${key}' is required` })
    }
  }
}

export default validators
