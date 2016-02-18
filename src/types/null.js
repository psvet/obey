export default (context) => {
  if (context.value !== null) {
    context.fail('Value must be null')
  }
}
