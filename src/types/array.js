import rules from '../rules'
import Promise from 'bluebird'
import ValidationError from '../lib/error'

const array = {
  default: context => {
    if (!Array.isArray(context.value)) {
      return context.fail('Value must be an array')
    }
    if (!context.def.values) return true
    const promises = context.value.map((elem, idx) => {
      return rules.validate(context.def.values, elem, `${context.key}[${idx}]`)
        .catch(ValidationError, err => {
          err.collection.forEach(error => {
            context.errors.push(error)
          })
        })
    })
    return Promise.all(promises)
  }
}

export default array
