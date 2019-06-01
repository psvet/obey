const zip = {
  _regex: {
    default: /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/,
    ca: /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/
  },
  default: context => {
    const stringified = context.value != null && context.value.toString()
    if (!stringified || !stringified.length || !stringified.match(zip._regex.default)) {
      context.fail('Value must be a valid US zip code')
    }
  },
  ca: context => {
    const stringified = context.value != null && context.value.toString()
    if (!stringified || !stringified.length || !stringified.match(zip._regex.ca)) {
      context.fail('Value must be a valid Canadian zip code')
    }
  }
}

module.exports = zip
