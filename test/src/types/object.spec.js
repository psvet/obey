/* global describe, it, expect, sinon */
import object from 'src/types/object'

describe('type:object', () => {
  it('iterates sub-object if keys prop is present', () => {
    const context = {
      schema: {
        keys: {}
      }
    }
    const actual = object(context)
    expect(actual).to.be.a.function
  })
  it('calls context.fail if type is not an object', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy(),
      schema: {}
    }
    object(context)
    expect(context.fail).to.be.calledWith('Value must be an object')
  })
  it('does not call context.fail if type is an object (with no keys prop)', () => {
    const context = {
      value: { foo: 'bar' },
      fail: sinon.spy(),
      schema: {}
    }
    object(context)
    expect(context.fail).to.not.be.called
  })
})
