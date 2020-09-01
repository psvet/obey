const uuid = require('src/typeStrategies/uuid')

describe('type:uuid', () => {
  describe('default', () => {
    it('calls context.fail if type is not a valid UUID', () => {
      const context = {
        value: 'foo',
        fail: jest.fn()
      }
      uuid.default(context)
      expect(context.fail).toHaveBeenCalledWith('Value must be a valid UUID')
    })
    it('calls context.fail if type is empty', () => {
      const context = {
        value: '',
        fail: jest.fn()
      }
      uuid.default(context)
      expect(context.fail).toHaveBeenCalledWith('Value must be a valid UUID')
    })
    it('does not call context.fail if type is a valid UUID', () => {
      const context = {
        value: 'ef3d56e1-6046-4743-aa69-b94bc9e66181',
        fail: jest.fn()
      }
      uuid.default(context)
      expect(context.fail).not.toHaveBeenCalled()
    })
    it('allows uppercase characters', () => {
      const context = {
        value: 'EF3D56E1-6046-4743-AA69-B94BC9E66181',
        fail: jest.fn()
      }
      uuid.default(context)
      expect(context.fail).not.toHaveBeenCalled()
    })
  })
  describe('upper', () => {
    it('calls context.fail if type is not a valid UUID', () => {
      const context = {
        value: 'foo',
        fail: jest.fn()
      }
      uuid.upper(context)
      expect(context.fail).toHaveBeenCalledWith('Value must be a valid UUID with all uppercase letters')
    })
    it('calls context.fail if type is empty', () => {
      const context = {
        value: '',
        fail: jest.fn()
      }
      uuid.upper(context)
      expect(context.fail).toHaveBeenCalledWith('Value must be a valid UUID with all uppercase letters')
    })
    it('does not call context.fail if type is a valid uppercase UUID', () => {
      const context = {
        value: 'EF3D56E1-6046-4743-AA69-B94BC9E66181',
        fail: jest.fn()
      }
      uuid.upper(context)
      expect(context.fail).not.toHaveBeenCalled()
    })
    it('calls context.fail if type is not an uppercase UUID', () => {
      const context = {
        value: 'ef3d56e1-6046-4743-aa69-b94bc9e66181',
        fail: jest.fn()
      }
      uuid.upper(context)
      expect(context.fail).toHaveBeenCalledWith('Value must be a valid UUID with all uppercase letters')
    })
  })
  describe('lower', () => {
    it('calls context.fail if type is not a valid UUID', () => {
      const context = {
        value: 'foo',
        fail: jest.fn()
      }
      uuid.lower(context)
      expect(context.fail).toHaveBeenCalledWith('Value must be a valid UUID with all lowercase letters')
    })
    it('calls context.fail if type is empty', () => {
      const context = {
        value: '',
        fail: jest.fn()
      }
      uuid.lower(context)
      expect(context.fail).toHaveBeenCalledWith('Value must be a valid UUID with all lowercase letters')
    })
    it('does not call context.fail if type is a valid lowercase UUID', () => {
      const context = {
        value: 'ef3d56e1-6046-4743-aa69-b94bc9e66181',
        fail: jest.fn()
      }
      uuid.lower(context)
      expect(context.fail).not.toHaveBeenCalled()
    })
    it('calls context.fail if type is not a lowercase UUID', () => {
      const context = {
        value: 'EF3D56E1-6046-4743-AA69-B94BC9E66181',
        fail: jest.fn()
      }
      uuid.lower(context)
      expect(context.fail).toHaveBeenCalledWith('Value must be a valid UUID with all lowercase letters')
    })
  })
})
