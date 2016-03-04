/* global describe, it, expect */
import any from 'src/types/any'

describe('type:any', () => {
  it('passes through (via return) the value', () => {
    const context = {
      value: 'anything'
    }
    expect(any.default(context)).to.equal('anything')
  })
})
