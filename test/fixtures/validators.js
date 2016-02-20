export default {
  default: {
    name: { type: 'string', default: 'foo' }
  },
  allow: {
    name: { type: 'string', allow: [ 'foo', 'bar' ] }
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
