/* global describe, it, expect, sinon */
const email = require('src/typeStrategies/email')

describe('type:email', () => {
  it('calls context.fail if type is not a valid email', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    email.default(context)
    expect(context.fail).to.be.calledWith('Value must be a valid email')
  })
  it('does not call context.fail if type is a valid email (standard)', () => {
    const context = {
      value: 'jsmith@gmail.com',
      fail: sinon.spy()
    }
    email.default(context)
    expect(context.fail).to.not.be.called
  })
  it('does not call context.fail if type is a valid email (with symbol)', () => {
    const context = {
      value: 'jsmith+symbol@gmail.com',
      fail: sinon.spy()
    }
    email.default(context)
    expect(context.fail).to.not.be.called
  })
  it('does not call context.fail if type is a valid email (unusual; quotes, spaces on left-hand)', () => {
    const context = {
      value: '"this.is unusual"@example.com',
      fail: sinon.spy()
    }
    email.default(context)
    expect(context.fail).to.not.be.called
  })
  it('does not call context.fail if type is a valid email (REALLY friggin unusual)', () => {
    const context = {
      value: '#!$%&\'*+-/=?^_`{}|~@example.org',
      fail: sinon.spy()
    }
    email.default(context)
    expect(context.fail).to.not.be.called
  })
})
