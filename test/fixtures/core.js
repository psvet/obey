export default {
  basic: {
    name: { type: 'string', required: true }
  },
  missingType: {
    name: { required: true }
  },
  basicExtended: {
    fname: { type: 'string', required: true, min: 2, max: 20 },
    lname: { type: 'string', required: true, min: 2, max: 20 },
    type: { type: 'string', allowed: [ 'foo', 'bar' ] }
  },
  basicNested: {
    name: { type: 'string' },
    someobj: { type: 'object', keys: {
      foo: { type: 'string' }
    }}
  }
}
