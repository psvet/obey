const url = {
  default: context => {
    const urlRegEx = /^((http|https|ftp):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    if (!urlRegEx.test(context.value)) {
      context.fail('Value must be a valid URL')
    }
  }
}

export default url
