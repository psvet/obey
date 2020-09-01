const url = require('src/typeStrategies/url')

describe('type:url', () => {
  it('calls context.fail if type is not a valid URL', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    url.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid URL')
  })
  it('calls context.fail if type is empty', () => {
    const context = {
      value: '',
      fail: jest.fn()
    }
    url.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid URL')
  })
  it('does not call context.fail if type is a valid URL', () => {
    const context = {
      value: 'https://www.google.com/test',
      fail: jest.fn()
    }
    url.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('passes urls with number and hypens', () => {
    const context = {
      value: 'this-is.1weird.domain.com',
      fail: jest.fn()
    }
    url.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
})
