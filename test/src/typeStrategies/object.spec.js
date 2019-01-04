/* global describe, it, expect, sinon */
const object = require('src/typeStrategies/object')

describe('type:object', () => {
  it('calls context.fail if type is not an object', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy(),
      def: {}
    }
    object.default(context)
    expect(context.fail).to.be.calledWith('Value must be an object')
  })
  it('does not call context.fail if type is an object (with no keys prop)', () => {
    const context = {
      value: { foo: 'bar' },
      fail: sinon.spy(),
      def: {}
    }
    object.default(context)
    expect(context.fail).to.not.be.called
  })
  it('creates no context errors for a passing object with values specification', () => {
    const context = {
      value: {
        bar: 'quz'
      },
      fail: sinon.spy(),
      def: {
        values: { type: 'string' }
      },
      errors: []
    }
    object.default(context).then(() => {
      expect(context.errors.length).to.equal(0)
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
      fail: sinon.spy(),
      def: {
        type: 'object',
        values: { type: 'string' }
      },
      errors: []
    }
    object.default(context).then(() => {
      expect(context.errors.length).to.equal(2)
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
      fail: sinon.spy()
    }
    object.default(context).then(() => {
      expect(context.fail).to.be.calledWith('\'foo\' is not an allowed property')
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
      fail: sinon.spy()
    }
    object.default(context).then(() => {
      expect(context.fail).to.not.be.called
    })
  })
})
