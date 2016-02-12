# Obey

Asynchronous model validation library for those of us with better things to do.

## Creating a Model

Suppose the following:

```javascript
const user = obey.model({
  id: { type: 'uuid', generator: 'uuid', required: true },
  fname: { type: 'string', description: 'First Name' },
  lname: { type: 'string', description: 'Last Name' },
  email: { type: 'email', rule: 'uniqueEmail', required: true },
  phone: { type: 'phone', min: 7, max: 10 },
  address: {
    street: { type: 'string', max: 45 },
    city:  { type: 'string', max: 45 }
    state: { type: 'string', max: 2, modifier: 'upperCase' },
    zip: { type: 'number', min: 5, max: 10 }
  },
  type: { type: 'string', allow: [ 'user', 'admin' ], default: 'user' }
})
```

The properties used can each be explained as:

* `type`: The type of value, i.e. a string, number, email, etc
* `rule`: Similar to type, a custom method to check validity of value, see [rules](#Rules)
* `modifier`: uses a method and accepts a passed value to modify or transform data, see [Modifiers](#Modifiers)
* `generator`: uses a method to create a default value if no value is supplied, see [Generators](#Generators)
* `default`: The default value if no value specified
* `min`: The minimum character length for a string, lowest number, or minimum items in array
* `max`: The maximum character length for a string, highest number, or maximum items in array
* `required`: Enforces the field cannot be missing during validation
* `allow`: Array of allowed values
* `description`: A description of the property

## Validating a Model

Using the example above, validation is done by calling the following:

```javascript
user.validate(/* ...some data object */)
  .then((data) => {
    // Passes back cloned `data` object with passing validations and any
    // generated or modified values
  })
  .catch(errors => {
    // Nope, not valid...
  })
```

The validate method returns a promise (for more information see [Asynchronous Validation](#Asynchronous Validation)). A passing run will simply resolve, any failures will reject and the array of errors will be returned.

## Rules

Rules allow more complex, custom validation methods. For example, checking that a value is unique in a datastore before calling a create method.

### Creating Rules

Rules can be added to the obey lib with the `obey.rule` method:

```javascript
obey.rule('uniqueEmail', (val) => { /* run check */ })
```

The above example would add a ruled named `uniqueEmail` which could be called like so:

```javascript
email: { type: 'email', rule: 'uniqueEmail' }
```

When the model is validated, the type check (if present) is run first to ensure proper type, then the rule is run to ensure the email is unique.

**Rules can be synchronous or asynchronous (returning a Promise).**

## Modifiers

Modifiers allow custom methods to return values which are modified/transformed versions of the received value.

### Creating Modifiers

Modifiers can be added to the obey lib with the `obey.modifier` method:

```javascript
obey.modifier('upperCase', (val) => val.toUpperCase())
```

When the model is validated the value in any fields with the `upperCase` modifier will be transformed to uppercase.

**Modifiers can be synchronous or asynchronous (returning a Promise).**

## Generators

Generators allow custom methods to return values which set the value similar to the `default` property. When validating, if a value is not provided the generator assigned will be used to set the value.

### Creating Generators

Generators can be added to the obey lib with the `obey.generator` method:

```javascript
obey.generator('timestamp', () => new Date().getTime())
```

The above example would add a generator named `timestamp` which could be called like so:

```javascript
created: { type: 'number', generator: 'timestamp' }
```

When the model is validated, if no `created` property is provided the `timestamp` generator will assign the property a UTC timestamp.

**Generators can be synchronous or asynchronous (returning a Promise).**

## Asynchronous Validation

Crazy, right? Wrong. Model validation approaches are typically simple, synchronous, and their placement in line with so many asynchronous operations such as request handling, CRUD, and others, often results in adding synchronous validation into promise chains.

Additionally, validation has remained simplistic, pass/fail, and flat, but the ability to auto-generate data or run more complex validation rules can further simplify processes in which model valiation is required.

Validation which has intellegence and depth means less utilities, processes, and code are required for getting data through any process requiring valid data.
