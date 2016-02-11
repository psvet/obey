# Obey

Super clean model validation for those of us with other stuff to do.

## Creating a Model

Suppose the following:

```javascript
const myModel = obey.model({
  id: { type: 'uuid', generator: 'uuid', required: true },
  fname: { preset: 'nameField', description: 'First Name' },
  lname: { preset: 'nameField', description: 'Last Name' },
  email: { type: 'email', required: true },
  phone: { type: 'phone', min: 7, max: 10 },
  type: { type: 'string', allow: [ 'user', 'admin' ], default: 'user' },
})
```

The properties used can each be explained as:

* `type`: The type of value, i.e. a string, number, email, etc
* `preset`: A resusable preset validation spec, see [presets](#Presets)
* `default`: The default value if not specified
* `generator`: Similar to `default`, uses a method to create a default value if not supplied (see [Generators](#Generators)
* `min`: The minimum character length for a string, lowest number, or minimum items in array
* `max`: The maximum character length for a string, highest number, or maximum items in array
* `required`: Enforces the field cannot be missing during validation
* `allow`: Array of allowed values
* `description`: A description of the property

## Validating a Model

Using the example above, validation is done by calling the following:

```javascript
const result = myModel.validate(/* ...some data object */)
```

The `result` would return `false` if no validation errors occur, or an array of the properties failing validation and their appropriate, passing conditions.

## Presets

As many validations may be common, and reused, presets can be used to create consistent, resusable rules.

### Creating Presets

Presets can be added to the obey lib using the `addPreset` method:

```javascript
obey.preset('nameField', { type: 'string', min: 2, max: 35 }
```

The preset's properties can be overwritten or extended when set as shown in the example with addition of the `description` property.

## Generators

Generators allow custom methods to return values which set the value similar to the `default` property. When validating, if a value is not provided the generator assigned will be used to set the value.

### Creating Generators

Generators can be added to the obey lib with the `addGenerator` method:

```javascript
obey.generator('timestamp', () => new Date().getTime())
```

The above example would add a generator named `timestamp` which could be called like so:

```javascript
created: { type: 'number', generator: 'timestamp' }
```

When the model is validated, if no `created` property is provided the `timestamp` generator will assign the property a UTC timestamp.