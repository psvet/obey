const phone = {
  default: context => {
    const defaultPhoneRegEx = /^\(?\d{3}\)?([-. ]?)\d{3}\1\d{4}$/
    if (!defaultPhoneRegEx.test(context.value)) {
      context.fail('Value must be a valid phone number')
    }
  },
  numeric: context => {
    const numericPhoneRegEx = /\d{7,10}/
    if (!numericPhoneRegEx.test(context.value)) {
      context.fail('Value must be a numeric phone number')
    }
  }
}

export default phone
