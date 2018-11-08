/* global describe, it, expect, afterEach */
const obey = require('src/index')
const modifiers = require('src/modifiers')
const modelFixtures = require('test/fixtures/modifiers')

describe('integration:modifiers', () => {
  afterEach(() => {
    modifiers.lib = {}
  })
  describe('synchronous', () => {
    it('modifies a value synchronously when property has no value', () => {
      const testModel = obey.model(modelFixtures.synchronous)
      obey.modifier('syncModifier', (val) => `${val}_CHANGED`)
      return testModel.validate({ name: 'foo' }).then(res => {
        expect(res.name).to.equal('foo_CHANGED')
      })
    })
  })
  describe('asynchronous', () => {
    it('modifies a value asynchronously when property has no value', () => {
      const testModel = obey.model(modelFixtures.asynchronous)
      obey.modifier('asyncModifier', (val) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(`${val}_CHANGED`), 300)
        })
      })
      return testModel.validate({ name: 'foo' }).then(res => {
        expect(res.name).to.equal('foo_CHANGED')
      })
    })
  })
})
