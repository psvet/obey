import _ from 'lodash'
import rules from '../rules'
import Promise from 'bluebird'
import ValidationError from '../lib/error'

/**
 * Adds the error array from a ValidationError's collection into a parent context's
 * existing collection. This function is curried.
 * @param {Object} context An Obey type context
 * @param {ValidationError} err An error to merge with the context's error stack
 */
const addErrors = _.curry((context, err) => {
  err.collection.forEach(error => {
    context.errors.push(error)
  })
})

/**
 * Validates an object using the definition's `keys` property
 * @param {Object} context An Obey type context
 * @param {string} keyPrefix A prefix to include before the key in an error message
 * @returns {Promise.<Object>} Resolves with the final object
 */
const validateByKeys = (context, keyPrefix) => {
  // Build validation checks
  const missingKeys = []
  const promises = {}
  _.forOwn(context.def.keys, (keyDef, key) => {
    promises[key] = rules.validate(keyDef, context.value[key], `${keyPrefix}${key}`)
      .then(val => {
        if (!context.value.hasOwnProperty(key) && val === undefined) missingKeys.push(key)
        return val
      })
      .catch(ValidationError, addErrors(context))
  })
  // Check undefined keys
  const strictMode = !context.def.hasOwnProperty('strict') || context.def.strict
  _.forOwn(context.value, (val, key) => {
    if (!context.def.keys[key]) {
      if (strictMode) {
        context.fail(`'${key}' is not an allowed property`)
      } else {
        promises[key] = val
      }
    }
  })
  return Promise.props(promises).then(obj => {
    missingKeys.forEach(key => delete obj[key])
    return obj
  })
}

/**
 * Validates an object using the definition's `values` property
 * @param {Object} context An Obey type context
 * @param {string} keyPrefix A prefix to include before the key in an error message
 * @returns {Promise.<Object>} Resolves with the final object
 */
const validateByValues = (context, keyPrefix) => {
  const promises = {}
  _.forOwn(context.value, (val, key) => {
    promises[key] = rules.validate(context.def.values, val, `${keyPrefix}${key}`)
      .catch(ValidationError, addErrors(context))
  })
  return Promise.props(promises)
}

const object = {
  default: context => {
    if (!_.isObject(context.value)) {
      return context.fail('Value must be an object')
    }
    const prefix = context.key ? `${context.key}.` : ''
    if (context.def.keys) return validateByKeys(context, prefix)
    if (context.def.values) return validateByValues(context, prefix)
    return context.value
  }
}

export default object
