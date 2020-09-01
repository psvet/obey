const zip = require('src/typeStrategies/zip')

describe('type:zip', () => {
  it('calls context.fail if value is not a valid US zip code', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    zip.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid US zip code')
  })
  it('calls context.fail if value is empty (US)', () => {
    const context = {
      value: '',
      fail: jest.fn()
    }
    zip.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid US zip code')
  })
  it('does not call context fail if value is a valid zip code (numeric)', () => {
    const context = {
      value: 61029,
      fail: jest.fn()
    }
    zip.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('does not call context fail if value is a valid zip code (string)', () => {
    const context = {
      value: '61029',
      fail: jest.fn()
    }
    zip.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('calls context.fail if value is not a valid CA zip code', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    zip.ca(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid Canadian zip code')
  })
  it('calls context.fail if value is empty (CA)', () => {
    const context = {
      value: '',
      fail: jest.fn()
    }
    zip.ca(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be a valid Canadian zip code')
  })
  it('does not call context fail if value is a valid US zip code', () => {
    const context = {
      value: 'A1A 1A1',
      fail: jest.fn()
    }
    zip.ca(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
})
