const array = require('src/typeStrategies/array')

describe('type:array', () => {
  it('calls context.fail if type is not an array', () => {
    const context = {
      value: 'foo',
      fail: jest.fn()
    }
    array.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be an array')
  })
  it('does not call context fail if type is an array', () => {
    const context = {
      value: [ 'foo' ],
      fail: jest.fn(),
      def: {}
    }
    const actual = array.default(context)
    expect(context.fail).not.toHaveBeenCalled()
    expect(actual).toEqual(context.value)
  })
  it('allows an empty array to pass if empty flag is set to true', () => {
    const context = {
      value: [],
      fail: jest.fn(),
      def: {
        empty: true
      }
    }
    array.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('fails an empty array when empty flag is not set', () => {
    const context = {
      value: [],
      fail: jest.fn(),
      def: {
        values: { type: 'string' }
      },
      errors: []
    }
    array.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must not be empty array')
  })
  it('passes when the elements of an array match the type specification', () => {
    const context = {
      value: [ 'foo', 'bar' ],
      fail: jest.fn(),
      def: {
        values: { type: 'string' }
      },
      errors: []
    }
    return array.default(context).then(() => {
      expect(context.errors.length).toEqual(0)
    })
  })
  it('fails when an element of an array does not match the type specification', () => {
    const context = {
      value: [ 'foo', 73, 34 ],
      fail: jest.fn(),
      def: {
        values: { type: 'string' }
      },
      key: 'someKey',
      errors: []
    }
    return array.default(context).then(() => {
      expect(context.errors.length).toEqual(2)
    })
  })
})
