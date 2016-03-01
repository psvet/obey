const string = {
  default: context => {
    if (typeof context.value !== 'string') {
      context.fail('Value must be a string')
    }
  },
  alphanumeric: context => {
    const alphaNumRegEx = /^[a-zA-Z0-9]*$/
    if (!alphaNumRegEx.test(context.value)) {
      context.fail('Value must contain only letters and/or numbers')
    }
  }
}

export default string
