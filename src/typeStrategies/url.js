const url = {
  _regex: {
    default: /^(?:https?:\/\/)?[^\s\/\.]+(?:\.[a-z0-9]{2,})+(?:\/\S*)?$/i
  },
  default: context => {
    if (context.value === null || context.value && !context.value.toString().match(url._regex.default)) {
      context.fail('Value must be a valid URL')
    }
  }
}

export default url
