/*
 * Copyright (c) 2015 TechnologyAdvice
 */
import types from './types'
import modifiers from './modifiers'
import generators from './generators'
import Promise from 'bluebird'
import validators from './lib/validators'
import ValidationError from './lib/error'

const rules = {
  /**
   * Acts as validation setup for, and respective order of operations
   * of, properties for a def-prop configuration
   */
  props: [
    { name: 'generator', fn: generators.validator },
    { name: 'default', fn: validators.default },
    { name: 'modifier', fn: modifiers.validator },
    { name: 'allow', fn: validators.allow },
    { name: 'min', fn: validators.min },
    { name: 'max', fn: validators.max },
    { name: 'type', fn: types.validator }
  ],

  applyProps: (def, value) => {
    let applyProps = []
    // Not required and undefined, only return generator and default
    if (!def.required && value === undefined) {
      rules.props.forEach(prop => {
        if (prop.name === 'generator' || prop.name === 'default') applyProps.push(prop)
      })
      return applyProps
    }
    // Return all
    return rules.props
  },

  /**
   * Binds rule definition in validate method
   * @param {Object} def The rule definition object
   */
  makeValidate: def => rules.validate.bind(null, def),

  /**
   * Processes definition validation
   * @param {Object} def The rule definition object
   * @param {*} data The data to validate
   * @param {String} (key) Key for tracking parent in nested iterations
   */
  validate: (def, data, key = null) => {
    const context = { errors: [] }
    if (!def.type) throw new Error('Model properties must define a \'type\'')
    let chain = Promise.resolve(data)
    rules.applyProps(def, data).forEach(prop => {
      if (def[prop.name]) {
        chain = chain.then(prop.fn.bind(context, def, key)).then(res => {
          return res === undefined ? data : res
        })
      }
    })
    return chain.then(res => {
      if (context.errors.length > 0) throw new ValidationError(context.errors)
      return res
    })
  },

  /**
   * Adds new rule
   * @param {Object} def The rule definition
   * @returns {Object}
   */
  build: def => {
    return {
      def,
      validate: rules.makeValidate(def)
    }
  }
}

export default rules
