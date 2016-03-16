/* global describe, it, expect, sinon */
import email from 'src/typeStrategies/email'

describe('type:email', () => {
  it('calls context.fail if type is not a valid email', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    email.default(context)
    expect(context.fail).to.be.calledWith('Value must be a valid email')
  })
  it('does not call context.fail if type is a valid email', () => {
    const context = {
      value: 'jsmith@gmail.com',
      fail: sinon.spy()
    }
    email.default(context)
    expect(context.fail).to.not.be.called
  })
})
