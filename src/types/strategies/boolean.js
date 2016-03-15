const boolean = {
  default: context => {
    if (typeof context.value !== 'boolean') {
      context.fail('Value must be a boolean')
    }
  }
}

export default boolean
