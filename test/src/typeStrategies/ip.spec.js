const ip = require('src/typeStrategies/ip')

describe('type:ip', () => {
  it('calls context.fail if type is not a valid ipv4', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    ip.v4(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid IPv4 address')
  })
  it('calls context.fail if type is empty (ipv4)', () => {
    const context = {
      value: '',
      fail: jest.fn()
    }
    ip.v4(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid IPv4 address')
  })
  it('does not call context.fail if type is a valid ipv4', () => {
    const context = {
      value: '192.168.1.1',
      fail: jest.fn()
    }
    ip.v4(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('calls context.fail if type is not a valid ipv6', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    ip.v6(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid IPv6 address')
  })
  it('calls context.fail if type is empty (ipv6)', () => {
    const context = {
      value: '',
      fail: jest.fn()
    }
    ip.v6(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid IPv6 address')
  })
  it('does not call context.fail if type is a valid ipv6', () => {
    const context = {
      value: '0000:0000:0000:0000:0000:0000:0000:0001',
      fail: jest.fn()
    }
    ip.v6(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('defaults to ipv4', () => {
    const context = {
      value: '192.168.1.1',
      fail: jest.fn()
    }
    ip.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
})
