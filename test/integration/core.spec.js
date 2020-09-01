const obey = require('src/index')
const modelFixtures = require('test/fixtures/core')
const ValidationError = require('src/lib/error')

describe('integration:core', () => {
  let stub
  afterEach(() => {
    if (stub) stub.mockReset()
  })
  it('builds a model and successfully validates passing object', () => {
    const testModel = obey.model(modelFixtures.basicExtended)
    const testData = {
      fname: 'John',
      lname: 'Smith',
      type: 'foo'
    }
    return testModel.validate(testData).then(res => {
      expect(res).toEqual(testData)
    })
  })
  it('builds a model and fails validation on type', () => {
    const testModel = obey.model(modelFixtures.basicExtended)
    const testData = {
      fname: 5,
      lname: 'Smith',
      type: 'foo',
      nested: {
        foo: 'bar'
      }
    }
    return testModel.validate(testData).catch(e => {
      expect(e).toBeInstanceOf(ValidationError)
    })
  })
  it('builds a model and passes when non-required field is undefined', () => {
    const testModel = obey.model(modelFixtures.basicExtended)
    const testData = {
      fname: 'John'
    }
    return testModel.validate(testData)
      .then((res) => {
        expect(res.fname).toEqual('John')
        expect(res.lname).toBeUndefined()
        expect(res.type).toBeUndefined()
      })
  })
  it('builds a models and passes with response including supplied undefined value', () => {
    const testModel = obey.model(modelFixtures.basicExtended)
    const testData = {
      fname: 'John',
      lname: undefined
    }
    return testModel.validate(testData)
      .then((res) => {
        expect(res.fname).toEqual('John')
        expect(res).toHaveProperty('lname')
        expect(res).not.toHaveProperty('type')
      })
  })
  it('builds a model and fails when required field is undefined', () => {
    stub = jest.spyOn(console, 'log')
    const testModel = obey.model(modelFixtures.basicRequired)
    const testData = {
      fname: 'John'
    }
    return testModel.validate(testData)
      .then(() => { throw new Error('Should fail') })
      .catch((err) => {
        expect(err.message).toEqual('lname (undefined): Property \'lname\' is required')
        expect(stub).toHaveBeenCalledWith('-----\nObey Warning: `require` should be `required`\n-----')
      })
  })
  it('builds a model and successfully validates when nested object present', () => {
    const testModel = obey.model(modelFixtures.basicNested)
    const testData = {
      name: 'fizz',
      someobj: {
        foo: 'buzz'
      }
    }
    return testModel.validate(testData).then(res => {
      expect(res).toEqual(testData)
    })
  })
  it('builds a model and fails validates when nested object present', () => {
    const testModel = obey.model(modelFixtures.basicNested)
    const testData = {
      name: true,
      someobj: {
        foo: 5
      }
    }
    return testModel.validate(testData)
      .then(() => { throw new Error('Should fail') })
      .catch(err => {
        expect(err.collection).toEqual([
          { type: 'string', sub: 'default', key: 'name', value: true, message: 'Value must be a string' },
          { type: 'string', sub: 'default', key: 'someobj.foo', value: 5, message: 'Value must be a string' }
        ])
      })
  })
  it('builds a model and passes with empty string (allowed with flag)', () => {
    const testModel = obey.model(modelFixtures.basicEmpty)
    const testData = {
      name: ''
    }
    return testModel.validate(testData)
      .then(data => {
        expect(data.name).toEqual('')
      })
  })
  it('builds a model and fails with empty string (not allowed with flag)', () => {
    const testModel = obey.model(modelFixtures.basicNoEmpty)
    const testData = {
      name: ''
    }
    return testModel.validate(testData)
      .then(() => {
        throw new Error('Should have thrown')
      })
      .catch(err => {
        expect(err.message).toEqual('name (): Value must be a string')
      })
  })
  it('builds a model and passes with empty array (allowed with flag)', () => {
    const testModel = obey.model(modelFixtures.basicEmptyArray)
    const testData = {
      names: []
    }
    return testModel.validate(testData)
      .then(data => {
        expect(data.names).toEqual([])
      })
  })
  it('builds a model and fails with empty array (not allowed with flag)', () => {
    const testModel = obey.model(modelFixtures.basicNoEmptyArray)
    const testData = {
      names: []
    }
    return testModel.validate(testData)
      .then(() => {
        throw new Error('Should have thrown')
      })
      .catch(err => {
        expect(err.message).toEqual('names (): Value must not be empty array')
      })
  })
  it('builds a model and passes validation when partial option is set to true', () => {
    const testModel = obey.model(modelFixtures.basicExtended)
    const testData = {
      lname: 'Smith'
    }
    return testModel.validate(testData, { partial: true })
      .then(data => {
        expect(data).toEqual(testData)
      })
  })
  it('builds a model and passes validation when partial option is set to true, does not run creators', () => {
    obey.creator('testCreator', () => 'fizz')
    const testModel = obey.model(modelFixtures.basicCreator)
    const testData = {
      bar: 'buzz'
    }
    return testModel.validate(testData, { partial: true })
      .then(data => {
        expect(data).toEqual(testData)
      })
  })
  it('builds a model and disregards conditional require because of default rule', () => {
    stub = jest.spyOn(console, 'log')
    const testModel = obey.model(modelFixtures.conditionalWithDefault)
    const testData = {
      fname: 'Test'
    }
    return testModel.validate(testData)
      .then(data => {
        expect(data).toEqual({
          fname: 'Test',
          lname: 'Bar'
        })
        expect(stub)
          .toHaveBeenCalledWith(
            "-----\nObey Warning: removing conditional require rule(s) (requiredIfNot) due to 'default' or 'creator' being defined\n-----"
          )
      })
  })
  it('builds a model and disregards conditional require because of creator', () => {
    stub = jest.spyOn(console, 'log')
    obey.creator('foo-namer', () => 'FOO')
    const testModel = obey.model(modelFixtures.conditionalWithCreator)
    const testData = {
      lname: 'Bar'
    }
    return testModel.validate(testData)
      .then(data => {
        expect(data).toEqual({
          fname: 'FOO',
          lname: 'Bar'
        })
        expect(stub)
          .toHaveBeenCalledWith(
            "-----\nObey Warning: removing conditional require rule(s) (requiredIf) due to 'default' or 'creator' being defined\n-----"
          )
      })
  })
  it('does not allow empty predefined type value without `empty` rule when required', () => {
    const testModel = obey.model(modelFixtures.requiredPredefined)
    const testData = { zip: '' }
    return testModel.validate(testData)
      .catch(err => {
        expect(err.message).toEqual('zip (): Property \'zip\' is required')
      })
  })
  it('does not allow empty predefined type value without `empty` rule when not required', () => {
    const testModel = obey.model(modelFixtures.notRequiredPredefined)
    const testData = { phone: '' }
    return testModel.validate(testData)
      .catch(err => {
        expect(err.message).toEqual('phone (): Value must be a valid phone number')
      })
  })
  it('builds a model correctly with `allow` (object) and `empty` rules', () => {
    const testModel = obey.model(modelFixtures.allowEmptyStringObject)
    const testData = { foo: '' }
    return testModel.validate(testData)
      .then(res => {
        expect(res).toEqual(testData)
      })
  })
  it('builds a model correctly with `allow` and `empty` rules', () => {
    const testModel = obey.model(modelFixtures.allowEmptyString)
    const testData = { foo: '' }
    return testModel.validate(testData)
      .then(res => {
        expect(res).toEqual(testData)
      })
  })
})
