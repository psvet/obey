const ip = {
  _regex: {
    v4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    v6: /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/
  },
  v4: context => {
    if (context.value === null || context.value && !context.value.toString().match(ip._regex.v4)) {
      context.fail('Value must be a valid IPv4 address')
    }
  },
  v6: context => {
    if (context.value === null || context.value && !context.value.toString().match(ip._regex.v6)) {
      context.fail('Value must be a valid IPv6 address')
    }
  },
  default: context => ip.v4(context)
}

module.exports = ip
