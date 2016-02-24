/*
 * Copyright (c) 2015 TechnologyAdvice
 */
import types from './types'
import modifiers from './modifiers'
import generators from './generators'
import validators from './lib/validators'
import ValidationError from './lib/error'

const rules = {
  /**
   * Acts as validation setup for, and respective order of operations
   * of, properties for a schema-prop configuration
   */
  props: [
    { name: 'generator', fn: generators.validator },
    { name: 'default', fn: validators.default },
    { name: 'modifier', fn: modifiers.validator },
    { name: 'allow', fn: validators.allow },
    { name: 'min', fn: validators.min },
    { name: 'max', fn: validators.max },
    { name: 'type', fn: types.validator },
    { name: 'required', fn: validators.required }
  ],
  /**
   * Adds new rule
   * @param {Object} def The rule definition
   * @returns {Object}
   */
  add: (def) => {
    return def
  }
}

export default rules
