export default (context) => {
  if (!Array.isArray(context.value)) {
    context.fail('Value must be an array')
  }
  return context.value
}
