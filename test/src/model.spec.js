/* global describe, it, expect */
import models from 'src/models'
import modelFixtures from 'test/fixtures/core'

describe('models', () => {
  describe('makeValidate', () => {
    it('builds a validate function with a basic configuration', () => {
      const actual = models.makeValidate(modelFixtures.basic)
      expect(actual).to.be.a.function
    })
    it('throws an error if model property is missing type', () => {
      expect(models.makeValidate(modelFixtures.missingType)).to.throw('Model properties must define a \'type\'')
    })
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
