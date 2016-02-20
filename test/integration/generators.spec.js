/* global describe, it, expect */
import obey from 'src/index'
import modelFixtures from 'test/fixtures/generators'

describe('integration:generators', () => {
  describe('synchronous', () => {
    it('generates a value synchronously when property has no value', () => {
      const testModel = obey.model(modelFixtures.synchronous)
      obey.generator('syncGenerator', () => 'foo')
      return testModel.validate({}).then(res => {
        expect(res.name).to.equal('foo')
      })
    })
  })
  describe('asynchronous', () => {
    it('generates a value asynchronously when property has no value', () => {
      const testModel = obey.model(modelFixtures.asynchronous)
      obey.generator('asyncGenerator', () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve('foo'), 300)
        })
      })
      return testModel.validate({}).then(res => {
        expect(res.name).to.equal('foo')
      })
    })
  })
})
