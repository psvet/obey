const number = require('src/typeStrategies/number')

describe('type:number', () => {
  it('calls context.fail if type is not a number', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    number.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a number')
  })
  it('call context.fail if type is NaN', () => {
    const context = {
      value: NaN,
      fail: jest.fn()
    }
    number.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a number')
  })
  it('does not call context.fail if type is a number', () => {
    const context = {
      value: 73,
      fail: jest.fn()
    }
    number.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
})
