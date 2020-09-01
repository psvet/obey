const string = require('src/typeStrategies/string')

describe('type:string', () => {
  it('calls context.fail if type is not a string', () => {
    const context = {
      value: true,
      fail: jest.fn()
    }
    string.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a string')
  })
  it('does not call context.fail if type is a string', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    string.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('calls context.fail if type is not an alphanumberic string', () => {
    const context = {
      value: 'abc$#',
      fail: jest.fn()
    }
    string.alphanumeric(context)
    expect(context.fail).toHaveBeenCalledWith('Value must contain only letters and/or numbers')
  })
  it('does not call context.fail if type is an alphanumeric string', () => {
    const context = {
      value: 'abc123',
      fail: jest.fn()
    }
    string.alphanumeric(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
})
