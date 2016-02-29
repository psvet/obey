const email = {
  default: context => {
    const emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (!emailRegEx.test(context.value)) {
      context.fail('Value must be a valid email')
    }
  }
}

export default email
