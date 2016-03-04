/* global describe, it, expect, beforeEach */
/* eslint no-unused-vars: 0 */
import types from 'src/types.js'

describe('types', () => {
  describe('checkSubType', () => {
    it('returns the original definition if no sub-type specified', () => {
      const actual = types.checkSubType({ type: 'foo' })
      expect(actual).to.deep.equal({ type: 'foo', sub: 'default' })
    })
    it('returns the definition with specific type and sub if sub-type specified', () => {
      const actual = types.checkSubType({ type: 'foo:bar' })
      expect(actual).to.deep.equal({ type: 'foo', sub: 'bar' })
    })
  })
  describe('validator', () => {
    it('builds a fail method and returns types.check', () => {
      const actual = types.validator.call({ errors: [] }, { type: 'string' }, 'foo', 'bar')
      expect(actual).to.be.a.function
    })
    it('allows an empty string to pass (via return) when empty flag is set', () => {
      const actual = types.validator.call({ errors: [] }, { type: 'string', empty: true }, 'foo', '')
      expect(actual).to.equal('')
    })
  })
  describe('add', () => {
    it('adds a new type as a function to the strategies', () => {
      types.add('testFn', context => null)
      expect(types.strategies.testFn.default).to.be.a.function
    })
    it('adds a new type as an object to the strageties', () => {
      types.add('testObj', { foo: () => null })
      expect(types.strategies.testObj.foo).to.be.a.function
    })
  })
  describe('check', () => {
    let context = {}
    beforeEach(() => {
      context = {
        def: {
          type: 'string',
          sub: 'default'
        },
        fail: () => null
      }
    })
    it('loads a type strategy and returns a promise which calls the strategy', () => {
      const actual = types.check(context)
      expect(actual).to.be.a.function
    })
    it('throws an error if the specified type does not exist', () => {
      context.def.type = 'nope'
      expect(types.check.bind(null, context)).to.throw('Type \'nope\' does not exist')
    })
    it('throws an error if the specified subtype does not exist', () => {
      context.def.sub = 'nope'
      expect(types.check.bind(null, context)).to.throw('Type \'string:nope\' does not exist')
    })
  })
})
