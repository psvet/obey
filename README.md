# Obey

Asynchronous Data Modelling and Validation.

[![CircleCI](https://img.shields.io/circleci/project/TechnologyAdvice/obey/master.svg)](https://circleci.com/gh/TechnologyAdvice/obey)
[![Code Climate](https://img.shields.io/codeclimate/github/TechnologyAdvice/obey.svg)](https://codeclimate.com/github/TechnologyAdvice/obey)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/TechnologyAdvice/obey.svg)](https://codeclimate.com/github/TechnologyAdvice/obey/coverage)
![Dependencies](https://img.shields.io/david/technologyadvice/obey.svg)
[![Known Vulnerabilities](https://snyk.io/test/npm/obey/badge.svg)](https://snyk.io/test/npm/obey)

## Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [API Documentaion](#api-documentation)
- [Rules](#rules)
- [Models](#models)
- [Validation](#validation)
  - [Validating Partials](#validating-partials)
  - [Validation Error Handling](#validation-error-handling)
- [Definition Properties](#definition-properties)
- [Types](#types)
  - [Adding New Types](#adding-new-types)
    - [Adding Single-Method Type](#adding-single-method-type)
    - [Adding Type with Subs](#adding-type-with-subs)
- [Allow](#allow)
- [Modifiers](#modifiers)
  - [Creating Modifiers](#creating-modifiers)
- [Creators](#creators)
  - [Creating Creators](#creating-creators)
- [Strict Mode](#strict-mode)
- [Asynchronous Validation](#asynchronous-validation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Obey is a library for creating asynchronous data models and rules. The core goal of the project is to provide methods for managing data models both through synchronous and asynchronous validation and alignment using [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## Installation

Obey can be installed via [NPM](https://www.npmjs.com/package/obey): `npm install obey --save`

## API Documentation

Detailed [API Documentation](API.md) is available for assistance in using, modifying, or [contibuting](#contributing) to the Obey library.

## Rules

> Rules are core definitions of how a value should be validated:

```javascript
import obey from 'obey'

const firstName = obey.rule({ type: 'string', min: 2, max: 45, required: true })
```

## Models

> Models allow for creating validation rules for entire object schemas. The following demonstrates a model being created with Obey:

```javascript
import obey from 'obey'

const userModel = obey.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  email: { type: 'email', required: true },
  password: { type: 'string', modifier: 'encryptPassword', required: true },
  passwordConfirm: { type: 'string', equalTo: 'password' },
  fname: { type: 'string', description: 'First Name' },
  lname: { type: 'string', description: 'Last Name', empty: true },
  suffix: { type: 'string', allowNull: true },
  phone: { type: 'phone:numeric', min: 7, max: 10 },
  phoneType: { type: 'string', requireIf: 'phone' },
  // Array
  labels: { type: 'array', values: {
    type: 'object', keys: {
      label: { type: 'string' }
    }
  }},
  // Nested object
  address: { type: 'object', keys: {
    street: { type: 'string', max: 45 },
    city:  { type: 'string', max: 45 },
    state: { type: 'string', max: 2, modifier: 'upperCase' },
    zip: { type: 'number', min: 10000, max: 99999 }
  }},
  // Key-independent object validation
  permissions: { type: 'object', values: {
    type: 'string'
  }},
  account: { type: 'string', allow: [ 'user', 'admin' ], default: 'user' }
})
```

## Validation

Using the example above, validation is done by calling the `validate` method and supplying data. This applies to both individual rules and data models:

```javascript
userModel.validate({ /* some data */ })
  .then(data => {
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

### Validating Partials

The `validate` method has the ability to validate partial data objects:

```javascript
// Allow partial validation by supplying second argument with `partial: true`
userModel.validate({ /* some (partial) data */ }, { partial: true })
```

The default for the partial option is `false`, but passing `true` will allow for validation of an object containing a subset (i.e. will not throw errors for `required` properties).

The common use-case for validating partials is `PATCH` updates.

_Note: Running a partial validation will prevent running `creator`'s on any properties_

### Validation Error Handling

Validation errors are collected and thrown after all validation has run. This is as opposed to blocking, or stopping, on the first failure.

As shown in the example above, the `catch` will contain an instance of `ValidationError` with two properties; `message` and `collection`. The `message` simply contains the description of all errors.

The `collection` is an array of objects containing details on each of the validation errors. For example, if a `type` evaluation for `phone:numeric` was performed and the value failed the following would be contained as an object in the array:

```javascript
{
  type: 'phone', // The type evaluation performed
  sub: 'numeric', // The sub-type (if applicable)
  key: 'primaryPhone', // Name of the property in the model
  value: '(555) 123-4567', // The value evaluated
  message: 'Value must be a numeric phone number' // Message
}
```

## Definition Properties

When setting definitions for rules or model properties, the following are supported:

* `type`: The type of value with (optional) sub-type see [Types](#types)
* `keys`: Property of `object` type, indicates nested object properties
* `values`: Defines value specification for arrays or key-independent objects
* `modifier`: uses a method and accepts a passed value to modify or transform data, see [Modifiers](#modifiers)
* `creator`: uses a method to create a default value if no value is supplied, see [Creators](#creators)
* `empty`: Set to `true` allows empty string or array, (default `false`)
* `default`: The default value if no value specified
* `min`: The minimum character length for a string, lowest number, or minimum items in array
* `max`: The maximum character length for a string, highest number, or maximum items in array
* `required`: Enforces the value cannot be `undefined` during validation (default `false`)
* `requireIf`: Enforces the value cannot be `undefined` if a value exists for the corresponding field
* `requireIfNot`: Enforces the value cannot be `undefined` if a value _does not_ exist for the corresponding field
* `equalTo`: Enforces the value to be the same as the corresponding field
* `allow`: Object, array or single value representing allowed value(s), see [Allow](#allow)
* `allowNull`: Accepts a null value or processes specified type
* `strict`: Enable or disable strict checking of an object, see [Strict Mode](#strict-mode)
* `description`: A description of the property

## Types

**Reference: [Type Documentation](/src/typeStrategies#types)**

> Types are basic checks against native types, built-ins or customs. The library includes native types (`boolean`, `number`, `string`, `array`, and `object`) as well other common types. A [list of built-in types](/src/typeStrategies#types) is contained in the source.

The `type` definition can also specify a sub-type, for example:

```javascript
phone: { type: 'phone:numeric' }
```

The above would specify the general type `phone` with sub-type `numeric` (only allowing numbers).

### Adding New Types

New types can be added to the Obey lib with the `obey.type` method. Types can be added as single methods or objects supporting sub-types:

#### Adding Single-Method Type

```javascript
obey.type('lowerCaseOnly', context => {
  if (!/[a-z]/.test(context.value)) {
    context.fail(`${context.key} must be lowercase`)
  }
})
```

#### Adding Type with Subs

```javascript
obey.type('password', {
  default: context => {
    if (context.value.length < 6) {
      context.fail(`${context.key} must contain at least 6 characters`)
    }
  },
  strong: context => {
    if (!context.value.test((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/))) {
      context.fail(`${context.key} must contain a number, letter, and be at least 8 characters`)
    }
  }
})
```

The definition object contains keys that indicate the subtype (or `default` if no sub-type specified).

Each method will be passed a `context` object at runtime. This object has the following properties:

* `def`: The entire rule for the property in the model
* `sub`: The sub-type (if provided)
* `key`: The name of the property being tested (if an element in a model/object)
* `value`: The value to test
* `fail`: A function accepting a failure message as an argument

The above would add a new type which would then be available for setting in the model configuration for any properties.

```javascript
password: { type: 'password', /* ...additional config... */ }

/* ...or... */

password: { type: 'password:strong',  /* ...additional config... */ }
```

Types can be synchronous or asynchronous. For example, if a unique email is required the following could be used to define a `uniqueEmail` type:

```javascript
obey.type('uniqueEmail', context => {
  return someDataSource.find({ email: context.value })
    .then(record => {
      if (record.length >= 1) {
        context.fail(`${context.key} already exists`)
      }
    })
}
```

Types _can_ return/resolve a value, though it is not required and is recommended any coercion be handled with a modifier.

Regardless of if a value is returned/resolved, asynchronous types must resolve. Errors should be handled with the `context.fail()` method.

## Allow

The `allow` property in definition objects accepts three formats; `string`, `array` or `object`

The `string` and `array` methods are straight-forward:

```javascript
// Only allow 'bar'
foo: { type: 'string', allow: 'bar' }
// Allow 'buzz', 'bazz', 'bizz'
fizz: { type: 'string', allow: [ 'buzz', 'bazz', 'bizz' ] }
```

The `object` representation of the `allow` property gives the ability to store enums alongside the model structure making sharing/reuse of the objects simplified:

```javascript
const allowedStatuses = {
  'prog': 'in progress',
  'comp': 'completed',
  'arch': 'archived'
}

// Allow statuses
{ status: { type: 'string', allow: allowedStatuses } }
```

In the above example, the model would only accept the keys (`prog`, `comp`, `arch`) during validation.

## Modifiers

> Modifiers allow custom methods to return values which are modified/transformed versions of the received value.

### Creating Modifiers

Modifiers can be added to the Obey lib with the `obey.modifier` method:

```javascript
obey.modifier('upperCase', val => val.toUpperCase())
```

When the model is validated, the value in any fields with the `upperCase` modifier will be transformed to uppercase.

Similar to types, modifiers may be synchronous (returning a value) or asynchronous (returning a promise).

## Creators

> Creators allow custom methods to return values which set the value similar to the `default` property. When validating, if a value is not provided the creator assigned will be used to set the value.

### Creating Creators

Creators can be added to the Obey lib with the `obey.creator` method:

```javascript
obey.creator('timestamp', () => new Date().getTime())
```

The above example would add a creator named `timestamp` which could be assigned as shown below:

```javascript
created: { type: 'number', creator: 'timestamp' }
```

When the model is validated, if no `created` property is provided the `timestamp` creator will assign the property a UTC timestamp.

Similar to modifiers, creators may be synchronous (returning a value) or asynchronous (returning a promise).

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

## Asynchronous Validation

The goal with Obey is to provide more than just standard type/regex checks against data to validate values and models. The ability to write both synchronous and asynchronous checks, creators, and modifiers, and include data coercion in the validation simplifies the process of validation and checking before moving onto data source interactions.

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

## Contributing

Contibutions to Obey are welcomed and encouraged. If you would like to make a contribution please fork the repository and submit a PR with changes. Acceptance of PR's is based on a review by core contributors. To increase the likelihood of acceptance please ensure the following:

* The PR states the reason for the modification/addition to the API **in detail**
* All tests are passing and coverage is at, or near, 100%
* The code submitted follows the conventions used throughout the library
* [JSDoc](http://usejsdoc.org/) is in place and generates via `npm run doc`
* Any needed documentation on the `README` is supplied

## License

Obey is developed and maintained by [TechnologyAdvice](http://www.technologyadvice.com) and released under the [MIT](LICENSE.txt) license.
