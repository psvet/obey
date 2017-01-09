export default {
  basic: {
    name: { type: 'string', required: true }
  },
  missingType: {
    name: { required: true }
  },
  basicRequired: {
    fname: { type: 'string' },
    lname: { type: 'string', require: true }
  },
  basicExtended: {
    fname: { type: 'string', required: true, min: 2, max: 20 },
    lname: { type: 'string', min: 2, max: 20 },
    type: { type: 'string', requiredIf: 'nested.foo', allowed: [ 'foo', 'bar' ] },
    nested: { type: 'object', values: { type: 'string' } }
  },
  basicCreator: {
    foo: { type: 'string', creator: 'testCreator' },
    bar: { type: 'string' }
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
