export default {
  basic: {
    name: { type: 'string', required: true }
  },
  missingType: {
    name: { required: true }
  },
  basicRequired: {
    fname: { type: 'string' },
    lname: { type: 'string', required: true }
  },
  basicExtended: {
    fname: { type: 'string', required: true, min: 2, max: 20 },
    lname: { type: 'string', min: 2, max: 20 },
    type: { type: 'string', allowed: [ 'foo', 'bar' ] }
  },
  basicNested: {
    name: { type: 'string' },
    someobj: { type: 'object', keys: {
      foo: { type: 'string' }
    }}
  },
  basicEmpty: {
    name: { type: 'string', empty: true }
  },
  basicNoEmpty: {
    name: { type: 'string' }
  },
  basicEmptyArray: {
    names: { type: 'array', empty: true }
  },
  basicNoEmptyArray: {
    names: { type: 'array' }
  }
}
