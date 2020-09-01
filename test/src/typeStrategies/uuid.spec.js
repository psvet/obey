const uuid = require('src/typeStrategies/uuid')

describe('type:uuid', () => {
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
})
