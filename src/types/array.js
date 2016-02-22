import models from '../models'
import Promise from 'bluebird'
import ValidationError from '../lib/error'

export default (context) => {
  if (!Array.isArray(context.value)) {
    return context.fail('Value must be an array')
  }
  if (!context.schema.values) return true
  const promises = context.value.map((elem, idx) => {
    const keyName = `${context.key}[${idx}]`
    const validate = models.makeValidate({
      [keyName]: context.schema.values
    })
    return validate({
      [keyName]: elem
    }).catch(ValidationError, err => {
      err.collection.forEach(error => {
        context.errors.push(error)
      })
    })
  })
  return Promise.all(promises)
}
