import _ from 'lodash'
import rules from '../rules'
import Promise from 'bluebird'
import ValidationError from '../lib/error'

export default context => {
  if (!_.isObject(context.value)) {
    return context.fail('Value must be an object')
  }
  const getErrors = err => {
    err.collection.forEach(error => {
      context.errors.push(error)
    })
  }
  const prefix = context.key ? `${context.key}.` : ''
  // If object has keys that need validation, run build recursively
  if (context.def.keys) {
    const promises = {}
    _.forOwn(context.def.keys, (keyDef, key) => {
      promises[key] = rules.validate(keyDef, context.value[key], `${prefix}${key}`)
        .catch(ValidationError, getErrors)
    })
    return Promise.props(promises)
  }
  if (context.def.values) {
    const promises = {}
    _.forOwn(context.value, (val, key) => {
      promises[key] = rules.validate(context.def.values, val, `${prefix}${key}`)
        .catch(ValidationError, getErrors)
    })
    return Promise.props(promises)
  }
  return context.value
}
