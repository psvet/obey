/*
 * Copyright (c) 2015 TechnologyAdvice
 */

/**
 * Creators allow for methods which create values during validation when a
 * value is not supplied
 * @namespace creators
 */
const creators = {
  /**
   * @memberof creators
   * @property {Object} Library of creators
   */
  lib: {},

  /**
   * Execute method calls the appropriate creator and returns the method or
   * throws and error if the creator does not exist
   * @memberof creators
   * @param {Object} def The property configuration
   * @param {*} value The value being validated
   * @returns {function} The return value of the creator function
   */
  execute: function(def, value) {
    if (value !== undefined) return value
    if (creators.lib[def.creator]) return creators.lib[def.creator]()
    throw new Error(`creator '${def.creator}' does not exist`)
  },

  /**
   * Adds a creator to the library
   * @memberof creators
   * @param {string} name The name of the creator
   * @param {function} fn The creator's method
   */
  add: (name, fn) => {
    if (typeof name !== 'string') throw new Error('creator name should be a string')
    if (typeof fn !== 'function') throw new Error('creator method should be a function')
    creators.lib[name] = fn
  }
}

module.exports = creators
