/* global describe, it, expect, sinon */
import undefinedFn from 'src/types/undefined'

describe('type:undefined', () => {
  it('calls context.fail if type is not undefined', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    undefinedFn(context)
    expect(context.fail).to.be.calledWith('Value must be undefined')
  })
  it('does not call context.fail if type is undefined', () => {
    const context = {
      value: undefined,
      fail: sinon.spy()
    }
    undefinedFn(context)
    expect(context.fail).to.not.be.called
  })
})
