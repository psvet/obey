## Objects

<dl>
<dt><a href="#generators">generators</a> : <code>object</code></dt>
<dd><p>Generators allow for methods which generate values during validation when a
value is not supplied</p>
</dd>
<dt><a href="#obey">obey</a> : <code>object</code></dt>
<dd><p>The main object for Obey; exposes the core API methods for standard use as
well as the API for all other modules</p>
</dd>
<dt><a href="#modifiers">modifiers</a> : <code>object</code></dt>
<dd><p>Modifiers allow for coercion/modification of a value present in the object
when validation occurs</p>
</dd>
<dt><a href="#rules">rules</a> : <code>object</code></dt>
<dd><p>Rules is responsible for determining the execution of schema definition
properties during validation</p>
</dd>
<dt><a href="#types">types</a> : <code>object</code></dt>
<dd><p>Types determine and execute the appropriate validation to be performed on an
object during validation</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#addErrors">addErrors</a></dt>
<dd><p>Adds the error array from a ValidationError&#39;s collection into a parent context&#39;s
existing collection. This function is curried.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getMessages">getMessages(msgObjs)</a> ⇒ <code>Array</code></dt>
<dd><p>Compiles array items into string error messages</p>
</dd>
<dt><a href="#ValidationError">ValidationError(message)</a></dt>
<dd><p>Creates ValidationError object for throwing</p>
</dd>
<dt><a href="#validateByKeys">validateByKeys(context, keyPrefix)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Validates an object using the definition&#39;s <code>keys</code> property</p>
</dd>
<dt><a href="#validateByValues">validateByValues(context, keyPrefix)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Validates an object using the definition&#39;s <code>values</code> property</p>
</dd>
</dl>

<a name="generators"></a>
## generators : <code>object</code>
Generators allow for methods which generate values during validation when a
value is not supplied

**Kind**: global namespace  

