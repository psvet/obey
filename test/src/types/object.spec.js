/* global describe, it, expect, sinon */
import object from 'src/types/object'

describe('type:object', () => {
  it('iterates sub-object if keys prop is present', () => {
    const context = {
      def: {
        keys: {}
      },
      fail: sinon.spy()
    }
    const actual = object(context)
    expect(actual).to.be.a.function
  })
  it('calls context.fail if type is not an object', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy(),
      def: {}
    }
    object(context)
    expect(context.fail).to.be.calledWith('Value must be an object')
  })
  it('does not call context.fail if type is an object (with no keys prop)', () => {
    const context = {
      value: { foo: 'bar' },
      fail: sinon.spy(),
      def: {}
    }
    object(context)
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
    object(context).then(() => {
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
    object(context).then(() => {
      expect(context.errors.length).to.equal(2)
    })
  })
})
