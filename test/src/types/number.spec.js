/* global describe, it, expect, sinon */
import number from 'src/types/number'

describe('type:number', () => {
  it('calls context.fail if type is not a number', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    number(context)
    expect(context.fail).to.be.calledWith('Value must be a number')
  })
})
