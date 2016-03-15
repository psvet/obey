const url = {
  _regex: {
    default: /^((http|https|ftp):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  },
  default: context => {
    if (context.value && !context.value.match(url._regex.default)) {
      context.fail('Value must be a valid URL')
    }
  }
}

export default url
