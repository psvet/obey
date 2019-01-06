// Import all strategies
const any = require('./any')
const array = require('./array')
const boolean = require('./boolean')
const email = require('./email')
const ip = require('./ip')
const number = require('./number')
const object = require('./object')
const phone = require('./phone')
const string = require('./string')
const url = require('./url')
const uuid = require('./uuid')
const zip = require('./zip')

// Export object with all built-in strategies
module.exports = {
  any,
  array,
  boolean,
  email,
  ip,
  number,
  object,
  phone,
  string,
  url,
  uuid,
  zip
}

