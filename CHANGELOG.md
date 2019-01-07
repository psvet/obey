### v3.0.0 (2019-01-05):

* *BREAKING*: Removed Babel dependency. This effectively drops support for Node versions <6.

* Fixed bug around `allowNull` and non-`null` falsey default values ([#71](https://github.com/psvet/obey/issues/71)).

### v2.0.0 (2018-03-28):

* *BREAKING*: Changed default `zip` to US regex pattern. The original default pattern was discovered to be overly lenient and was removed.
