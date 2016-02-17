export default context => {
  if (context.schema.min && context.value.length < context.schema.min) {
    context.fail(`Value is less than ${context.schema.min}`)
  }
  if (context.schema.max && context.value.length > context.schema.max) {
    context.fail(`Value is greater than ${context.schema.max}`)
  }
  if (typeof context.value !== 'string') {
    context.fail('Value must be a string')
  }
  return context.value
}
