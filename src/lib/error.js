/*
 * Copyright (c) 2015 TechnologyAdvice
 */

const getMessages = (msgObjs) => {
  const messages = []
  msgObjs.forEach(obj => {
    messages.push(`${obj.key} (${obj.value}): ${obj.message}`)
  })
  return messages
}

function ValidationError(message, messages, msgObjs) {
  Object.defineProperty(this, 'name', {value: 'ValidationError'})
  Object.defineProperty(this, 'messageObj', {value: msgObjs})
  Object.defineProperty(this, 'messages', {value: messages || getMessages(msgObjs)})
  Object.defineProperty(this, 'message', {value: message || this.messages.join('\n')})
  Error.captureStackTrace(this, this.name)
}
ValidationError.prototype = Object.create(Error.prototype)
ValidationError.prototype.constructor = ValidationError

export default ValidationError
