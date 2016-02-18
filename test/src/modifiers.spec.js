/* global describe, it, expect, afterEach */
import modifiers from 'src/modifiers'

describe('modifiers', () => {
  afterEach(() => {
    modifiers.lib = {}
  })
  describe('validator', () => {
    it('returns the modifier method if exists', () => {
      modifiers.add('test', () => 'foo')
      const actual = modifiers.validator({ modifier: 'test' }, 'foo', 'bar')
      expect(actual).to.be.a.function
    })
    it('throws an error if the modifier does not exist', () => {
      expect(modifiers.validator.bind(null, { modifier: 'nope' })).to.throw('Modifier \'nope\' does not exist')
    })
  })
  describe('add', () => {
    it('adds a new modifier to the lib', () => {
      modifiers.add('test', () => 'foo')
      expect(modifiers.lib).to.have.property('test')
      expect(modifiers.lib.test).to.be.a.function
    })
    it('throws an error if the modifier name is not a string', () => {
      expect(modifiers.add.bind(null, true, () => 'foo')).to.throw('Modifier name should be a string')
    })
    it('throws an error if the modifier method is not a function', () => {
      expect(modifiers.add.bind(null, 'foo', undefined)).to.throw('Modifier method should be a function')
    })
  })
})
