const phone = {
  _regex: {
    default: /^[\(\)\s\-\+\d]{10,17}$/,
    numeric: /\d{7,10}/
  },
  default: context => {
    if (context.value === null || context.value && !context.value.toString().match(phone._regex.default)) {
      context.fail('Value must be a valid phone number')
    }
  },
  numeric: context => {
    if (context.value === null || context.value && !context.value.toString().match(phone._regex.numeric)) {
      context.fail('Value must be a numeric phone number')
    }
  }
}

module.exports = phone
