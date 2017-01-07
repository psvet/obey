/* global describe, it, expect, afterEach */
import validators from 'src/lib/validators'

describe('validators', () => {
  let mockErrors
  beforeEach(() => {
    mockErrors = []
  })
  describe('default', () => {
    it('sets a default value from the def if no value is set', () => {
      const def = {
        default: 'foo'
      }
      const actual = validators.default(def, undefined)
      expect(actual).to.equal('foo')
    })
    it('uses the value if it is already set', () => {
      const def = {
        default: 'foo'
      }
      const actual = validators.default(def, 'bar')
      expect(actual).to.equal('bar')
    })
  })
  describe('allow', () => {
    it('passes if value is in allow (object)', () => {
      const def = {
        allow: { 'foo': 'fooey', 'bar': 'barey' }
      }
      validators.allow(def, 'foo', 'test', mockErrors)
      expect(mockErrors.length).to.equal(0)
    })
    it('passes if value is in allow (array)', () => {
      const def = {
        allow: [ 'foo', 'bar' ]
      }
      validators.allow(def, 'foo', 'test', mockErrors)
      expect(mockErrors.length).to.equal(0)
    })
    it('passes if value is in allow (single)', () => {
      const def = {
        allow: 'foo'
      }
      validators.allow(def, 'foo', 'test', mockErrors)
      expect(mockErrors.length).to.equal(0)
    })
    it('creates an error object if value is not in allow (array)', () => {
      const def = {
        allow: [ 'foo', 'bar' ]
      }
      validators.allow(def, 'fizz', 'test', mockErrors)
      expect(mockErrors[0]).to.deep.equal({
        type: 'allow',
        sub: [ 'foo', 'bar' ],
        key: 'test',
        value: 'fizz',
        message: 'Value \'fizz\' is not allowed'
      })
    })
    it('creates an error object if value is not in allow (single)', () => {
      const def = {
        allow: 'foo'
      }
      validators.allow(def, 'bar', 'test', mockErrors)
      expect(mockErrors[0]).to.deep.equal({
        type: 'allow',
        sub: 'foo',
        key: 'test',
        value: 'bar',
        message: 'Value \'bar\' is not allowed'
      })
    })
  })
  describe('min', () => {
    it('creates an error object if array length is less than def min', () => {
      const def = { min: 3 }
      validators.min(def, [ 'foo' ], 'test', mockErrors)
      expect(mockErrors[0]).to.deep.equal({
        type: 'min',
        sub: 3,
        key: 'test',
        value: [ 'foo' ],
        message: 'Length must be greater than 3'
      })
    })
    it('creates an error object if string length is less than def min', () => {
      const def = { min: 5 }
      validators.min(def, 'foo', 'test', mockErrors)
      expect(mockErrors[0]).to.deep.equal({
        type: 'min',
        sub: 5,
        key: 'test',
        value: 'foo',
        message: 'Length must be greater than 5'
      })
    })
    it('creates an error object if number is less than def min', () => {
      const def = { min: 10 }
      validators.min(def, 5, 'test', mockErrors)
      expect(mockErrors[0]).to.deep.equal({
        type: 'min',
        sub: 10,
        key: 'test',
        value: 5,
        message: 'Value must be greater than 10'
      })
    })
  })
  describe('max', () => {
    it('creates an error object if array length is greater than def max', () => {
      const def = { max: 1 }
      validators.max(def, [ 'foo', 'bar' ], 'test', mockErrors)
      expect(mockErrors[0]).to.deep.equal({
        type: 'max',
        sub: 1,
        key: 'test',
        value: [ 'foo', 'bar' ],
        message: 'Length must be less than 1'
      })
    })
    it('creates an error object if string length is greater than def max', () => {
      const def = { max: 2 }
      validators.max(def, 'foo', 'test', mockErrors)
      expect(mockErrors[0]).to.deep.equal({
        type: 'max',
        sub: 2,
        key: 'test',
        value: 'foo',
        message: 'Length must be less than 2'
      })
    })
    it('creates an error object if number is greater than def max', () => {
      const def = { max: 5 }
      validators.max(def, 10, 'test', mockErrors)
      expect(mockErrors[0]).to.deep.equal({
        type: 'max',
        sub: 5,
        key: 'test',
        value: 10,
        message: 'Value must be less than 5'
      })
    })
  })
  describe('requireIf', () => {
    it('creates an error object if conditionally required value is undefined', () => {
      const data = { address: { street: '123 test ave' } }
      const def = { requireIf: 'address.street' }
      validators.requireIf(def, undefined, 'address.city', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requireIf',
        sub: 'address.street',
        key: 'address.city',
        value: undefined,
        message: 'Value required because \'address.street\' exists'
      })
    })
    it('creates an error object if conditionally required value is undefined when corresponding field HAS the given value', () => {
      const data = { address: { street: '123 test ave', country: 'US' } }
      const def = { requireIf: { 'address.country': 'US' } }
      validators.requireIf(def, undefined, 'address.zip', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requireIf',
        sub: { 'address.country': 'US' },
        key: 'address.zip',
        value: undefined,
        message: 'Value required by existing \'address.country\' value'
      })
    })
  })
  describe('requireIfNot', () => {
    it('creates an error object if conditionally required value is undefined', () => {
      const data = { address: { street: '123 test ave' } }
      const def = { requireIfNot: 'address.state' }
      validators.requireIfNot(def, undefined, 'address.country', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requireIfNot',
        sub: 'address.state',
        key: 'address.country',
        value: undefined,
        message: 'Value required because \'address.state\' is undefined'
      })
    })
    it('creates an error object if conditionally required value is undefined when corresponding field does NOT have the given value', () => {
      const data = { testField: 'not what we want' }
      const def = { requireIfNot: { testField: 'what we want' } }
      validators.requireIfNot(def, undefined, 'conditionalField', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requireIfNot',
        sub: { testField: 'what we want' },
        key: 'conditionalField',
        value: undefined,
        message: 'Value required because \'testField\' value is not one specified'
      })
    })
  })
  describe('equalTo', () => {
    it('creates an error object when fields are not equal', () => {
      const data = { password: 'Password' }
      const def = { equalTo: 'password' }
      validators.equalTo(def, 'Passwrod', 'passwordConfirm', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'equalTo',
        sub: 'password',
        key: 'passwordConfirm',
        value: 'Passwrod',
        message: 'Value must match password value'
      })
    })
    it('doesn\'t create an error object when fields are equal', () => {
      const data = { password: 'Password' }
      const def = { equalTo: 'password' }
      validators.equalTo(def, 'Password', 'passwordConfirm', mockErrors, data)
      expect(mockErrors).to.be.empty
    })
  })
})
