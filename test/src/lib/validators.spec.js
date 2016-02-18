/* global describe, it, expect, afterEach */
import validators from 'src/lib/validators'

describe('validators', () => {
  let mockThis = { errors: [] }
  afterEach(() => {
    mockThis.errors = []
  })
  describe('default', () => {
    it('sets a default value from the schema if no value is set', () => {
      const schema = {
        default: 'foo'
      }
      const actual = validators.default(schema, 'test', undefined)
      expect(actual).to.equal('foo')
    })
    it('uses the value if it is already set', () => {
      const schema = {
        default: 'foo'
      }
      const actual = validators.default(schema, 'test', 'bar')
      expect(actual).to.equal('bar')
    })
  })
  describe('allowed', () => {
    it('creates an error object if value is not in allowed array', () => {
      const schema = {
        allowed: [ 'foo', 'bar' ]
      }
      validators.allowed.call(mockThis, schema, 'test', 'fizz')
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 'fizz',
        message: 'Value \'fizz\' is not allowed'
      })
    })
  })
  describe('min', () => {
    it('creates an error object if array length is less than schema min', () => {
      const schema = { min: 3 }
      validators.min.call(mockThis, schema, 'test', [ 'foo' ])
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: [ 'foo' ],
        message: 'Length must be greater than 3'
      })
    })
    it('creates an error object if string length is less than schema min', () => {
      const schema = { min: 5 }
      validators.min.call(mockThis, schema, 'test', 'foo')
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 'foo',
        message: 'Length must be greater than 5'
      })
    })
    it('creates an error object if number is less than schema min', () => {
      const schema = { min: 10 }
      validators.min.call(mockThis, schema, 'test', 5)
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 5,
        message: 'Value must be greater than 10'
      })
    })
  })
  describe('max', () => {
    it('creates an error object if array length is greater than schema max', () => {
      const schema = { max: 1 }
      validators.max.call(mockThis, schema, 'test', [ 'foo', 'bar' ])
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: [ 'foo', 'bar' ],
        message: 'Length must be less than 1'
      })
    })
    it('creates an error object if string length is greater than schema max', () => {
      const schema = { max: 2 }
      validators.max.call(mockThis, schema, 'test', 'foo')
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 'foo',
        message: 'Length must be less than 2'
      })
    })
    it('creates an error object if number is greater than schema max', () => {
      const schema = { max: 5 }
      validators.max.call(mockThis, schema, 'test', 10)
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: 10,
        message: 'Value must be less than 5'
      })
    })
  })
  describe('required', () => {
    it('creates an error object if a required value is not supplied', () => {
      const schema = { required: true }
      validators.required.call(mockThis, schema, 'test', undefined)
      expect(mockThis.errors[0]).to.deep.equal({
        key: 'test',
        value: undefined,
        message: 'Property \'test\' is required'
      })
    })
  })
})
