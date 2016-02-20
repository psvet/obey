/* global describe, it, expect */
import obey from 'src/index'
import modelFixtures from 'test/fixtures/validators'

describe('integration:validators', () => {
  describe('default', () => {
    it('builds a model and returns object with a default value set', () => {
      const testModel = obey.model(modelFixtures.default)
      const testData = {}
      return testModel.validate(testData).then(res => {
        expect(res.name).to.equal('foo')
      })
    })
  })
  describe('allowed', () => {
    it('builds a model and fails validation due to value not being allowed', () => {
      const testModel = obey.model(modelFixtures.allowed)
      const testData = { name: 'quz' }
      return testModel.validate(testData).catch(err => {
        expect(err.collection).to.deep.equal([{
          key: 'name',
          value: 'quz',
          message: 'Value \'quz\' is not allowed'
        }])
      })
    })
  })
  describe('min', () => {
    it('builds a model and fails validation because value is less than min', () => {
      const testModel = obey.model(modelFixtures.min)
      const testData = { name: 'foo' }
      return testModel.validate(testData).catch(err => {
        expect(err.collection).to.deep.equal([{
          key: 'name',
          value: 'foo',
          message: 'Length must be greater than 10'
        }])
      })
    })
  })
  describe('max', () => {
    it('builds a model and fails validation because value is greater than max', () => {
      const testModel = obey.model(modelFixtures.max)
      const testData = { name: 'foobarrrrr' }
      return testModel.validate(testData).catch(err => {
        expect(err.collection).to.deep.equal([{
          key: 'name',
          value: 'foobarrrrr',
          message: 'Length must be less than 5'
        }])
      })
    })
  })
  describe('required', () => {
    it('builds a model and fails validation because value is required', () => {
      const testModel = obey.model(modelFixtures.required)
      const testData = {}
      return testModel.validate(testData).catch(err => {
        expect(err.collection).to.deep.equal([{
          key: 'name',
          value: undefined,
          message: 'Value must be a string'
        }, {
          key: 'name',
          value: undefined,
          message: 'Property \'name\' is required'
        }])
      })
    })
  })
})
