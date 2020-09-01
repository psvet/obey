/* global describe, it, expect, beforeEach */
/* eslint no-unused-vars: 0 */
const types = require('src/types.js')

describe('types', () => {
  describe('checkSubType', () => {
    it('returns the original definition if no sub-type specified', () => {
      const actual = types.checkSubType({ type: 'foo' })
      expect(actual).toEqual({ type: 'foo', sub: 'default' })
    })
    it('returns the definition with specific type and sub if sub-type specified', () => {
      const actual = types.checkSubType({ type: 'foo:bar' })
      expect(actual).toEqual({ type: 'foo', sub: 'bar' })
    })
  })
  describe('validate', () => {
    it('builds a fail method and returns types.check', () => {
      const actual = types.validate.call({ errors: [] }, { type: 'string' }, 'foo', 'bar')
      expect(actual).toEqual(expect.any(Promise))
    })
    it('allows an empty string to pass (via return) when empty flag is set', () => {
      const actual = types.validate.call({ errors: [] }, { type: 'string', empty: true }, '', 'foo')
      expect(actual).toEqual('')
    })
  })
  describe('add', () => {
    it('adds a new type as a function to the strategies', () => {
      types.add('testFn', context => null)
      expect(types.strategies.testFn.default).toEqual(expect.any(Function))
    })
    it('adds a new type as an object to the strageties', () => {
      types.add('testObj', { foo: () => null })
      expect(types.strategies.testObj.foo).toEqual(expect.any(Function))
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
      expect(actual).toEqual(expect.any(Promise))
    })
    it('throws an error if the specified type does not exist', () => {
      context.def.type = 'nope'
      expect(types.check.bind(null, context)).toThrow('Type \'nope\' does not exist')
    })
    it('throws an error if the specified subtype does not exist', () => {
      context.def.sub = 'nope'
      expect(types.check.bind(null, context)).toThrow('Type \'string:nope\' does not exist')
    })
    it('throws an error if the type contains path characters', () => {
      context.def.type = '../creators'
      expect(types.check.bind(null, context)).toThrow('Illegal type name: ../creators')
    })
  })
})
