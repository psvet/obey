/* global describe, it, expect */
const ValidationError = require('src/lib/error')

describe('ValidationError', () => {
  it('inherits from Error', () => {
    expect(new ValidationError([])).to.be.instanceOf(Error)
  })
  it('creates a new instance of ValidationError', () => {
    expect(new ValidationError([])).to.be.instanceOf(ValidationError)
  })
  it('contains stack property', () => {
    expect(new ValidationError([])).to.have.property('stack')
  })
  it('creates an error without a key if key is not present', () => {
    const origError = [
      { value: 'foo', message: 'Not cool, bro' }
    ]
    const err = new ValidationError(origError)
    expect(err.message).to.equal('foo: Not cool, bro')
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
  it('does not include ValidationError on stack', () => {
    const sampleError = [
        { value: 'bar', message: 'Not ok'}
    ]
    const err = new ValidationError(sampleError)
    expect(err.stack).to.not.contain('error.js')
  })
})
