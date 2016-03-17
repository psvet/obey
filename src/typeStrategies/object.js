import _ from 'lodash'
import rules from '../rules'
import Promise from 'bluebird'

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
    promises[key] = rules.validate(keyDef, context.value[key], `${keyPrefix}${key}`, context.errors, false)
      .then(val => {
        if (!context.value.hasOwnProperty(key) && val === undefined) missingKeys.push(key)
        return val
      })
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
    promises[key] = rules.validate(context.def.values, val, `${keyPrefix}${key}`, context.errors, false)
  })
  return Promise.props(promises)
}

const object = {
  default: context => {
    if (!_.isObject(context.value) || context.value === null) {
      return context.fail('Value must be an object')
    }
    const prefix = context.key ? `${context.key}.` : ''
    if (context.def.keys) return validateByKeys(context, prefix)
    if (context.def.values) return validateByValues(context, prefix)
    return context.value
  }
}

export default object
