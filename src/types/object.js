import _ from 'lodash'
import models from '../models'

export default context => {
  // If object has keys that need validation, run build recursively
  if (context.schema.keys) return models.build(context.schema.keys)
  if (!_.isObject(context.value)) {
    context.fail('Value must be an object')
  }
  return context.value
}
