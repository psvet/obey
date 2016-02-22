import _ from 'lodash'
import models from '../models'
import ValidationError from '../lib/error'

export default context => {
  // If object has keys that need validation, run build recursively
  if (context.schema.keys) {
    return models.makeValidate(context.schema.keys, context.key)(context.value)
      .catch(ValidationError, err => {
        err.collection.forEach(error => {
          context.errors.push(error)
        })
      })
  }
  if (!_.isObject(context.value)) {
    context.fail('Value must be an object')
  }
  return context.value
}
