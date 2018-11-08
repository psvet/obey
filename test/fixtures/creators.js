module.exports = {
  synchronous: {
    name: { type: 'string', creator: 'syncCreator' }
  },
  asynchronous: {
    name: { type: 'string', creator: 'asyncCreator' }
  }
}
