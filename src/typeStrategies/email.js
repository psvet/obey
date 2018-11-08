const email = {
  _regex: {
    default: /.+@.+\.\S+/
  },
  default: context => {
    if (context.value === null || context.value && !context.value.toString().match(email._regex.default)) {
      context.fail('Value must be a valid email')
    }
  }
}

module.exports = email
