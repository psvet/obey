export default (context) => {
  if (typeof context.value !== 'undefined') {
    context.fail('Value must be undefined')
  }
  return context.value
}
