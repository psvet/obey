import path from 'path'
import chai from 'chai'
import module from 'module'
global.expect = chai.expect

// Allow import relative to root
process.env.NODE_PATH = path.join(__dirname, '..') + path.delimiter + (process.env.NODE_PATH || '')
module._initPaths()
