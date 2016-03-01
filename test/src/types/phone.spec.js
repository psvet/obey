/* global describe, it, expect, sinon */
import phone from 'src/types/phone'

describe('type:phone', () => {
  it('calls context.fail if value is not a valid phone number', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    phone.default(context)
    expect(context.fail).to.be.calledWith('Value must be a valid phone number')
  })
  it('does not call context fail if value is a valid phone number', () => {
    const context = {
      value: '(555)-123-4567',
      fail: sinon.spy()
    }
    phone.default(context)
    expect(context.fail).to.not.be.called
  })
  it('calls context.fail if value is not a valid numeric phone number', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    phone.numeric(context)
    expect(context.fail).to.be.calledWith('Value must be a numeric phone number')
  })
  it('does not call context fail if value is a valid phone number', () => {
    const context = {
      value: '5551234567',
      fail: sinon.spy()
    }
    phone.numeric(context)
    expect(context.fail).to.not.be.called
  })
})
