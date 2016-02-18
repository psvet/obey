/* global describe, it, expect */
import models from 'src/models'
import modelFixtures from 'test/fixtures/models'

describe('models', () => {
  describe('makeValidate', () => {
    // where to begin?
  })
  describe('build', () => {
    it('returns a new object with the schema and validate method', () => {
      const actual = models.build(modelFixtures.basic)
      expect(actual).to.be.an.object
      expect(actual).to.have.property('schema')
      expect(actual).to.have.property('validate')
    })
  })
})
