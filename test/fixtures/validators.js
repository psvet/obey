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
  },
  requireIf: {
    phone: { type: 'phone' },
    phoneType: { type: 'string', requireIf: 'phone' },
    address: { type: 'object', keys: {
      street: { type: 'string' },
      city: { type: 'string', requireIf: 'address.street' }
    }}
  },
  requireIfNot: {
    address: { type: 'object', keys: {
      street: { type: 'string' },
      state: { type: 'string' },
      country: { type: 'string', requireIfNot: 'address.state' }
    }}
  }
}
