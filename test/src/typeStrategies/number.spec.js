/* global describe, it, expect, sinon */
const number = require('src/typeStrategies/number')

describe('type:number', () => {
  it('calls context.fail if type is not a number', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    number.default(context)
    expect(context.fail).to.be.calledWith('Value must be a number')
  })
  it('call context.fail if type is NaN', () => {
    const context = {
      value: NaN,
      fail: sinon.spy()
    }
    number.default(context)
    expect(context.fail).to.be.calledWith('Value must be a number')
  })
  it('does not call context.fail if type is a number', () => {
    const context = {
      value: 73,
      fail: sinon.spy()
    }
    number.default(context)
    expect(context.fail).to.not.be.called
  })
})