* [generators](#generators) : <code>object</code>
    * [.lib](#generators.lib)
    * [.execute(def, key, value)](#generators.execute) ⇒ <code>function</code>
    * [.add(name, fn)](#generators.add)

<a name="generators.lib"></a>
### generators.lib
**Kind**: static property of <code>[generators](#generators)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Library | <code>Object</code> | of generators |

<a name="generators.execute"></a>
### generators.execute(def, key, value) ⇒ <code>function</code>
Execute method calls the appropriate generator and returns the method or
throws and error if the generator does not exist

**Kind**: static method of <code>[generators](#generators)</code>  
**Returns**: <code>function</code> - The generator function  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The property configuration |
| key | <code>String</code> | The key name of the property |
| value | <code>\*</code> | The value being validated |

<a name="generators.add"></a>
### generators.add(name, fn)
Adds a generator to the library

**Kind**: static method of <code>[generators](#generators)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the generator |
| fn | <code>function</code> | The generator's method |

<a name="obey"></a>
## obey : <code>object</code>
The main object for Obey; exposes the core API methods for standard use as
well as the API for all other modules

**Kind**: global namespace  

* [obey](#obey) : <code>object</code>
    * [.rule(def)](#obey.rule) ⇒ <code>Object</code>
    * [.model(obj, (strict))](#obey.model) ⇒ <code>Object</code>
    * [.type(name, handler)](#obey.type)
    * [.modifier(name, fn)](#obey.modifier)
    * [.generator(name, fn)](#obey.generator)

<a name="obey.rule"></a>
### obey.rule(def) ⇒ <code>Object</code>
Returns a composed rule from a definition object

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The rule definition |

<a name="obey.model"></a>
### obey.model(obj, (strict)) ⇒ <code>Object</code>
Returns a composed model from a definition object

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The definition object |
| (strict) | <code>Boolean</code> | Whether or not to enforce strict validation |

<a name="obey.type"></a>
### obey.type(name, handler)
Creates and stores (or replaces) a type

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the type |
| handler | <code>Object</code> &#124; <code>function</code> | The type method or object of methods |

<a name="obey.modifier"></a>
### obey.modifier(name, fn)
Creates and stores a modifier

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The modifier's name |
| fn | <code>function</code> | The method for the modifier |

<a name="obey.generator"></a>
### obey.generator(name, fn)
Creates and stores a generator

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The generator's name |
| fn | <code>function</code> | The method for the generator |

<a name="modifiers"></a>
## modifiers : <code>object</code>
Modifiers allow for coercion/modification of a value present in the object
when validation occurs

**Kind**: global namespace  

* [modifiers](#modifiers) : <code>object</code>
    * [.lib](#modifiers.lib)
    * [.execute(def, key, value)](#modifiers.execute) ⇒ <code>function</code>
    * [.add(name, fn)](#modifiers.add)

<a name="modifiers.lib"></a>
### modifiers.lib
**Kind**: static property of <code>[modifiers](#modifiers)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Library | <code>Object</code> | of modifiers |

<a name="modifiers.execute"></a>
### modifiers.execute(def, key, value) ⇒ <code>function</code>
Execute method calls the appropriate modifier and passes in the value or
throws an error if the modifier does not exist

**Kind**: static method of <code>[modifiers](#modifiers)</code>  
**Returns**: <code>function</code> - The modifier function  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The property configuration |
| key | <code>String</code> | The key name of the property |
| value | <code>\*</code> | The value being validated |

<a name="modifiers.add"></a>
### modifiers.add(name, fn)
Adds new modifier to the library

**Kind**: static method of <code>[modifiers](#modifiers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the modifier |
| fn | <code>function</code> | The modifier's method |

<a name="rules"></a>
## rules : <code>object</code>
Rules is responsible for determining the execution of schema definition
properties during validation

**Kind**: global namespace  

* [rules](#rules) : <code>object</code>
    * [.props](#rules.props)
    * [.makeValidate(def)](#rules.makeValidate)
    * [.validate(def, data, (key))](#rules.validate)
    * [.build(def)](#rules.build) ⇒ <code>Object</code>

<a name="rules.props"></a>
### rules.props
**Kind**: static property of <code>[rules](#rules)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Validation | <code>Object</code> | property setup and order of operations |

<a name="rules.makeValidate"></a>
### rules.makeValidate(def)
Binds rule definition in validate method

**Kind**: static method of <code>[rules](#rules)</code>  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The rule definition object |

<a name="rules.validate"></a>
### rules.validate(def, data, (key))
Iterates over the properties present in the rule definition and sets the
appropriate bindings to required methods

**Kind**: static method of <code>[rules](#rules)</code>  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The rule definition object |
| data | <code>\*</code> | The data (value) to validate |
| (key) | <code>String</code> | Key for tracking parent in nested iterations |

<a name="rules.build"></a>
### rules.build(def) ⇒ <code>Object</code>
Adds new rule to the lib

**Kind**: static method of <code>[rules](#rules)</code>  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The rule definition |

<a name="types"></a>
## types : <code>object</code>
Types determine and execute the appropriate validation to be performed on an
object during validation

**Kind**: global namespace  

* [types](#types) : <code>object</code>
    * [.strategies](#types.strategies)
    * [.checkSubType(def)](#types.checkSubType) ⇒ <code>Object</code>
    * [.validate(def, key, value)](#types.validate) ⇒ <code>\*</code>
    * [.add(name, handler, fn)](#types.add)
    * [.check(type, val)](#types.check) ⇒ <code>Object</code>

<a name="types.strategies"></a>
### types.strategies
**Kind**: static property of <code>[types](#types)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Contains | <code>Object</code> | type strategies |

<a name="types.checkSubType"></a>
### types.checkSubType(def) ⇒ <code>Object</code>
Checks for and applies sub-type to definition

**Kind**: static method of <code>[types](#types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The rule defintion |

<a name="types.validate"></a>
### types.validate(def, key, value) ⇒ <code>\*</code>
Sets up the `fail` method and handles `empty` or `undefined` values. If neither
empty or undefined, calls the appropriate `type` and executes validation

**Kind**: static method of <code>[types](#types)</code>  
**Returns**: <code>\*</code> - The value if empty or undefined, check method if value requires type validation  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The property configuration |
| key | <code>String</code> | The key name of the property |
| value | <code>\*</code> | The value being validated |

<a name="types.add"></a>
### types.add(name, handler, fn)
Add (or override) a type in the library

**Kind**: static method of <code>[types](#types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the type |
| handler | <code>Object</code> &#124; <code>function</code> |  |
| fn | <code>String</code> | The type strategy method |

<a name="types.check"></a>
### types.check(type, val) ⇒ <code>Object</code>
Ensures that the strategy exists, loads if not already in memory, then ensures
subtype and returns the applied type strategy

**Kind**: static method of <code>[types](#types)</code>  
**Returns**: <code>Object</code> - The type execution function promise resolution  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The type to check |
| val | <code>\*</code> | The value to check |

<a name="addErrors"></a>
## addErrors
Adds the error array from a ValidationError's collection into a parent context's
existing collection. This function is curried.

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | An Obey type context |
| err | <code>[ValidationError](#ValidationError)</code> | An error to merge with the context's error stack |

<a name="getMessages"></a>
## getMessages(msgObjs) ⇒ <code>Array</code>
Compiles array items into string error messages

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msgObjs | <code>Array</code> | Original array of error message objects |

<a name="ValidationError"></a>
## ValidationError(message)
Creates ValidationError object for throwing

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Array</code> | Raw array of error objects |

<a name="validateByKeys"></a>
## validateByKeys(context, keyPrefix) ⇒ <code>Promise.&lt;Object&gt;</code>
Validates an object using the definition's `keys` property

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Resolves with the final object  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | An Obey type context |
| keyPrefix | <code>string</code> | A prefix to include before the key in an error message |

<a name="validateByValues"></a>
## validateByValues(context, keyPrefix) ⇒ <code>Promise.&lt;Object&gt;</code>
Validates an object using the definition's `values` property

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Resolves with the final object  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | An Obey type context |
| keyPrefix | <code>string</code> | A prefix to include before the key in an error message |

