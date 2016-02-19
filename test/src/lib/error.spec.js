/* global describe, it, expect */
import ValidationError from 'src/lib/error'

describe('ValidationError', () => {
  it('creates a new instance of ValidationError', () => {
    expect(new ValidationError([])).to.be.instanceOf(ValidationError)
  })
  it('contains message and object (raw) properties', () => {
    const origError = [
      { key: 'foo', value: 'bar', message: 'Not ok' },
      { key: 'fizz', value: 'buzz', message: 'Nope' }
    ]
    const err = new ValidationError(origError)
    expect(err.message).to.equal('foo (bar): Not ok\nfizz (buzz): Nope')
    expect(err.collection).to.deep.equal(origError)
  })
})
