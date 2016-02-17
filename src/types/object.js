import _ from 'lodash'
import models from '../models'

export default context => {
  // If object has keys that need validation, run build recursively
  if (context.schema.keys) return models.build(context.schema.keys).validate()
  if (!_.isObject(context.value)) {
    context.fail('Not an object')
  }
  return context.value
}
