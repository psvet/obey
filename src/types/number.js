export default (context) => {
  if (context.schema.min && context.value < context.schema.min) {
    context.fail(`Value is less than ${context.schema.min}`)
  }
  if (context.schema.max && context.value > context.schema.max) {
    context.fail(`Value is greater than ${context.schema.max}`)
  }
  return context.value
}
