/* global describe, it, expect, sinon */
const boolean = require('src/typeStrategies/boolean')

describe('type:boolean', () => {
  it('calls context.fail if type is not a boolean', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    boolean.default(context)
    expect(context.fail).to.be.calledWith('Value must be a boolean')
  })
  it('does not call context.fail if type is a boolean', () => {
    const context = {
      value: true,
      fail: sinon.spy()
    }
    boolean.default(context)
    expect(context.fail).to.not.be.called
  })
})
