const _ = require('lodash')
const obey = require('src/index')
const rules = require('src/rules')
const types = require('src/types')
const modifiers = require('src/modifiers')
const creators = require('src/creators')

describe('obey', () => {
  describe('rule', () => {
    beforeEach(() => jest.spyOn(rules, 'build'))
    afterEach(() => { rules.build.mockReset() })
    it('creates a composed rule based on def configuration', () => {
      obey.rule({})
      expect(rules.build).toHaveBeenCalledWith({})
    })
  })
  describe('model', () => {
    it('creates a composed model based on def configuration', () => {
      obey.model({})
      expect(rules.build).toHaveBeenCalledWith({ type: 'object', keys: {}, strict: true })
    })
    it('creates a composed model based on def config with strict set to false', () => {
      obey.model({}, false)
      expect(rules.build).toHaveBeenCalledWith({ type: 'object', keys: {}, strict: false })
    })
  })
  describe('type', () => {
    beforeEach(() => jest.spyOn(types, 'add'))
    afterEach(() => { types.add.mockReset() })
    it('adds or overrides a type definition in the obey library', () => {
      obey.type('tester', /^([a-z])*$/)
      expect(types.add).toHaveBeenCalled()
    })
  })
  describe('modifier', () => {
    beforeEach(() => jest.spyOn(modifiers, 'add'))
    afterEach(() => { modifiers.add.mockReset() })
    it('adds a new modifier to the obey library', () => {
      obey.modifier('name', () => _.noop())
      expect(modifiers.add).toHaveBeenCalled()
    })
  })
  describe('creator', () => {
    beforeEach(() => jest.spyOn(creators, 'add'))
    afterEach(() => { creators.add.mockReset() })
    it('adds a new creator to the obey library', () => {
      obey.creator('name', () => _.noop())
      expect(creators.add).toHaveBeenCalled()
    })
  })
})
