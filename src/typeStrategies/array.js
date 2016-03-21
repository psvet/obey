import rules from '../rules'
import Promise from 'bluebird'

const array = {
  default: context => {
    // Ensure array
    if (!Array.isArray(context.value)) {
      return context.fail('Value must be an array')
    }
    // If empty (and empty allowed), move forward
    if (context.def.empty && context.value.length === 0) {
      return context.value
    }
    // If empty (and not empty allowed), fail
    if (!context.def.empty && context.value.length === 0) {
      return context.fail('Value must not be empty array')
    }
    // Specific array sub-validation
    if (!context.def.values) return true
    const promises = context.value.map((elem, idx) => {
      return rules.validate(context.def.values, elem, context.def.opts, `${context.key}[${idx}]`, context.errors, false)
    })
    return Promise.all(promises)
  }
}

export default array
