# Types

Below is a list of supported, built-in types for the Obey library

## Any

Supports any data type or format

## Array

Checks for native type `array`

## Boolean

Checks for native type `boolean`

## Email

Checks for valid email, includes valid characters, `@` separator for address and domain, and valid TLD.

## IP

Checks for valid IP Address:

* `ip`: Default, checks IPv4 format
* `ip:v4`: Checks IPv4 format
* `ip:v6`: Checks IPv6 format

## Number

Checks for native type `number`

## Object

Checks for native type `object`

## Phone

Checks for valid phone numbers:

* `phone`: Default, valid with or without separators
* `phone:numeric`: Check value for numeric phone number, 7-10 digits

## String

Checks for valid string types:

* `string`: Default, `typeof` should be `string`
* `string:alphanumeric`: Checks value contains only alpha-numeric characters

## URL

Checks for valid URL

## UUID

Checks for valid v4 UUID

## Zip

Checks for valid zip/postal codes:

* `zip`: Default, checks generic postal code
* `zip:us`: Checks US zip code format
* `zip:ca`: Checks Canadian zip code format