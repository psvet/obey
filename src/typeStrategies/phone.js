const phone = {
  _regex: {
    default: /^[\(\)\s\-\+\d]{10,17}$/,
    numeric: /\d{7,10}/
  },
  default: context => {
    const stringified = context.value != null && context.value.toString()
    if (!stringified || !stringified.length || !stringified.match(phone._regex.default)) {
      context.fail('Value must be a valid phone number')
    }
  },
  numeric: context => {
    const stringified = context.value != null && context.value.toString()
    if (!stringified || !stringified.length || !stringified.match(phone._regex.numeric)) {
      context.fail('Value must be a numeric phone number')
    }
  }
}

module.exports = phone
