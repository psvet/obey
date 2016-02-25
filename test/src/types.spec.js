/* global describe, it, expect, beforeEach, afterEach */
import types from 'src/types.js'

describe('types', () => {
  describe('validator', () => {
    it('builds a fail method and returns types.check', () => {
      const actual = types.validator.call({ errors: [] }, {}, 'foo', 'bar')
      expect(actual).to.be.a.function
    })
  })
  describe('add', () => {
    it('adds a new type to the strategies', () => {
      types.add('lowerCaseOnly', context => {
        if (!context.value.test(/^([a-z])*$/)) {
          context.fail('Value must be lowercase')
        }
        return context.val
      })
      expect(types.strategies.lowerCaseOnly).to.be.a.function
    })
  })
  describe('check', () => {
    let context = {}
    beforeEach(() => {
      context = {
        def: {
          type: 'string'
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
  })
})
