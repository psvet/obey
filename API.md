## Objects

<dl>
<dt><a href="#creators">creators</a> : <code>object</code></dt>
<dd><p>Creators allow for methods which create values during validation when a
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
<dd><p>Types determine and execute the appropriate validation to be performed on the
data during validation</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getMessages">getMessages(msgObjs)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
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

<a name="creators"></a>
## creators : <code>object</code>
Creators allow for methods which create values during validation when a
value is not supplied

**Kind**: global namespace  

* [creators](#creators) : <code>object</code>
    * [.lib](#creators.lib)
    * [.execute(def, key, value)](#creators.execute) ⇒ <code>function</code>
    * [.add(name, fn)](#creators.add)

<a name="creators.lib"></a>
### creators.lib
**Kind**: static property of <code>[creators](#creators)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Library | <code>Object</code> | of creators |

<a name="creators.execute"></a>
### creators.execute(def, key, value) ⇒ <code>function</code>
Execute method calls the appropriate creator and returns the method or
throws and error if the creator does not exist

**Kind**: static method of <code>[creators](#creators)</code>  
**Returns**: <code>function</code> - The creator function  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The property configuration |
| key | <code>string</code> | The key name of the property |
| value | <code>\*</code> | The value being validated |

<a name="creators.add"></a>
### creators.add(name, fn)
Adds a creator to the library

**Kind**: static method of <code>[creators](#creators)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the creator |
| fn | <code>function</code> | The creator's method |

<a name="obey"></a>
## obey : <code>object</code>
The main object for Obey; exposes the core API methods for standard use as
well as the API for all other modules

**Kind**: global namespace  

* [obey](#obey) : <code>object</code>
    * [.rule(def)](#obey.rule) ⇒ <code>Object</code>
    * [.model(obj, [strict])](#obey.model) ⇒ <code>Object</code>
    * [.type(name, handler)](#obey.type)
    * [.modifier(name, fn)](#obey.modifier)
    * [.creator(name, fn)](#obey.creator)

<a name="obey.rule"></a>
### obey.rule(def) ⇒ <code>Object</code>
Returns a composed rule from a definition object

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The rule definition |

<a name="obey.model"></a>
### obey.model(obj, [strict]) ⇒ <code>Object</code>
Returns a composed model from a definition object

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Object</code> |  | The definition object |
| [strict] | <code>boolean</code> | <code>true</code> | Whether or not to enforce strict validation |

<a name="obey.type"></a>
### obey.type(name, handler)
Creates and stores (or replaces) a type

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the type |
| handler | <code>Object</code> &#124; <code>function</code> | The type method or object of methods |

<a name="obey.modifier"></a>
### obey.modifier(name, fn)
Creates and stores a modifier

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The modifier's name |
| fn | <code>function</code> | The method for the modifier |

<a name="obey.creator"></a>
### obey.creator(name, fn)
Creates and stores a creator

**Kind**: static method of <code>[obey](#obey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The creator's name |
| fn | <code>function</code> | The method for the creator |

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
| key | <code>string</code> | The key name of the property |
| value | <code>\*</code> | The value being validated |

<a name="modifiers.add"></a>
### modifiers.add(name, fn)
Adds new modifier to the library

**Kind**: static method of <code>[modifiers](#modifiers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the modifier |
| fn | <code>function</code> | The modifier's method |

<a name="rules"></a>
## rules : <code>object</code>
Rules is responsible for determining the execution of schema definition
properties during validation

**Kind**: global namespace  

* [rules](#rules) : <code>object</code>
    * [.props](#rules.props)
    * [.makeValidate(def)](#rules.makeValidate)
    * [.validate(def, data, [key], [errors], [rejectOnFail])](#rules.validate) ⇒ <code>Promise.&lt;\*&gt;</code>
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
### rules.validate(def, data, [key], [errors], [rejectOnFail]) ⇒ <code>Promise.&lt;\*&gt;</code>
Iterates over the properties present in the rule definition and sets the
appropriate bindings to required methods

**Kind**: static method of <code>[rules](#rules)</code>  
**Returns**: <code>Promise.&lt;\*&gt;</code> - Resolves with the resulting data, with any defaults, creators, and modifiers applied.
Rejects with a ValidationError if applicable.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| def | <code>Object</code> |  | The rule definition object |
| data | <code>\*</code> |  | The data (value) to validate |
| [key] | <code>string</code> |  | Key for tracking parent in nested iterations |
| [errors] | <code>Array.&lt;{type: string, sub: string, key: string, value: \*, message: string}&gt;</code> | <code>[]</code> | An error array to which any additional error objects will be added. If not specified, a new array will be created. |
| [rejectOnFail] | <code>boolean</code> | <code>true</code> | If true, resulting promise will reject if the errors array is not empty; otherwise ValidationErrors will not cause a rejection |

<a name="rules.build"></a>
### rules.build(def) ⇒ <code>Object</code>
Adds new rule to the lib

**Kind**: static method of <code>[rules](#rules)</code>  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The rule definition |

<a name="types"></a>
## types : <code>object</code>
Types determine and execute the appropriate validation to be performed on the
data during validation

**Kind**: global namespace  

* [types](#types) : <code>object</code>
    * [.strategies](#types.strategies)
    * [.checkSubType(def)](#types.checkSubType) ⇒ <code>Object</code>
    * [.validate(def, key, value, errors)](#types.validate) ⇒ <code>\*</code> &#124; <code>Promise.&lt;\*&gt;</code>
    * [.add(name, handler)](#types.add)
    * [.check(context)](#types.check) ⇒ <code>Promise.&lt;\*&gt;</code>

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
### types.validate(def, key, value, errors) ⇒ <code>\*</code> &#124; <code>Promise.&lt;\*&gt;</code>
Sets up the `fail` method and handles `empty` or `undefined` values. If neither
empty or undefined, calls the appropriate `type` and executes validation

**Kind**: static method of <code>[types](#types)</code>  
**Returns**: <code>\*</code> &#124; <code>Promise.&lt;\*&gt;</code> - The value if empty or undefined, check method if value requires type validation  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | The property configuration |
| key | <code>string</code> | The key name of the property |
| value | <code>\*</code> | The value being validated |
| errors | <code>Array.&lt;{type: string, sub: (string\|number), key: string, value: \*, message: string}&gt;</code> | An error array to which any additional error objects will be added |

<a name="types.add"></a>
### types.add(name, handler)
Add (or override) a type in the library

**Kind**: static method of <code>[types](#types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the type |
| handler | <code>Object</code> &#124; <code>function</code> | The type strategy method |

<a name="types.check"></a>
### types.check(context) ⇒ <code>Promise.&lt;\*&gt;</code>
Ensures that the strategy exists, loads if not already in memory, then ensures
subtype and returns the applied type strategy

**Kind**: static method of <code>[types](#types)</code>  
**Returns**: <code>Promise.&lt;\*&gt;</code> - Resolves with the provided data, possibly modified by the type strategy  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | A type context |

<a name="getMessages"></a>
## getMessages(msgObjs) ⇒ <code>Array.&lt;string&gt;</code>
Compiles array items into string error messages

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msgObjs | <code>Array.&lt;{type: string, sub: (string\|number), key: string, value: \*, message: string}&gt;</code> | Original array of error message objects |

<a name="ValidationError"></a>
## ValidationError(message)
Creates ValidationError object for throwing

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Array.&lt;{type: string, sub: (string\|number), key: string, value: \*, message: string}&gt;</code> | Raw array of error objects |

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

