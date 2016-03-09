/* global describe, it, expect, afterEach */
import generators from 'src/generators'

describe('generators', () => {
  afterEach(() => {
    generators.lib = {}
  })
  describe('execute', () => {
    it('returns the original value if defined', () => {
      const actual = generators.execute({}, 'foo', 'bar')
      expect(actual).to.equal('bar')
    })
    it('returns the modifier method if exists', () => {
      generators.add('test', () => 'foo')
      const actual = generators.execute({ generator: 'test' }, 'foo')
      expect(actual).to.be.a.function
    })
    it('throws an error if the generator does not exist', () => {
      expect(generators.execute.bind(null, { generator: 'nope'})).to.throw('Generator \'nope\' does not exist')
    })
  })
  describe('add', () => {
    it('adds a new generator to the lib', () => {
      generators.add('test', () => 'foo')
      expect(generators.lib).to.have.property('test')
      expect(generators.lib.test).to.be.a.function
    })
    it('throws an error if the generator name is not a string', () => {
      expect(generators.add.bind(null, true, () => 'foo')).to.throw('Generator name should be a string')
    })
    it('throws an error if the generator method is not a function', () => {
      expect(generators.add.bind(null, 'foo', undefined)).to.throw('Generator method should be a function')
    })
  })
})
