/* global describe, it, expect, sinon */
const ip = require('src/typeStrategies/ip')

describe('type:ip', () => {
  it('calls context.fail if type is not a valid ipv4', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    ip.v4(context)
    expect(context.fail).to.be.calledWith('Value must be a valid IPv4 address')
  })
  it('does not call context.fail if type is a valid ipv4', () => {
    const context = {
      value: '192.168.1.1',
      fail: sinon.spy()
    }
    ip.v4(context)
    expect(context.fail).to.not.be.called
  })
  it('calls context.fail if type is not a valid ipv6', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    ip.v6(context)
    expect(context.fail).to.be.calledWith('Value must be a valid IPv6 address')
  })
  it('does not call context.fail if type is a valid ipv6', () => {
    const context = {
      value: '0000:0000:0000:0000:0000:0000:0000:0001',
      fail: sinon.spy()
    }
    ip.v6(context)
    expect(context.fail).to.not.be.called
  })
  it('defaults to ipv4', () => {
    const context = {
      value: '192.168.1.1',
      fail: sinon.spy()
    }
    ip.default(context)
    expect(context.fail).to.not.be.called
  })
})
