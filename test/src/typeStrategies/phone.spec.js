/* global describe, it, expect, sinon */
const phone = require('src/typeStrategies/phone')

describe('type:phone', () => {
  it('calls context.fail if value is not a valid phone number', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    phone.default(context)
    expect(context.fail).to.be.calledWith('Value must be a valid phone number')
  })
  it('calls context.fail if value is empty', () => {
    const context = {
      value: '',
      fail: sinon.spy()
    }
    phone.default(context)
    expect(context.fail).to.be.calledWith('Value must be a valid phone number')
  })
  it('does not call context fail if value is a valid phone number', () => {
    // Variation
    const contextOne = { value: '(555)-123-4567', fail: sinon.spy() }
    phone.default(contextOne)
    expect(contextOne.fail).to.not.be.called
    // Variation
    const contextTwo = { value: '555 123-4567', fail: sinon.spy() }
    phone.default(contextTwo)
    expect(contextTwo.fail).to.not.be.called
    // Variation
    const contextThree = { value: '5551234567', fail: sinon.spy() }
    phone.default(contextThree)
    expect(contextThree.fail).to.not.be.called
  })
  it('calls context.fail if value is not a valid numeric phone number', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    phone.numeric(context)
    expect(context.fail).to.be.calledWith('Value must be a numeric phone number')
  })
  it('calls context.fail if value is empty (numeric)', () => {
    const context = {
      value: '',
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
