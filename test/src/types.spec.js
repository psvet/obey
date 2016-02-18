/* global describe, it, expect */
import types from 'src/types.js'

describe('types', () => {
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
  })
})
