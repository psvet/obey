[![CircleCI](https://img.shields.io/circleci/project/TechnologyAdvice/obey.svg)](https://circleci.com/gh/TechnologyAdvice/obey)
[![Code Climate](https://img.shields.io/codeclimate/github/TechnologyAdvice/obey.svg)](https://codeclimate.com/github/TechnologyAdvice/obey)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/TechnologyAdvice/obey.svg)](https://codeclimate.com/github/TechnologyAdvice/obey/coverage)
![Dependencies](https://img.shields.io/david/technologyadvice/obey.svg)
[![Known Vulnerabilities](https://snyk.io/test/npm/obey/badge.svg)](https://snyk.io/test/npm/obey)

# Obey

Data validation and modelling library for those of us with better things to do.

## Installation

Obey can be installed via NPM: `npm install obey --save`

## Creating Rules

Rules are core definitions of how a value should be validated:

```javascript
import obey from 'obey'

const firstName = obey.rule({ type: 'string', min: 2, max: 45, required: true })
```

#### Validating with a Rule

A rule creates a reference which then can be validated with data:

```javascript
firstName.validate('John')
  .then((data) => {
    // Passes back `data` value, includes any defaults set,
    // generated, or modified data
  })
  .catch(error => {
    // Returns instance of ValidationError
    // `error.message` => String format error messages
    // `error.collection` => Raw array of error objects
  })
```

## Creating Models

Models allow for creating validation rules for entire object schemas. The following demonstrates a basic model being created with Obey:

```javascript
import obey from 'obey'

const userModel = obey.model({
  id: { type: 'uuid', generator: 'uuid', required: true },
  email: { type: 'email', required: true },
  password: { type: 'string', modifier: 'encryptPassword', required: true }
  fname: { type: 'string', description: 'First Name' },
  lname: { type: 'string', description: 'Last Name' },
  phone: { type: 'phone', min: 7, max: 10 },
  // Array
  labels: { type: 'array', values: {
    type: 'object', keys: {
      label: { type: 'string' }
    }
  }},
  // Nested object
  address: { type: 'object', keys: {
    street: { type: 'string', max: 45 },
    city:  { type: 'string', max: 45 }
    state: { type: 'string', max: 2, modifier: 'upperCase' },
    zip: { type: 'number', min: 10000, max: 99999 }
  }},
  // Key-independent object validation
  permissions: { type: 'object', values: {
    type: 'string'
  },
  account: { type: 'string', allow: [ 'user', 'admin' ], default: 'user' }
})
```

#### Validating with a Model

Using the example above, validation is done, similar to validating with a rule, by calling the `validate` method and supplying data:

```javascript
userModel.validate({ /* some data object */ })
  .then((data) => {
    // Passes back `data` object, includes any defaults set,
    // generated, or modified data
  })
  .catch(error => {
    // Returns instance of ValidationError
    // `error.message` => String format error messages
    // `error.collection` => Raw array of error objects
  })
```

The validate method returns a promise (for more information see [Asynchronous Validation](#Asynchronous Validation)). A passing run will resolve with the data, any failures will reject and the `ValidationError` instance will be returned.

## Properties of Rules

The properties used can each be explained as:

* `type`: The type of value, either native or custom, see [Types](#types)
* `keys`: Property of `object` type, indicates nested object properties
* `values`: Defines value specification for arrays or key-independent object tests
* `modifier`: uses a method and accepts a passed value to modify or transform data, see [Modifiers](#modifiers)
* `generator`: uses a method to create a default value if no value is supplied, see [Generators](#generators)
* `default`: The default value if no value specified
* `min`: The minimum character length for a string, lowest number, or minimum items in array
* `max`: The maximum character length for a string, highest number, or maximum items in array
* `required`: Enforces the field cannot be missing during validation
* `allow`: Array of allowed values or single allowed value
* `strict`: Enable or disable strict checking of an object, see [Strict Mode](#strict-mode)
* `description`: A description of the property

## Strict Mode

By default, Obey enforces strict matching on objects; meaning an object must define any keys that will be present in the data object being validated.

To disable strict mode on a rule or object set the `strict` property to false:

```javascript
foo: { type: 'object', strict: false, keys: { /* ... */ } }
```

To disable strict mode on a model pass the (optional) strict argument as `false`:

```javascript
const model = obey.model({ /* definition */ }, false)
```

## Types

Types are basic checks against native types, built-ins or customs. The library includes native types (`boolean`, `null`, `undefined`, `number`, `string`, `array`, and `object`) as well other common types. A [list of built-in types](/src/types) is contained in the source.

### Adding New Types

New types can be added to the Obey lib with the `obey.type` method:

```javascript
obey.type('lowerCaseOnly', context => {
  if (!context.value.test(/^([a-z])*$/) {
    context.fail(`${context.key} must be lowercase`)
  }
})
```

The second argument is the method to run validation and gets passed a `context` object by the library. This object has the following properties:

* `def`: The entire rule for the property in the model
* `key`: The name of the property being tested (if an element in a model/object)
* `value`: The value to test
* `fail`: A function accepting a failure message as an argument

The above would add a new type which would then be available for setting in the model configuration for any properties.

```javascript
label: { type: 'lowerCaseOnly', /* ...additional config... */ }
```

Types can be synchronous or asynchronous. Types _can_ return/resolve a value, though it is not required and is recommended any coercion be handled with a modifier.

Regardless of if a value is returned/resolved, asynchronous types must resolve. Errors should be handled with the `context.fail()` method.

## Modifiers

Modifiers allow custom methods to return values which are modified/transformed versions of the received value.

### Creating Modifiers

Modifiers can be added to the Obey lib with the `obey.modifier` method:

```javascript
obey.modifier('upperCase', val => val.toUpperCase())
```

When the model is validated, the value in any fields with the `upperCase` modifier will be transformed to uppercase.

Modifiers can be synchronous or asynchronous. In both cases they must either return (or resolve) the final value.

## Generators

Generators allow custom methods to return values which set the value similar to the `default` property. When validating, if a value is not provided the generator assigned will be used to set the value.

### Creating Generators

Generators can be added to the Obey lib with the `obey.generator` method:

```javascript
obey.generator('timestamp', () => new Date().getTime())
```

The above example would add a generator named `timestamp` which could be assigned as shown below:

```javascript
created: { type: 'number', generator: 'timestamp' }
```

When the model is validated, if no `created` property is provided the `timestamp` generator will assign the property a UTC timestamp.

Generators can be synchronous or asynchronous. In both cases they must either return (or resolve) the final value.

## Asynchronous Validation

The goal with Obey is to provide more than just standard type/regex checks against data to validate values and models. The ability to write both synchronous and asynchronous checks, generators, and modifiers, and include data coercion in the validation simplifies the process of validation and checking before moving onto data source interactions.

Additionally, with the widespread use of promises, this structure fits well in the scheme of data processing in general:

```javascript
// Define a model somewhere in your code...
const user = obey.model(/* ...Model Definition... */)

// Use it to validate before creating a record...
user.validate(/* ...some data object... */)
  .then(createUser)
  .then(/* ...response or other action... */)
  .catch(/* ...handle errors... */)
```

## License

Obey is developed and maintained by [TechnologyAdvice](http://www.technologyadvice.com) and released under the [MIT](LICENSE.txt) license.
