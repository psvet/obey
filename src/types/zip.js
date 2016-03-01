const zip = {
  default: context => {
    const defaultZipRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/
    if (!defaultZipRegex.test(context.value)) {
      context.fail('Value must be a valid zip code')
    }
  },
  us: context => {
    const usZipRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/
    if (!usZipRegex.test(context.value)) {
      context.fail('Value must be a valid US zip code')
    }
  },
  ca: context => {
    const caZipRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/
    if (!caZipRegex.test(context.value)) {
      context.fail('Value must be a valid Canadian zip code')
    }
  }
}

export default zip
