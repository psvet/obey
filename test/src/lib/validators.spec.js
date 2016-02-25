/* global describe, it, expect, afterEach */
import validators from 'src/lib/validators'

describe('validators', () => {
  let mockThis = { errors: [] }
  afterEach(() => {
    mockThis.errors = []
  })
  describe('default', () => {
    it('sets a default value from the def if no value is set', () => {
      const def = {
        default: 'foo'
      }
      const actual = validators.default(def, 'test', undefined)
      expect(actual).to.equal('foo')
    })
    it('uses the value if it is already set', () => {
      const def = {
        default: 'foo'
      }
      const actual = validators.default(def, 'test', 'bar')
      expect(actual).to.equal('bar')
    })
  })
  describe('allow', () => {
    it('passes if value is in allow (array)', () => {
      const def = {
        allow: [ 'foo', 'bar' ]
      }
      validators.allow.call(mockThis, def, 'test', 'foo')
      expect(mockThis.errors.length).to.equal(0)
    })
    it('passes if value is in allow (single)', () => {
      const def = {
        allow: 'foo'
      }
      validators.allow.call(mockThis, def, 'test', 'foo')
      expect(mockThis.errors.length).to.equal(0)
    })
    it('creates an error object if value is not in allow (array)', () => {
      const def = {
        allow: [ 'foo', 'bar' ]
      }
      validators.allow.call(mockThis, def, 'test', 'fizz')
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 'fizz',
        message: 'Value \'fizz\' is not allowed'
      })
    })
    it('creates an error object if value is not in allow (single)', () => {
      const def = {
        allow: 'foo'
      }
      validators.allow.call(mockThis, def, 'test', 'bar')
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 'bar',
        message: 'Value \'bar\' is not allowed'
      })
    })
  })
  describe('min', () => {
    it('creates an error object if array length is less than def min', () => {
      const def = { min: 3 }
      validators.min.call(mockThis, def, 'test', [ 'foo' ])
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: [ 'foo' ],
        message: 'Length must be greater than 3'
      })
    })
    it('creates an error object if string length is less than def min', () => {
      const def = { min: 5 }
      validators.min.call(mockThis, def, 'test', 'foo')
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 'foo',
        message: 'Length must be greater than 5'
      })
    })
    it('creates an error object if number is less than def min', () => {
      const def = { min: 10 }
      validators.min.call(mockThis, def, 'test', 5)
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 5,
        message: 'Value must be greater than 10'
      })
    })
  })
  describe('max', () => {
    it('creates an error object if array length is greater than def max', () => {
      const def = { max: 1 }
      validators.max.call(mockThis, def, 'test', [ 'foo', 'bar' ])
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: [ 'foo', 'bar' ],
        message: 'Length must be less than 1'
      })
    })
    it('creates an error object if string length is greater than def max', () => {
      const def = { max: 2 }
      validators.max.call(mockThis, def, 'test', 'foo')
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 'foo',
        message: 'Length must be less than 2'
      })
    })
    it('creates an error object if number is greater than def max', () => {
      const def = { max: 5 }
      validators.max.call(mockThis, def, 'test', 10)
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 10,
        message: 'Value must be less than 5'
      })
    })
  })
  describe('required', () => {
    it('creates an error object if a required value is not supplied', () => {
      const def = { required: true }
      validators.required.call(mockThis, def, 'test', undefined)
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: undefined,
        message: 'Property \'test\' is required'
      })
    })
  })
})
