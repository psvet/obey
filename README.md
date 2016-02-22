# Obey

Asynchronous model validation library for those of us with better things to do.

## Installation

Obey can be installed via NPM: `npm install obey --save`

## Creating a Model

The following demonstrates a basic model being created with Obey:

```javascript
import obey from 'obey'

const user = obey.model({
  id: { type: 'uuid', generator: 'uuid', required: true },
  email: { type: 'email', required: true },
  password: { type: 'string', modifier: 'encryptPassword', required: true }
  fname: { type: 'string', description: 'First Name' },
  lname: { type: 'string', description: 'Last Name' },
  phone: { type: 'phone', min: 7, max: 10 },
  // Nested object
  address: { type: 'object', keys: {
    street: { type: 'string', max: 45 },
    city:  { type: 'string', max: 45 }
    state: { type: 'string', max: 2, modifier: 'upperCase' },
    zip: { type: 'number', min: 10000, max: 99999 }
  }},
  type: { type: 'string', allow: [ 'user', 'admin' ], default: 'user' }
})
```

The properties used can each be explained as:

* `type`: The type of value, either native or custom, see [Types](#types)
* `keys`: Property of `object` type, indicates nested object properties
* `modifier`: uses a method and accepts a passed value to modify or transform data, see [Modifiers](#modifiers)
* `generator`: uses a method to create a default value if no value is supplied, see [Generators](#generators)
* `default`: The default value if no value specified
* `min`: The minimum character length for a string, lowest number, or minimum items in array
* `max`: The maximum character length for a string, highest number, or maximum items in array
* `required`: Enforces the field cannot be missing during validation
* `allow`: Array of allowed values or single allowed value
* `description`: A description of the property

## Validating a Model

Using the example above, validation is done by calling the following:

```javascript
user.validate(/* ...some data object */)
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

The validate method returns a promise (for more information see [Asynchronous Validation](#Asynchronous Validation)). A passing run will simply resolve, any failures will reject and the `ValidationError` instance will be returned.

## Types

Types are basic checks against native types, built-ins or custom. The library includes native types (`boolean`, `null`, `undefined`, `number`, `string`, `array`, and `object`) as well others. A [list of built-in types](/src/types) is contained in the source as individual strategies.

### Adding New Types

New types can be added to the Obey lib with the `obey.type` method:

```javascript
obey.type('lowerCaseOnly', context => {
  if (!context.value.test(/^([a-z])*$/) {
    context.fail(`${context.key} must be lowercase`)
  }
})
```

The second argument is the method to run validation and gets passed a `context` object. This object has the following properties:

* `schema`: The entire rule for the property in the model
* `key`: The name of the property being tested
* `value`: The value to test
* `fail`: A function accepting a failure message as an argument

The above would add a new type which would then be available for setting in the model configuration for any properties.

```javascript
label: { type: 'lowerCaseOnly', /* ... */ }
```

Types can be synchronous or asynchronous. In both cases they must either return (or resolve) the final value.

## Modifiers

Modifiers allow custom methods to return values which are modified/transformed versions of the received value.

### Creating Modifiers

Modifiers can be added to the Obey lib with the `obey.modifier` method:

```javascript
obey.modifier('upperCase', (val) => val.toUpperCase())
```

When the model is validated the value in any fields with the `upperCase` modifier will be transformed to uppercase.

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

Model validation approaches are typically simple, synchronous, and their placement in line with so many asynchronous operations such as request handling, CRUD, and others, often results in adding synchronous validation into promise chains. With Obey, the validation step just fits into the chain like so...

```javascript
// Define a model somewhere in your code...
const user = obey.model(/* ...Model Definition... */)

// Use it to validate before creating a record...
user.validate(/* ...some object... */)
  .then(createUser)
  .then(/* ...respond, or something... */)
  .catch(/* ...deal with the errors... */)
```

Additionally, validation has remained simplistic, pass/fail, and flat, but the ability to auto-generate data or run more complex validation rules can further simplify processes in which model valiation is required and prevent minor data errors from resulting in the requirement of further I/O.

Validation which has intellegence and depth means less utilities, processes, and code are required for getting data through any process requiring valid data.

## License

Obey is developed and maintained by [TechnologyAdvice](http://www.technologyadvice.com) and released under the [MIT](LICENSE.txt) license.
