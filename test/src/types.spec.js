/* global expect, describe, it  */
import types from 'src/types.js'

describe('types', () => {
  describe('check', () => {
    it('checks a native type and returns true if valid', () => {
      expect(types.check('boolean', true)).to.be.true
      expect(types.check('null', null)).to.be.true
      expect(types.check('undefined', undefined)).to.be.true
      expect(types.check('number', 73)).to.be.true
      expect(types.check('string', 'foo')).to.be.true
      expect(types.check('object', { foo: 'bar' })).to.be.true
      expect(types.check('array', [ 'foo', 'bar' ])).to.be.true
    })
    it('checks a native type and returns false if invalid', () => {
      expect(types.check('boolean', 'foo')).to.be.false
      expect(types.check('null', 'foo')).to.be.false
      expect(types.check('undefined', 'foo')).to.be.false
      expect(types.check('number', 'foo')).to.be.false
      expect(types.check('string', 1)).to.be.false
      expect(types.check('object', 'foo')).to.be.false
      expect(types.check('array', 'foo')).to.be.false
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
