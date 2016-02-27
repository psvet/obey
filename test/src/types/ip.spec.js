/* global describe, it, expect, sinon */
import ipv4 from 'src/types/ip'

describe('type:ipv4', () => {
  it('calls context.fail if type is not a valid ipv4', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    ipv4(context)
    expect(context.fail).to.be.calledWith('Value must be a valid IPv4 address')
  })
  it('does not call context.fail if type is a valid ipv4', () => {
    const context = {
      value: '192.168.1.1',
      fail: sinon.spy()
    }
    ipv4(context)
    expect(context.fail).to.not.be.called
  })
})
