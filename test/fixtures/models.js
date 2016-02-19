export default {
  // Basic, small schema
  basic: {
    name: { type: 'string', required: true }
  },
  // Schema with property missing type
  missingType: {
    name: { required: true }
  },
  // Integration test, single level
  basicExtended: {
    fname: { type: 'string', required: true, min: 2, max: 20 },
    lname: { type: 'string', required: true, min: 2, max: 20 },
    type: { type: 'string', allowed: [ 'foo', 'bar' ] }
  },
  basicDefault: {
    name: { type: 'string', default: 'foo' }
  },
  basicNested: {
    name: { type: 'string' },
    someobj: { type: 'object', keys: {
      foo: { type: 'string' }
    }}
  },
  // Test with generator
  synchronousGenerator: {
    name: { type: 'string', generator: 'genFoo' }
  }
}
