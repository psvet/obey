const number = {
  default: context => {
    if (typeof context.value !== 'number' || Number.isNaN(context.value)) {
      context.fail('Value must be a number')
    }
  }
}

module.exports = number
