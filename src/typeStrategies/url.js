const url = {
  _regex: {
    default: /^((http|https|ftp):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  },
  default: context => {
    if (context.value === null || context.value && !context.value.toString().match(url._regex.default)) {
      context.fail('Value must be a valid URL')
    }
  }
}

export default url
