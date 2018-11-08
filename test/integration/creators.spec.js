/* global describe, it, expect, afterEach */
const obey = require('src/index')
const creators = require('src/creators')
const modelFixtures = require('test/fixtures/creators')

describe('integration:creators', () => {
  afterEach(() => {
    creators.lib = {}
  })
  describe('synchronous', () => {
    it('creates a value synchronously when property has no value', () => {
      const testModel = obey.model(modelFixtures.synchronous)
      obey.creator('syncCreator', () => 'foo')
      return testModel.validate({}).then(res => {
        expect(res.name).to.equal('foo')
      })
    })
  })
  describe('asynchronous', () => {
    it('creates a value asynchronously when property has no value', () => {
      const testModel = obey.model(modelFixtures.asynchronous)
      obey.creator('asyncCreator', () => {
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
