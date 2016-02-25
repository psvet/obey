/* global expect, sinon, describe, it, before, after */
import _ from 'lodash'
import obey from 'src/index'
import rules from 'src/rules'
import types from 'src/types'
import modifiers from 'src/modifiers'
import generators from 'src/generators'

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
      expect(rules.build).to.be.calledWith({ type: 'object', keys: {} })
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
  describe('generator', () => {
    before(() => sinon.spy(generators, 'add'))
    after(() => { generators.add.restore() })
    it('adds a new generator to the obey library', () => {
      obey.generator('name', () => _.noop())
      expect(generators.add).to.be.called
    })
  })
})
