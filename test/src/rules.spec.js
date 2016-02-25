/* global describe, it, expect */
import rules from 'src/rules'

describe('rules', () => {
  describe('makeValidate', () => {
    it('returns the bound validation method', () => {
      const actual = rules.makeValidate({ type: 'string' })
      expect(actual).to.be.a.function
    })
  })
  describe('validate', () => {
    it('throws an error if the definition does not contain a type', () => {
      expect(rules.validate.bind(null, {}, 'foo')).to.throw('Model properties must define a \'type\'')
    })
    it('processes validation on a valid definition object', () => {
      return rules.validate({ type: 'string' }, 'foo')
        .then(data => {
          expect(data).to.equal('foo')
        })
    })
  })
  describe('build', () => {
    it('returns an object with the original definition and validate method', () => {
      const actual = rules.build({ type: 'string' })
      expect(actual).to.be.an.object
      expect(actual.def).to.deep.equal({ type: 'string' })
      expect(actual.validate).to.be.a.function
    })
  })
})
