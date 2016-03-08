import _ from 'lodash'
import rules from '../rules'
import Promise from 'bluebird'
import ValidationError from '../lib/error'

// Removes empty (undefined) props from object
const removeEmpty = obj => _(obj).omitBy(_.isUndefined).value()

const object = {
  default: context => {
    if (!_.isObject(context.value)) {
      return context.fail('Value must be an object')
    }
    const getErrors = err => {
      err.collection.forEach(error => {
        context.errors.push(error)
      })
    }
    const prefix = context.key ? `${context.key}.` : ''
    if (context.def.keys) {
      // Build validation checks
      const promises = {}
      _.forOwn(context.def.keys, (keyDef, key) => {
        promises[key] = rules.validate(keyDef, context.value[key], `${prefix}${key}`)
          .catch(ValidationError, getErrors)
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
      return Promise.props(promises).then(removeEmpty)
    }
    if (context.def.values) {
      const promises = {}
      _.forOwn(context.value, (val, key) => {
        promises[key] = rules.validate(context.def.values, val, `${prefix}${key}`)
          .catch(ValidationError, getErrors)
      })
      return Promise.props(promises).then(removeEmpty)
    }
    return context.value
  }
}

export default object
