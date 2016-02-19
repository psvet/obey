/* global describe, it, expect */
import obey from 'src/index'
import modelFixtures from 'test/fixtures/models'
import ValidationError from 'src/lib/error'

describe('integration', () => {
  describe('basic', () => {
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
  })
})
