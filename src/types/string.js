const string = {
  default: context => {
    if (typeof context.value !== 'string') {
      context.fail('Value must be a string')
    }
  }
}

export default string
