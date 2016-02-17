export default (context) => {
  if (typeof context.value !== 'number') {
    context.fail('Value must be a number')
  }
  return context.value
}
