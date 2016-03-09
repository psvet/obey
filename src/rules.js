/*
 * Copyright (c) 2015 TechnologyAdvice
 */
import types from './types'
import modifiers from './modifiers'
import generators from './generators'
import Promise from 'bluebird'
import validators from './lib/validators'
import ValidationError from './lib/error'

/**
 * @memberof rules
 * Defines all definition property checks available
 */
const allProps = {
  generator: { name: 'generator', fn: generators.execute },
  default: { name: 'default', fn: validators.default },
  modifier: { name: 'modifier', fn: modifiers.execute },
  allow: { name: 'allow', fn: validators.allow },
  min: { name: 'min', fn: validators.min },
  max: { name: 'max', fn: validators.max },
  type: { name: 'type', fn: types.validate }
}

/**
 * Rules is responsible for determining the execution of schema definition
 * properties during validation
 * @namespace rules
 */
const rules = {
  /**
   * @memberof rules
   * @property {Object} Validation property setup and order of operations
   */
  props: {
    // Default props
    default: [
      allProps.generator,
      allProps.default,
      allProps.modifier,
      allProps.allow,
      allProps.min,
      allProps.max,
      allProps.type
    ],
    // When no value/undefined
    noVal: [
      allProps.generator,
      allProps.default,
      allProps.modifier
    ]
  },

  /**
   * Binds rule definition in validate method
   * @memberof rules
   * @param {Object} def The rule definition object
   */
  makeValidate: def => rules.validate.bind(null, def),

  /**
   * Processes definition validation
   * @memberof rules
   * @param {Object} def The rule definition object
   * @param {*} data The data to validate
   * @param {String} (key) Key for tracking parent in nested iterations
   */
  validate: (def, data, key = null) => {
    const context = { errors: [] }
    const props = !def.required && data === undefined ? rules.props.noVal : rules.props.default
    if (!def.type) throw new Error('Model properties must define a \'type\'')
    let chain = Promise.resolve(data)
    props.forEach(prop => {
      if (def.hasOwnProperty(prop.name)) {
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
   * @memberof rules
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
