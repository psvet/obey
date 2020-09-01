const creators = require('src/creators')

describe('creators', () => {
  afterEach(() => {
    creators.lib = {}
  })
  describe('execute', () => {
    it('returns the original value if defined', () => {
      const actual = creators.execute({}, 'bar')
      expect(actual).toEqual('bar')
    })
    it('runs creator and returns created value if exists', () => {
      creators.add('test', () => 'foo')
      const actual = creators.execute({ creator: 'test' })
      expect(actual).toEqual('foo')
    })
    it('throws an error if the creator does not exist', () => {
      expect(creators.execute.bind(null, { creator: 'nope'})).toThrow('creator \'nope\' does not exist')
    })
  })
  describe('add', () => {
    it('adds a new creator to the lib', () => {
      creators.add('test', () => 'foo')
      expect(creators.lib).toHaveProperty('test', expect.any(Function))
    })
    it('throws an error if the creator name is not a string', () => {
      expect(creators.add.bind(null, true, () => 'foo')).toThrow('creator name should be a string')
    })
    it('throws an error if the creator method is not a function', () => {
      expect(creators.add.bind(null, 'foo', undefined)).toThrow('creator method should be a function')
    })
  })
})
