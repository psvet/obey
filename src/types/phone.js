const phone = {
  _regex: {
    default: /^\(?\d{3}\)?([-. ]?)\d{3}\1\d{4}$/,
    numeric: /\d{7,10}/
  },
  default: context => {
    if (!context.value.match(phone._regex.default)) {
      context.fail('Value must be a valid phone number')
    }
  },
  numeric: context => {
    if (!context.value.match(phone._regex.numeric)) {
      context.fail('Value must be a numeric phone number')
    }
  }
}

export default phone
