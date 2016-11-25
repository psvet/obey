/*
 * Copyright (c) 2015 TechnologyAdvice
 */
import types from './types'
import modifiers from './modifiers'
import creators from './creators'
import Promise from 'bluebird'
import validators from './lib/validators'
import ValidationError from './lib/error'

/**
 * @memberof rules
 * Defines all definition property checks available
 */
const allProps = {
  creator: { name: 'creator', fn: creators.execute },
  default: { name: 'default', fn: validators.default },
  modifier: { name: 'modifier', fn: modifiers.execute },
  allow: { name: 'allow', fn: validators.allow },
  min: { name: 'min', fn: validators.min },
  max: { name: 'max', fn: validators.max },
  type: { name: 'type', fn: types.validate },
  requireIf: { name: 'requireIf', fn: validators.requireIf },
  requireIfNot: { name: 'requireIfNot', fn: validators.requireIfNot },
  equalTo: { name: 'equalTo', fn: validators.equalTo }
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
      allProps.creator,
      allProps.default,
      allProps.modifier,
      allProps.allow,
      allProps.min,
      allProps.max,
      allProps.type,
      allProps.requireIf,
      allProps.requireIfNot,
      allProps.equalTo
    ],
    // No value/undefined
    noVal: [
      allProps.creator,
      allProps.default,
      allProps.modifier,
      allProps.requireIf,
      allProps.requireIfNot,
      allProps.equalTo
    ],
    // No value, partial
    noValPartial: []
  },

  /**
   * Binds rule definition in validate method
   * @memberof rules
   * @param {Object} def The rule definition object
   */
  makeValidate: def => rules.validate.bind(null, def),

  /**
   * Iterates over the properties present in the rule definition and sets the
   * appropriate bindings to required methods
   * @memberof rules
   * @param {Object} def The rule definition object
   * @param {*} data The data (value) to validate
   * @param {Object} [opts={partial: false}] Specific options for validation process
   * @param {string|null} [key=null] Key for tracking parent in nested iterations
   * @param {Array<{type: string, sub: string, key: string, value: *, message: string}>} [errors=[]] An error array
   * to which any additional error objects will be added. If not specified, a new array will be created.
   * @param {boolean} [rejectOnFail=true] If true, resulting promise will reject if the errors array is not empty;
   * otherwise ValidationErrors will not cause a rejection
   * @param {Object|null} [initData=null] Initial data object
   * @returns {Promise.<*>} Resolves with the resulting data, with any defaults, creators, and modifiers applied.
   * Rejects with a ValidationError if applicable.
   */
  validate: (def, data, opts = { partial: false }, key = null, errors = [], rejectOnFail = true, initData = null) => {
    let passthruData = initData === null ? data : initData
    let curData = data
    def.opts = opts
    const props = rules.getProps(def, data)
    if (!def.type) throw new Error('Model properties must define a \'type\'')
    let chain = Promise.resolve(data)
    props.forEach(prop => {
      if (def.hasOwnProperty(prop.name)) {
        chain = chain
          .then(val => prop.fn(def, val, key, errors, passthruData))
          .then(res => {
            if (res !== undefined) curData = res
            return curData
          })
      }
    })
    return chain.then(res => {
      if (rejectOnFail && errors.length > 0) throw new ValidationError(errors)
      return res
    })
  },

  /**
   * Adds new rule to the lib
   * @memberof rules
   * @param {Object} def The rule definition
   * @returns {Object}
   */
  build: def => {
    return {
      def,
      validate: rules.makeValidate(def)
    }
  },

  /**
   * Gets props list according to partial, required, and allowNull specifications
   * @memberof rules
   * @param {Object} def The rule definition
   * @param {*} data The value being evaluated
   * @returns {Array}
   */
  getProps: (def, data) => {
    // Partial and undefined
    if (def.opts.partial && data === undefined) return rules.props.noValPartial
    // Not required, undefined
    if (!def.required && data === undefined) return rules.props.noVal
    // AllowNull and null
    if (def.allowNull && data === null) return rules.props.noVal
    // Use default
    return rules.props.default
  }
}

export default rules
