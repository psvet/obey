const phone = require('src/typeStrategies/phone')

describe('type:phone', () => {
  it('calls context.fail if value is not a valid phone number', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    phone.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid phone number')
  })
  it('calls context.fail if value is empty', () => {
    const context = {
      value: '',
      fail: jest.fn()
    }
    phone.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid phone number')
  })
  it('does not call context fail if value is a valid phone number', () => {
    // Variation
    const contextOne = { value: '(555)-123-4567', fail: jest.fn() }
    phone.default(contextOne)
    expect(contextOne.fail).not.toHaveBeenCalled()
    // Variation
    const contextTwo = { value: '555 123-4567', fail: jest.fn() }
    phone.default(contextTwo)
    expect(contextTwo.fail).not.toHaveBeenCalled()
    // Variation
    const contextThree = { value: '5551234567', fail: jest.fn() }
    phone.default(contextThree)
    expect(contextThree.fail).not.toHaveBeenCalled()
  })
  it('calls context.fail if value is not a valid numeric phone number', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    phone.numeric(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a numeric phone number')
  })
  it('calls context.fail if value is empty (numeric)', () => {
    const context = {
      value: '',
      fail: jest.fn()
    }
    phone.numeric(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a numeric phone number')
  })
  it('does not call context fail if value is a valid phone number', () => {
    const context = {
      value: '5551234567',
      fail: jest.fn()
    }
    phone.numeric(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
})
