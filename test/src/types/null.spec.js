/* global describe, it, expect, sinon */
import nullFn from 'src/types/null'

describe('type:null', () => {
  it('calls context.fail if type is not null', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    nullFn(context)
    expect(context.fail).to.be.calledWith('Value must be null')
  })
})
