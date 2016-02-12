/* global expect */
import types from 'src/types.js'

describe('types', () => {
  describe('check', () => {
    it('checks a native type and returns true if valid', () => {
      const actual = types.check('boolean', true)
      expect(actual).to.be.true
    })
    it('checks a native type and returns false if invalid', () => {
      const actual = types.check('number', 'foo')
      expect(actual).to.be.false
    })
    it('checks a regex and returns true if valid', () => {
      const actual = types.check('email', 'john@email.com')
      expect(actual).to.be.true
    })
    it('checks a regex and returns false if invalid', () => {
      const actual = types.check('email', 'foo')
      expect(actual).to.be.false
    })
    it('throws an error if invalid type is specified', () => {
      expect(types.check.bind(null, 'foo', 'bar')).to.throw('Invalid type specification: foo')
    })
  })
})
