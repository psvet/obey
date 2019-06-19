module.exports = {
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
  allowNullDefault: {
    name: { type: 'string', allowNull: true, default: null },
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
  requiredIf: {
    phone: { type: 'phone' },
    phoneType: { type: 'string', requiredIf: 'phone' },
    address: { type: 'object', keys: {
      street: { type: 'string' },
      city: { type: 'string', requiredIf: 'address.street' }
    }}
  },
  requiredIfNot: {
    address: { type: 'object', keys: {
      street: { type: 'string' },
      state: { type: 'string' },
      country: { type: 'string', requiredIfNot: 'address.state' }
    }}
  },
  jexl: {
    exprVal: { type: 'string', jexl: [{
      expr: "value == root.testVal.nestedObjArray[.name == 'theOne'].payload.treasure"
    }] },
    testVal: {
      type: 'object',
      keys: {
        nestedObjArray: {
          type: 'array',
          values: {
            type: 'object',
            keys: {
              name: { type: 'string' },
              payload: {
                type: 'object',
                keys: {
                  treasure: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  },
  jexlTransform: {
    exprVal: { type: 'string', jexl: [{
      expr: "value|upper == root.testVal.nestedObjArray[.name == 'theOne'].payload.treasure|upper"
    }] },
    testVal: {
      type: 'object',
      keys: {
        nestedObjArray: {
          type: 'array',
          values: {
            type: 'object',
            keys: {
              name: { type: 'string' },
              payload: {
                type: 'object',
                keys: {
                  treasure: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }
}
