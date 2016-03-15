/* global describe, it, expect, sinon */
import string from 'src/types/strategies/string'

describe('type:string', () => {
  it('calls context.fail if type is not a string', () => {
    const context = {
      value: true,
      fail: sinon.spy()
    }
    string.default(context)
    expect(context.fail).to.be.calledWith('Value must be a string')
  })
  it('does not call context.fail if type is a string', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    string.default(context)
    expect(context.fail).to.not.be.called
  })
  it('calls context.fail if type is not an alphanumberic string', () => {
    const context = {
      value: 'abc$#',
      fail: sinon.spy()
    }
    string.alphanumeric(context)
    expect(context.fail).to.be.calledWith('Value must contain only letters and/or numbers')
  })
  it('does not call context.fail if type is an alphanumeric string', () => {
    const context = {
      value: 'abc123',
      fail: sinon.spy()
    }
    string.alphanumeric(context)
    expect(context.fail).to.not.be.called
  })
})
