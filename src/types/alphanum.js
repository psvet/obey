export default context => {
  const alphanumRegEx = /^[A-Za-z\d]+$/
  if (!alphanumRegEx.test(context.value)) {
    context.fail('Value must contain only letters and/or numbers')
  }
}
