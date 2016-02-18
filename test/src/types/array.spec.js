/* global describe, it, expect, sinon */
import array from 'src/types/array'

describe('type:array', () => {
  it('calls context.fail if type is not an array', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    array(context)
    expect(context.fail).to.be.calledWith('Value must be an array')
  })
})
