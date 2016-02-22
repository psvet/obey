import _ from 'lodash'
import models from '../models'
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
  // If object has keys that need validation, run build recursively
  if (context.schema.keys) {
    return models.makeValidate(context.schema.keys, `${context.key}.`)(context.value)
      .catch(ValidationError, getErrors)
  }
  if (context.schema.values) {
    const promises = {}
    _.forOwn(context.value, (val, key) => {
      promises[key] = models.makeValidate({ [key]: context.schema.values }, `${context.key}.`)({ [key]: val })
        .catch(ValidationError, getErrors)
    })
    return Promise.props(promises)
  }
  return context.value
}
