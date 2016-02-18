/* global describe, it, expect, sinon */
import boolean from 'src/types/boolean'

describe('type:boolean', () => {
  it('calls context.fail if type is not a boolean', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    boolean(context)
    expect(context.fail).to.be.calledWith('Value must be a boolean')
  })
})
