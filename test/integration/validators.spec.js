/* global describe, it, expect */
import obey from 'src/index'
import modelFixtures from 'test/fixtures/validators'

describe('integration:validators', () => {
  describe('default', () => {
    it('builds a model and returns object with a default value set', () => {
      const testModel = obey.model(modelFixtures.basicDefault)
      const testData = {}
      return testModel.validate(testData).then(res => {
        expect(res.name).to.equal('foo')
      })
    })
  })
})
