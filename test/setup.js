/* global expect sinon */
const path = require('path')
const chai = require('chai')
const chaiaspromised = require('chai-as-promised')
const sinon = require('sinon')
const schai = require('sinon-chai')
const mod = require('module')
global.sinon = sinon
global.expect = chai.expect
chai.use(schai)
chai.use(chaiaspromised)

// Allow import relative to root
process.env.NODE_PATH = path.join(__dirname, '..') + path.delimiter + (process.env.NODE_PATH || '')
mod._initPaths()
