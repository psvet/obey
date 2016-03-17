export default {
  default: {
    name: { type: 'string', default: 'foo' }
  },
  allow: {
    name: { type: 'string', allow: [ 'foo', 'bar' ] }
  },
  allowNull: {
    name: { type: 'string', allowNull: true },
    email: { type: 'email', allowNull: true },
    phone: { type: 'phone' }
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
