/* global expect sinon */
import path from 'path'
import chai from 'chai'
import chaiaspromised from 'chai-as-promised'
import sinon from 'sinon'
import schai from 'sinon-chai'
import module from 'module'
global.sinon = sinon
global.expect = chai.expect
chai.use(schai)
chai.use(chaiaspromised)

// Allow import relative to root
process.env.NODE_PATH = path.join(__dirname, '..') + path.delimiter + (process.env.NODE_PATH || '')
module._initPaths()
