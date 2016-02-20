export default {
  default: {
    name: { type: 'string', default: 'foo' }
  },
  allowed: {
    name: { type: 'string', allowed: [ 'foo', 'bar' ] }
  },
  min: {
    name: { type: 'string', min: 10 }
  },
  max: {
    name: { type: 'string', max: 5 }
  },
  required: {
    name: { type: 'string', required: true }
  }
}
