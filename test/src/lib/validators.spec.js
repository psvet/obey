/* global describe, it, expect, afterEach */
const validators = require('src/lib/validators')

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
    it('uses falsey value for boolean type if value is already set', () => {
      const def = {
        type: 'boolean',
        default: true
      }
      const actual = validators.default(def, false)
      expect(actual).to.equal(false)
    })
    it('uses falsey value for number type if value is already set', () => {
      const def = {
        type: 'number',
        default: 3
      }
      const actual = validators.default(def, 0)
      expect(actual).to.equal(0)
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
  describe('requiredIf', () => {
    it('creates an error object if conditionally required value is undefined', () => {
      const data = { address: { street: '123 test ave' } }
      const def = { requiredIf: 'address.street' }
      validators.requiredIf(def, undefined, 'address.city', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requiredIf',
        sub: 'address.street',
        key: 'address.city',
        value: undefined,
        message: 'Value required because \'address.street\' exists'
      })
    })
    it('creates an error object if conditionally required value is undefined when corresponding field HAS the given value', () => {
      const data = { address: { street: '123 test ave', country: 'US' } }
      const def = { requiredIf: { 'address.country': 'US' } }
      validators.requiredIf(def, undefined, 'address.zip', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requiredIf',
        sub: { 'address.country': 'US' },
        key: 'address.zip',
        value: undefined,
        message: 'Value required by existing \'address.country\' value'
      })
    })
    it('creates an error object if conditionally required value is undefined when corresponding field has any of the given values', () => {
      const data = { address: { street: '123 test ave', country: 'US' } }
      const def = { requiredIf: { 'address.country': [ 'US', 'Canada' ] } }
      validators.requiredIf(def, undefined, 'address.zip', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requiredIf',
        sub: { 'address.country': [ 'US', 'Canada' ] },
        key: 'address.zip',
        value: undefined,
        message: 'Value required by existing \'address.country\' value'
      })
    })
  })
  describe('requireIf', () => {
    let stub
    after(() => {
      stub.restore()
    })
    it('logs a warning and calls requiredIf method', () => {
      stub = sinon.stub(console, 'log')
      const data = { address: { street: '123 test ave' } }
      const def = { requireIf: 'address.street' }
      validators.requireIf(def, undefined, 'address.city', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requiredIf',
        sub: 'address.street',
        key: 'address.city',
        value: undefined,
        message: 'Value required because \'address.street\' exists'
      })
      expect(stub).calledWith('-----\nObey Warning: `requireIf` should be `requiredIf`\n-----')
    })
  })
  describe('requiredIfNot', () => {
    it('creates an error object if conditionally required value is undefined', () => {
      const data = { address: { street: '123 test ave' } }
      const def = { requiredIfNot: 'address.state' }
      validators.requiredIfNot(def, undefined, 'address.country', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requiredIfNot',
        sub: 'address.state',
        key: 'address.country',
        value: undefined,
        message: 'Value required because \'address.state\' is undefined'
      })
    })
    it('creates an error object if conditionally required value is undefined when corresponding field does NOT have the given value', () => {
      const data = { testField: 'not what we want' }
      const def = { requiredIfNot: { testField: 'what we want' } }
      validators.requiredIfNot(def, undefined, 'conditionalField', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requiredIfNot',
        sub: { testField: 'what we want' },
        key: 'conditionalField',
        value: undefined,
        message: 'Value required because \'testField\' value is not one specified'
      })
    })
    it('creates an error object if conditionally required value is undefined when corresponding field does NOT have any of the given value', () => {
      const data = { testField: 'not what we want' }
      const def = { requiredIfNot: { testField: [ 'what we want', 'something else we want' ] } }
      validators.requiredIfNot(def, undefined, 'conditionalField', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requiredIfNot',
        sub: { testField: [ 'what we want', 'something else we want' ] },
        key: 'conditionalField',
        value: undefined,
        message: 'Value required because \'testField\' value is not one specified'
      })
    })
  })
  describe('requireIfNot', () => {
    let stub
    after(() => {
      stub.restore()
    })
    it('logs a warning and calls requiredIfNot method', () => {
      stub = sinon.stub(console, 'log')
      const data = { address: { street: '123 test ave' } }
      const def = { requireIfNot: 'address.state' }
      validators.requireIfNot(def, undefined, 'address.country', mockErrors, data)
      expect(mockErrors[0]).to.deep.equal({
        type: 'requiredIfNot',
        sub: 'address.state',
        key: 'address.country',
        value: undefined,
        message: 'Value required because \'address.state\' is undefined'
      })
      expect(stub).calledWith('-----\nObey Warning: `requireIfNot` should be `requiredIfNot`\n-----')
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
