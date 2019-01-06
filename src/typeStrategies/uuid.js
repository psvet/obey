const uuid = {
  _regex: {
    default: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  default: context => {
    if (context.value === null || context.value && !context.value.toString().match(uuid._regex.default)) {
      context.fail('Value must be a valid UUID')
    }
  }
}

module.exports = uuid
