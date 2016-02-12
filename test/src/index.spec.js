/* global expect sinon */
import _ from 'lodash'
import obey from 'src/index'
import model from 'src/model'
import rules from 'src/rules'
import modifiers from 'src/modifiers'
import generators from 'src/generators'

describe('obey', () => {
  describe('model', () => {
    before(() => sinon.spy(model, 'build'))
    after(() => { model.build.restore() })
    it('creates a composed model based on schema configuration', () => {
      obey.model({})
      expect(model.build).to.be.called
    })
  })
  describe('rule', () => {
    before(() => sinon.spy(rules, 'add'))
    after(() => { rules.add.restore() })
    it('adds a new rule to the obey library', () => {
      obey.rule('name', () => _.noop())
      expect(rules.add).to.be.called
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
