const string = {
  _regex: {
    alphanumeric: /^[a-zA-Z0-9]*$/
  },
  default: context => {
    if (typeof context.value !== 'string') {
      context.fail('Value must be a string')
    }
  },
  alphanumeric: context => {
    if (!context.value.match(string._regex.alphanumeric)) {
      context.fail('Value must contain only letters and/or numbers')
    }
  }
}

export default string
