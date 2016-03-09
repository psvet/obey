/* global describe, it, expect, afterEach */
import creators from 'src/creators'

describe('creators', () => {
  afterEach(() => {
    creators.lib = {}
  })
  describe('execute', () => {
    it('returns the original value if defined', () => {
      const actual = creators.execute({}, 'foo', 'bar')
      expect(actual).to.equal('bar')
    })
    it('returns the modifier method if exists', () => {
      creators.add('test', () => 'foo')
      const actual = creators.execute({ creator: 'test' }, 'foo')
      expect(actual).to.be.a.function
    })
    it('throws an error if the creator does not exist', () => {
      expect(creators.execute.bind(null, { creator: 'nope'})).to.throw('creator \'nope\' does not exist')
    })
  })
  describe('add', () => {
    it('adds a new creator to the lib', () => {
      creators.add('test', () => 'foo')
      expect(creators.lib).to.have.property('test')
      expect(creators.lib.test).to.be.a.function
    })
    it('throws an error if the creator name is not a string', () => {
      expect(creators.add.bind(null, true, () => 'foo')).to.throw('creator name should be a string')
    })
    it('throws an error if the creator method is not a function', () => {
      expect(creators.add.bind(null, 'foo', undefined)).to.throw('creator method should be a function')
    })
  })
})
