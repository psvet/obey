export default context => {
  const uuidRegEx = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/
  if (!uuidRegEx.test(context.value)) {
    context.fail('Value must be a valid UUID')
  }
}
