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
    it('processes global props even when falsey', () => {
      return rules.validate({ type: 'number', default: 0 }, undefined)
        .then(data => {
          expect(data).to.equal(0)
        })
    })
    it('should not persist init data forever', () => {
      if (rules.initData) { delete rules.initData }
      let def = {
        type: 'object',
        keys: {
          phone: { type: 'string' },
          phoneType: { type: 'string', requireIf: 'phone' }
        }
      }
      return rules.validate(def, { phone: '123' })
        .then(() => {
          assert.fail(true, false, 'Data is invalid, marked as valid')
        })
        .catch(() => expect(rules.validate(def, {})).to.be.fulfilled)
    })
    it('should recursively pass init data to objects', () => {
      let def = {
        type: 'object',
        keys: {
          person: { type: 'object', keys: {
            name: { type: 'string' }
          }
        },
          contacts: { type: 'object', keys: {
            phone: { type: 'string', requireIf: 'person.name' }
          }}
        }
      }
      let data = {
        person: { name: 'John Smith' },
        contacts: {}
      }
      return expect(rules.validate(def, data)).to.be.rejected
    })
    it('should recursively pass init data to arrays', () => {
      let def = {
        type: 'object',
        keys: {
          person: { type: 'object', keys: {
            name: { type: 'string' }
          }},
          labels: { type: 'array', values: {
            type: 'object', keys: {
              label: { type: 'string' },
              condRequired: { type: 'string', requireIf: 'person.name' }
            }
          }}
        }
      }
      let data = {
        person: { name: 'John Smith' },
        labels: [{label: 'awesome', condRequired: 'nice'}, {label: 'awful'}]
      }
      return expect(rules.validate(def, data)).to.be.rejected
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
