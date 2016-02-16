/* global describe, it, expect, afterEach */
import rules from 'src/rules'

describe('rules', () => {
  afterEach(() => {
    rules.lib = {}
  })
  describe('add', () => {
    it('adds a new rule to the lib', () => {
      rules.add('test', () => 'foo')
      expect(rules.lib).to.have.property('test')
      expect(rules.lib.test).to.be.a.function
    })
    it('throws an error if the rule name is not a string', () => {
      expect(rules.add.bind(null, true, () => 'foo')).to.throw('Rule name should be a string')
    })
    it('throws an error if the rule method is not a function', () => {
      expect(rules.add.bind(null, 'foo', undefined)).to.throw('Rule method should be a function')
    })
  })
})
