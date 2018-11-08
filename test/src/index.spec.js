/* global expect, sinon, describe, it, before, after */
const _ = require('lodash')
const obey = require('src/index')
const rules = require('src/rules')
const types = require('src/types')
const modifiers = require('src/modifiers')
const creators = require('src/creators')

describe('obey', () => {
  describe('rule', () => {
    before(() => sinon.spy(rules, 'build'))
    after(() => { rules.build.restore })
    it('creates a composed rule based on def configuration', () => {
      obey.rule({})
      expect(rules.build).to.be.calledWith({})
    })
  })
  describe('model', () => {
    after(() => { rules.build.restore })
    it('creates a composed model based on def configuration', () => {
      obey.model({})
      expect(rules.build).to.be.calledWith({ type: 'object', keys: {}, strict: true })
    })
    it('creates a composed model based on def config with strict set to false', () => {
      obey.model({}, false)
      expect(rules.build).to.be.calledWith({ type: 'object', keys: {}, strict: false })
    })
  })
  describe('type', () => {
    before(() => sinon.spy(types, 'add'))
    after(() => { types.add.restore() })
    it('adds or overrides a type definition in the obey library', () => {
      obey.type('tester', /^([a-z])*$/)
      expect(types.add).to.be.called
    })
  })
  describe('modifier', () => {
    before(() => sinon.spy(modifiers, 'add'))
    after(() => { modifiers.add.restore() })
    it('adds a new modifier to the obey library', () => {
      obey.modifier('name', () => _.noop())
      expect(modifiers.add).to.be.called
    })
  })
  describe('creator', () => {
    before(() => sinon.spy(creators, 'add'))
    after(() => { creators.add.restore() })
    it('adds a new creator to the obey library', () => {
      obey.creator('name', () => _.noop())
      expect(creators.add).to.be.called
    })
  })
})
