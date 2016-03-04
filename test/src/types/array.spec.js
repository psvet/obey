/* global describe, it, expect, sinon */
import array from 'src/types/array'

describe('type:array', () => {
  it('calls context.fail if type is not an array', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    array.default(context)
    expect(context.fail).to.be.calledWith('Value must be an array')
  })
  it('does not call context fail if type is an array', () => {
    const context = {
      value: [ 'foo' ],
      fail: sinon.spy(),
      def: {}
    }
    array.default(context)
    expect(context.fail).to.not.be.called
  })
  it('allows an empty array to pass if empty flag is set to true', () => {
    const context = {
      value: [],
      fail: sinon.spy(),
      def: {
        empty: true
      }
    }
    array.default(context)
    expect(context.fail).to.not.be.called
  })
  it('passes when the elements of an array match the type specification', () => {
    const context = {
      value: [ 'foo', 'bar' ],
      fail: sinon.spy(),
      def: {
        values: { type: 'string' }
      },
      errors: []
    }
    return array.default(context).then(() => {
      expect(context.errors.length).to.equal(0)
    })
  })
  it('fails when an element of an array does not match the type specification', () => {
    const context = {
      value: [ 'foo', 73, 34 ],
      fail: sinon.spy(),
      def: {
        values: { type: 'string' }
      },
      key: 'someKey',
      errors: []
    }
    return array.default(context).then(() => {
      expect(context.errors.length).to.equal(2)
    })
  })
})
