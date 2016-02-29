const ip = {
  v4: context => {
    const ipv4RegEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    if (!ipv4RegEx.test(context.value)) {
      context.fail('Value must be a valid IPv4 address')
    }
  },
  v6: context => {
    const ipv6RegEx = /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/
    if (!ipv6RegEx.test(context.value)) {
      context.fail('Value must be a valid IPv6 address')
    }
  },
  default: context => ip.v4(context)
}

export default ip
