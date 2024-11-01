# cedric0303/id-generator

## Installation

Install globally to use `sgid` or `hkid`:

```sh
npm install --global @cedric0303/id-generator

yarn global add @cedric0303/id-generator

bun add --global @cedric0303/id-generator
```

Install locally to use in projects:

```sh
npm install @cedric0303/id-generator

yarn add @cedric0303/id-generator

bun add @cedric0303/id-generator
```

## Global Usage

```sh
> sgid
A5758052

> hkid
S8541816E

// output automatically copied to clipboard
```

## Module/Programmatic Usage

npm-check-updates can be imported as a module:

```js
import {
  randomHKID,
  randomSGID,
  isValidHKID,
  isValidSGID
} from "@cedric0303/id-generator";;

const hkid = await randomHKID();
const sgid = await randomSGID();

console.log(hkid, isValidHKID(hkid));
console.log(sgid, isValidSGID(sgid));
```

## Acknowledgement

This project incorporates code from the following projects:

- [hkid-generator](https://github.com/icelam/hkid-generator) by [[icelam](https://github.com/icelam)] (License: ISC)
- [singapore-nric](https://github.com/samliew/singapore-nric) by [[samliew](https://github.com/]samliew)] (License: MIT)
