/* global describe, it, expect, sinon */
const zip = require('src/typeStrategies/zip')

describe('type:zip', () => {
  it('calls context.fail if value is not a valid US zip code', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    zip.default(context)
    expect(context.fail).to.be.calledWith('Value must be a valid US zip code')
  })
  it('calls context.fail if value is empty (US)', () => {
    const context = {
      value: '',
      fail: sinon.spy()
    }
    zip.default(context)
    expect(context.fail).to.be.calledWith('Value must be a valid US zip code')
  })
  it('does not call context fail if value is a valid zip code', () => {
    const context = {
      value: '61029',
      fail: sinon.spy()
    }
    zip.default(context)
    expect(context.fail).to.not.be.called
  })
  it('calls context.fail if value is not a valid CA zip code', () => {
    const context = {
      value: 'foo',
      fail: sinon.spy()
    }
    zip.ca(context)
    expect(context.fail).to.be.calledWith('Value must be a valid Canadian zip code')
  })
  it('calls context.fail if value is empty (CA)', () => {
    const context = {
      value: '',
      fail: sinon.spy()
    }
    zip.ca(context)
    expect(context.fail).to.be.calledWith('Value must be a valid Canadian zip code')
  })
  it('does not call context fail if value is a valid US zip code', () => {
    const context = {
      value: 'A1A 1A1',
      fail: sinon.spy()
    }
    zip.ca(context)
    expect(context.fail).to.not.be.called
  })
})
