/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const validators = {
  /**
   * Validator default method, used by model
   * @param {Object} schema The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  default: function(schema, key, value) {
    return value || schema.default
  },

  /**
   * Validator allowed method, used by model
   * @param {Object} schema The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  allowed: function(schema, key, value) {
    if (schema.allowed.indexOf(value) === -1) {
      this.errors.push({ key, value, message: `Value '${value}' is not allowed` })
    }
  },

  /**
   * Validator min method, used by model
   * @param {Object} schema The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  min: function(schema, key, value) {
    if (Array.isArray(value) || typeof value === 'string' && value.length < schema.min) {
      this.errors.push({ key, value, message: `Length must be greater than ${schema.min}` })
    } else if (typeof value === 'number' && value < schema.min) {
      this.errors.push({ key, value, message: `Value must be greater than ${schema.min}` })
    }
  },

  /**
   * Validator max method, used by model
   * @param {Object} schema The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  max: function(schema, key, value) {
    if (Array.isArray(value) || typeof value === 'string' && value.length > schema.max) {
      this.errors.push({ key, value, message: `Length must be less than ${schema.max}` })
    } else if (typeof value === 'number' && value > schema.max) {
      this.errors.push({ key, value, message: `Value must be less than ${schema.max}` })
    }
  },

  /**
   * Validator requires method, used by model
   * @param {Object} schema The property configuration
   * @param {String} key The key name of the property
   * @param {*} value The value being validated
   */
  required: function(schema, key, value) {
    if (schema.required && !value) {
      this.errors.push({ key, value, message: `Property '${key}' is required` })
    }
  }
}

export default validators
