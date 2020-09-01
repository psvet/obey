const email = require('src/typeStrategies/email')

describe('type:email', () => {
  it('calls context.fail if type is not a valid email', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    email.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid email')
  })
  it('calls context.fail if value is empty', () => {
    const context = {
      value: '',
      fail: jest.fn()
    }
    email.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid email')
  })
  it('does not call context.fail if type is a valid email (standard)', () => {
    const context = {
      value: 'jsmith@gmail.com',
      fail: jest.fn()
    }
    email.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('does not call context.fail if type is a valid email (with symbol)', () => {
    const context = {
      value: 'jsmith+symbol@gmail.com',
      fail: jest.fn()
    }
    email.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('does not call context.fail if type is a valid email (unusual; quotes, spaces on left-hand)', () => {
    const context = {
      value: '"this.is unusual"@example.com',
      fail: jest.fn()
    }
    email.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('does not call context.fail if type is a valid email (REALLY friggin unusual)', () => {
    const context = {
      value: '#!$%&\'*+-/=?^_`{}|~@example.org',
      fail: jest.fn()
    }
    email.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
})
