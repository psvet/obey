### v5.0.0 (2020-09-01):

* Migrated tests from mocha to jest.
* Update default `uuid` type to be case insensitive.
* Replace travis with github actions for CI.

### v4.1.1 (2019-07-04):

* Fixed bug around `allow` stomping on `empty` when validating strings. Originally using `allow` would require specifying `''` as an allowed value, even if `empty` was also enabled.

### v4.1.0 (2019-06-19):

* Added `jexl` validator method for evaluating data against [Jexl](https://github.com/TomFrost/Jexl) expressions.

* Added root `use` method for adding plugin references to external packages. (Currently only used by `jexl` validator.)

### v4.0.2 (2019-06-01):

* Fixed bug in `zip` type that disallowed numeric values. Now values are coerced to strings before validation checks.

### v4.0.1 (2019-05-16):

* Added Node 12 to Travis config.

* Updated vulnerable dependencies.

### v4.0.0 (2019-05-03):

* *BREAKING*: Fixed bug allowing empty string values for predefined types, even when required ([#76](https://github.com/psvet/obey/issues/76)).

### v3.0.5 (2019-04-19):

* Conditional require rules (`requiredIf`, `requiredIfNot`) are now removed if a `creator` or `default` rule is defined.

### v3.0.0 (2019-01-05):

* *BREAKING*: Removed Babel dependency. This effectively drops support for Node versions <6.

* Fixed bug around `allowNull` and non-`null` falsey default values ([#71](https://github.com/psvet/obey/issues/71)).

### v2.0.0 (2018-03-28):

* *BREAKING*: Changed default `zip` to US regex pattern. The original default pattern was discovered to be overly lenient and was removed.
