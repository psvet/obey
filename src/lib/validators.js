/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const validators = {
  default: function(schema, key, value) {
    return value || schema.default
  },

  allowed: function(schema, key, value) {
    if (schema.allowed.indexOf(value) === -1) {
      this.errors.push({ key, value, message: `Value '${value}' is not an allowed for '${key}'` })
    }
  },

  min: function(schema, key, value) {
    if (Array.isArray(value) || typeof value === 'string' && value.length < schema.min) {
      this.errors.push({ key, value, message: `Value is less than ${schema.min}` })
    } else if (typeof value === 'number' && value < schema.min) {
      this.errors.push({ key, value, message: `Value is less than ${schema.min}` })
    }
    return value
  },

  max: function(schema, key, value) {
    if (typeof value === 'array' || typeof value === 'string' && value.length > schema.max) {
      this.errors.push({ key, value, message: `Value is greater than ${schema.max}` })
    } else if (typeof value === 'number' && value > schema.max) {
      this.errors.push({ key, value, message: `Value is greater than ${schema.max}` })
    }
    return value
  },

  required: function(schema, key, value) {
    if (!value) {
      this.errors.push({ key, value, message: `Property '${key}' is required` })
    }
  }
}

export default validators
