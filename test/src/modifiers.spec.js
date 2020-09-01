const modifiers = require('src/modifiers')

describe('modifiers', () => {
  afterEach(() => {
    modifiers.lib = {}
  })
  describe('execute', () => {
    it('runs modifier function and returns modified value if exists', () => {
      modifiers.add('test', (val) => val.toUpperCase())
      const actual = modifiers.execute({ modifier: 'test' }, 'foo')
      expect(actual).toEqual('FOO')
    })
    it('throws an error if the modifier does not exist', () => {
      expect(modifiers.execute.bind(null, { modifier: 'nope' })).toThrow('Modifier \'nope\' does not exist')
    })
  })
  describe('add', () => {
    it('adds a new modifier to the lib', () => {
      modifiers.add('test', () => 'foo')
      expect(modifiers.lib).toHaveProperty('test', expect.any(Function))
    })
    it('throws an error if the modifier name is not a string', () => {
      expect(modifiers.add.bind(null, true, () => 'foo')).toThrow('Modifier name should be a string')
    })
    it('throws an error if the modifier method is not a function', () => {
      expect(modifiers.add.bind(null, 'foo', undefined)).toThrow('Modifier method should be a function')
    })
  })
})
