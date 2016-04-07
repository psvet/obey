/* global describe, it, expect, sinon */
import url from 'src/typeStrategies/url'

describe.only('type:url', () => {
  it('calls context.fail if type is not a valid URL (default)', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    url.default(context)
    expect(context.fail).to.be.calledWith('Value must be a valid URL')
  })
  it('calls context.fail if type is not a valid URL (noproto)', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    url.noproto(context)
    expect(context.fail).to.be.calledWith('Value must be a valid URL')
  })
  it('does not call context.fail if type is a valid URL (default)', () => {
    const context = {
      value: 'https://www.google.com/test',
      fail: sinon.spy()
    }
    url.default(context)
    expect(context.fail).to.not.be.called
  })
  it('does not call context.fail if type is a valid URL (noproto)', () => {
    const context = {
      value: 'www.google.com/test',
      fail: sinon.spy()
    }
    url.noproto(context)
    expect(context.fail).to.not.be.called
  })
})
