const boolean = require('src/typeStrategies/boolean')

describe('type:boolean', () => {
  it('calls context.fail if type is not a boolean', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    boolean.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a boolean')
  })
  it('does not call context.fail if type is a boolean', () => {
    const context = {
      value: true,
      fail: jest.fn()
    }
    boolean.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
})
