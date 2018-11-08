/* global describe, it, expect */
const any = require('src/typeStrategies/any')

describe('type:any', () => {
  it('passes through (via return) the value', () => {
    const context = {
      value: 'anything'
    }
    expect(any.default(context)).to.equal('anything')
  })
})
