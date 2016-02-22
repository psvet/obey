/* global describe, it, expect, sinon */
import alphanum from 'src/types/alphanum'

describe('type:alphanum', () => {
  it('calls context.fail if type is not a valid alphanum', () => {
    const context = {
      value: 'foo$% 1!',
      fail: sinon.spy()
    }
    alphanum(context)
    expect(context.fail).to.be.calledWith('Value must contain only letters and/or numbers')
  })
  it('does not call context.fail if type is a valid email', () => {
    const context = {
      value: 'abc123',
      fail: sinon.spy()
    }
    alphanum(context)
    expect(context.fail).to.not.be.called
  })
})
