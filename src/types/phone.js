const phone = {
  default: context => {
    const defaultPhoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (!defaultPhoneRegEx.test(context.value)) {
      context.fail('Value must be a valid phone number')
    }
  },
  international: context => {
    const intlPhoneRegEx = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
    if (!intlPhoneRegEx.test(context.value)) {
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
