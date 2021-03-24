# union-exclusive

[![NPM version](https://img.shields.io/npm/v/union-exclusive.svg)](https://www.npmjs.com/package/union-exclusive)
[![NPM yearly download](https://img.shields.io/npm/dy/union-exclusive.svg)](https://www.npmjs.com/package/union-exclusive)

> Compose custom types containing multiple mutually exclusive type and works with Primitive and Tuple.

## Description

### The problem

Using mutually exclusives types _(XOR)_ is not a default feature in Typescript, [see this](https://github.com/Microsoft/TypeScript/issues/14094)

### The solution

**This package allow it by introducing the new type `XORS` type**

```ts
type MyUnionType = UnionExclusive<
  A | B | C | string | number[] | [string, number, boolean]
>;
```

`UnionExclusive` type take a list of type without size restriction include Primitive and Tuple type.
_Check the examples for more comprehension_

### The implementation

We are ending up with this truth table.
| A | B | C | ... | Result |
| :-: | :-: | :-: | :-: | :-: |
| 0 | 0 | 0 | ... | 0 |
| 1 | 0 | 0 | ... | 1 |
| 0 | 1 | 0 | ... | 1 |
| 0 | 0 | 1 | ... | 1 |
| 1 | 1 | 0 | ... | 0 |
| 1 | 0 | 1 | ... | 0 |
| 0 | 1 | 1 | ... | 0 |
| 1 | 1 | 1 | ... | 0 |

## Installation

```bash
yarn add -D union-exclusive
```

### Examples

**Codesandbox:** https://codesandbox.io/s/union-exclusive-demo-7flig

```ts
import {UnionExclusive} from 'union-exclusive';

interface Person1 {
  name: string;
}

interface Person2 {
  age: number;
}

interface Person3 {
  rich: boolean;
}

type Person = UnionExclusive<Person1 | Person2 | Person3>;

const person_1: Person = {
  name: 'john doe',
}; // OK

const person_2: Person = {
  age: 18,
}; // OK

const person_3: Person = {
  rich: false,
}; // OK

const person_4: Person = {
  name: 'john doe',
  age: 18,
}; // FAILS

const person_5: Person = {
  age: 18,
  rich: false,
}; // FAILS

const person_6: Person = {
  name: 'john doe',
  rich: false,
}; // FAILS

// And
// Works with Primitive and Tuple
type AnotherPerson = UnionExclusive<
  Person1 | Person2 | Person3 | boolean | boolean[] | [string, number, boolean]
>;
const person_7: AnotherPerson = true;
const person_8: AnotherPerson = [true, true];
const person_9: AnotherPerson = ['john doe', 18, true];
```

## Related

- [ts-xor](https://www.npmjs.com/package/ts-xor)
- [ts-xors](https://www.npmjs.com/package/ts-xors)

## License

MIT
