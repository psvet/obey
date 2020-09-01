const uuid = {
  _regex: {
    default: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    upper: /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/,
    lower: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  },
  default: context => {
    if (context.value == null || !context.value.length || !context.value.toString().match(uuid._regex.default)) {
      context.fail('Value must be a valid UUID')
    }
  },
  upper: context => {
    if (context.value == null || !context.value.length || !context.value.toString().match(uuid._regex.upper)) {
      context.fail('Value must be a valid UUID with all uppercase letters')
    }
  },
  lower: context => {
    if (context.value == null || !context.value.length || !context.value.toString().match(uuid._regex.lower)) {
      context.fail('Value must be a valid UUID with all lowercase letters')
    }
  }
}

module.exports = uuid
