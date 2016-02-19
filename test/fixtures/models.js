export default {
  // Basic, small schema
  basic: {
    name: { type: 'string', required: true }
  },
  // Schema with property missing type
  missingType: {
    name: { required: true }
  }
}
