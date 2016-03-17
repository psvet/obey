const zip = {
  _regex: {
    default: /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/,
    us: /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/,
    ca: /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/
  },
  default: context => {
    if (context.value === null || context.value && !context.value.toString().match(zip._regex.default)) {
      context.fail('Value must be a valid zip code')
    }
  },
  us: context => {
    if (context.value === null || context.value && !context.value.toString().match(zip._regex.us)) {
      context.fail('Value must be a valid US zip code')
    }
  },
  ca: context => {
    if (context.value === null || context.value && !context.value.toString().match(zip._regex.ca)) {
      context.fail('Value must be a valid Canadian zip code')
    }
  }
}

export default zip
