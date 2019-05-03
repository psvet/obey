/* global describe, it, expect */
const obey = require('src/index')
const modelFixtures = require('test/fixtures/core')
const ValidationError = require('src/lib/error')

describe('integration:core', () => {
  let stub
  afterEach(() => {
    if (stub) stub.restore()
  })
  it('builds a model and successfully validates passing object', () => {
    const testModel = obey.model(modelFixtures.basicExtended)
    const testData = {
      fname: 'John',
      lname: 'Smith',
      type: 'foo'
    }
    return testModel.validate(testData).then(res => {
      expect(res).to.deep.equal(testData)
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
      expect(e).to.be.instanceOf(ValidationError)
    })
  })
  it('builds a model and passes when non-required field is undefined', () => {
    const testModel = obey.model(modelFixtures.basicExtended)
    const testData = {
      fname: 'John'
    }
    return testModel.validate(testData)
      .then((res) => {
        expect(res.fname).to.equal('John')
        expect(res.lname).to.be.undefined
        expect(res.type).to.be.undefined
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
        expect(res.fname).to.equal('John')
        expect(res).to.have.property('lname')
        expect(res).to.not.have.property('type')
      })
  })
  it('builds a model and fails when required field is undefined', () => {
    stub = sinon.stub(console, 'log')
    const testModel = obey.model(modelFixtures.basicRequired)
    const testData = {
      fname: 'John'
    }
    return testModel.validate(testData)
      .then(() => { throw new Error('Should fail') })
      .catch((err) => {
        expect(err.message).to.equal('lname (undefined): Property \'lname\' is required')
        expect(stub).calledWith('-----\nObey Warning: `require` should be `required`\n-----')
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
      expect(res).to.deep.equal(testData)
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
        expect(err.collection).to.deep.equal([
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
        expect(data.name).to.equal('')
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
        expect(err.message).to.equal('name (): Value must be a string')
      })
  })
  it('builds a model and passes with empty array (allowed with flag)', () => {
    const testModel = obey.model(modelFixtures.basicEmptyArray)
    const testData = {
      names: []
    }
    return testModel.validate(testData)
      .then(data => {
        expect(data.names).to.deep.equal([])
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
        expect(err.message).to.equal('names (): Value must not be empty array')
      })
  })
  it('builds a model and passes validation when partial option is set to true', () => {
    const testModel = obey.model(modelFixtures.basicExtended)
    const testData = {
      lname: 'Smith'
    }
    return testModel.validate(testData, { partial: true })
      .then(data => {
        expect(data).to.deep.equal(testData)
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
        expect(data).to.deep.equal(testData)
      })
  })
  it('builds a model and disregards conditional require because of default rule', () => {
    stub = sinon.stub(console, 'log')
    const testModel = obey.model(modelFixtures.conditionalWithDefault)
    const testData = {
      fname: 'Test'
    }
    return testModel.validate(testData)
      .then(data => {
        expect(data).to.deep.equal({
          fname: 'Test',
          lname: 'Bar'
        })
        expect(stub)
          .calledWith(
            "-----\nObey Warning: removing conditional require rule(s) (requiredIfNot) due to 'default' or 'creator' being defined\n-----"
          )
      })
  })
  it('builds a model and disregards conditional require because of creator', () => {
    stub = sinon.stub(console, 'log')
    obey.creator('foo-namer', () => 'FOO')
    const testModel = obey.model(modelFixtures.conditionalWithCreator)
    const testData = {
      lname: 'Bar'
    }
    return testModel.validate(testData)
      .then(data => {
        expect(data).to.deep.equal({
          fname: 'FOO',
          lname: 'Bar'
        })
        expect(stub)
          .calledWith(
            "-----\nObey Warning: removing conditional require rule(s) (requiredIf) due to 'default' or 'creator' being defined\n-----"
          )
      })
  })
  it('does not allow empty predefined type value without `empty` rule', () => {
    const testModel = obey.model(modelFixtures.requiredPredefined)
    const testData = { zip: '' }
    return testModel.validate(testData)
      .catch(err => {
        expect(err.message).to.equal('zip (): Value must be a valid US zip code')
      })
  })
})
