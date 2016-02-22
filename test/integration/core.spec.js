/* global describe, it, expect */
import obey from 'src/index'
import modelFixtures from 'test/fixtures/core'
import ValidationError from 'src/lib/error'

describe('integration:core', () => {
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
      type: 'foo'
    }
    return testModel.validate(testData).catch(e => {
      expect(e).to.be.instanceOf(ValidationError)
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
    return testModel.validate(testData).catch(err => {
      expect(err.collection).to.deep.equal([
        { key: 'name', value: true, message: 'Value must be a string' },
        { key: 'someobj.foo', value: 5, message: 'Value must be a string' }
      ])
    })
  })
})
