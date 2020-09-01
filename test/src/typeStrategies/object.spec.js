const object = require('src/typeStrategies/object')

describe('type:object', () => {
  it('calls context.fail if type is not an object', () => {
    const context = {
      value: 'foo',
      fail: jest.fn(),
      def: {}
    }
    object.default(context)
    expect(context.fail).toHaveBeenCalledWith('Value must be an object')
  })
  it('does not call context.fail if type is an object (with no keys prop)', () => {
    const context = {
      value: { foo: 'bar' },
      fail: jest.fn(),
      def: {}
    }
    object.default(context)
    expect(context.fail).not.toHaveBeenCalled()
  })
  it('creates no context errors for a passing object with values specification', () => {
    const context = {
      value: {
        bar: 'quz'
      },
      fail: jest.fn(),
      def: {
        values: { type: 'string' }
      },
      errors: []
    }
    object.default(context).then(() => {
      expect(context.errors.length).toEqual(0)
    })
  })
  it('creates errors when an object with values specification fails', () => {
    const context = {
      key: 'someObj',
      value: {
        fizz: 'buzz',
        bar: 13,
        baz: true
      },
      fail: jest.fn(),
      def: {
        type: 'object',
        values: { type: 'string' }
      },
      errors: []
    }
    object.default(context).then(() => {
      expect(context.errors.length).toEqual(2)
    })
  })
  it('creates an error if key in data is not present in definition (strict = true)', () => {
    const context = {
      key: 'someObj',
      value: {
        foo: 'bar',
        fizz: 'buzz'
      },
      def: {
        type: 'object',
        keys: {
          fizz: { type: 'string' }
        }
      },
      errors: [],
      fail: jest.fn()
    }
    object.default(context).then(() => {
      expect(context.fail).toHaveBeenCalledWith('\'foo\' is not an allowed property')
    })
  })
  it('allows non-defined properties to be passed (strict = false)', () => {
    const context = {
      key: 'someObj',
      value: {
        foo: 'bar',
        fizz: 'buzz'
      },
      def: {
        type: 'object',
        keys: {
          fizz: { type: 'string' }
        },
        strict: false
      },
      errors: [],
      fail: jest.fn()
    }
    object.default(context).then(() => {
      expect(context.fail).not.toHaveBeenCalled()
    })
  })
})
