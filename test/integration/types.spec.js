/* global describe, it, expect */
import obey from 'src/index'
import modelFixtures from 'test/fixtures/types'

describe('integration:types', () => {
  describe('array', () => {
    it('fails when value is not an array', () => {
      const testModel = obey.model(modelFixtures.array)
      const testData = { name: 'foo' }
      return testModel.validate(testData).catch(err => {
        expect(err.message).to.equal('name (foo): Value must be an array')
      })
    })
    it('passes when value is an array', () => {
      const testModel = obey.model(modelFixtures.array)
      const testData = { name: [ 'foo' ] }
      return testModel.validate(testData).then(res => {
        expect(res).to.deep.equal(testData)
      })
    })
  })
  describe('boolean', () => {
    it('fails when value is not a boolean', () => {
      const testModel = obey.model(modelFixtures.boolean)
      const testData = { name: 'foo' }
      return testModel.validate(testData).catch(err => {
        expect(err.message).to.equal('name (foo): Value must be a boolean')
      })
    })
    it('passes when value is a boolean', () => {
      const testModel = obey.model(modelFixtures.boolean)
      const testData = { name: true }
      return testModel.validate(testData).then(res => {
        expect(res).to.deep.equal(testData)
      })
    })
  })
  describe('null', () => {
    it('fails when value is not null', () => {
      const testModel = obey.model(modelFixtures.null)
      const testData = { name: 'foo' }
      return testModel.validate(testData).catch(err => {
        expect(err.message).to.equal('name (foo): Value must be null')
      })
    })
    it('passes when value is null', () => {
      const testModel = obey.model(modelFixtures.null)
      const testData = { name: null }
      return testModel.validate(testData).then(res => {
        expect(res).to.deep.equal(testData)
      })
    })
  })
  describe('number', () => {
    it('fails when value is not a number', () => {
      const testModel = obey.model(modelFixtures.number)
      const testData = { name: 'foo' }
      return testModel.validate(testData).catch(err => {
        expect(err.message).to.equal('name (foo): Value must be a number')
      })
    })
    it('passes when value is an array', () => {
      const testModel = obey.model(modelFixtures.number)
      const testData = { name: 73 }
      return testModel.validate(testData).then(res => {
        expect(res).to.deep.equal(testData)
      })
    })
  })
  describe('object', () => {
    it('fails when value is not an object', () => {
      const testModel = obey.model(modelFixtures.object)
      const testData = { name: 'foo' }
      return testModel.validate(testData).catch(err => {
        expect(err.message).to.equal('name (foo): Value must be an object')
      })
    })
    it('passes when value is an object', () => {
      const testModel = obey.model(modelFixtures.object)
      const testData = { name: { foo: 'bar' } }
      return testModel.validate(testData).then(res => {
        expect(res).to.deep.equal(testData)
      })
    })
  })
  describe('string', () => {
    it('fails when value is not a string', () => {
      const testModel = obey.model(modelFixtures.string)
      const testData = { name: 123 }
      return testModel.validate(testData).catch(err => {
        expect(err.message).to.equal('name (123): Value must be a string')
      })
    })
    it('passes when value is a string', () => {
      const testModel = obey.model(modelFixtures.string)
      const testData = { name: 'bar' }
      return testModel.validate(testData).then(res => {
        expect(res).to.deep.equal(testData)
      })
    })
  })
  describe('undefined', () => {
    it('fails when value is not undefined', () => {
      const testModel = obey.model(modelFixtures.undefined)
      const testData = { name: 'foo' }
      return testModel.validate(testData).catch(err => {
        expect(err.message).to.equal('name (foo): Value must be undefined')
      })
    })
    it('passes when value is an object', () => {
      const testModel = obey.model(modelFixtures.undefined)
      const testData = { name: undefined }
      return testModel.validate(testData).then(res => {
        expect(res).to.deep.equal(testData)
      })
    })
  })
})
