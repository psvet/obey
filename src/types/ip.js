export default context => {
  const ipv4RegEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  if (!ipv4RegEx.test(context.value)) {
    context.fail('Value must be a valid IPv4 address')
  }
}
