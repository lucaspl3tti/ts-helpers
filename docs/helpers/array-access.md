# ArrayAccess

Utility methods for safe array access and manipulation.

**Source:** `src/helper/array-access.helper.ts`

---

## Import

```typescript
import { ArrayAccess } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`first`](#first) | `T \| T[] \| undefined` | Get the first item(s) of an array |
| [`last`](#last) | `T \| T[] \| undefined` | Get the last item(s) of an array |
| [`flatten`](#flatten) | `T[]` | Flatten a nested array (optional depth) |
| [`sortByProperty`](#sortbyproperty) | `T[]` | Sort an array of objects by a property |
| [`getObjectByValue`](#getobjectbyvalue) | `T \| undefined` | Find an object by property value |
| [`hasObjectWithValue`](#hasobjectwithvalue) | `boolean` | Check if any object has a given property value |
| [`removeItem`](#removeitem) | `T[]` | Filter out an item or matching items |
| [`getRandomItem`](#getrandomitem) | `T \| undefined` | Get a random item |
| [`wrapInArray`](#wrapinarray) | `T[]` | Wrap a value in an array |
| [`toStringSentence`](#tostringsentence) | `string` | Join as a natural language sentence |
| [`toCommaSeparatedString`](#tocommaseparatedstring) | `string` | Join with commas |
| [`getArrayFromNewlines`](#getarrayfromnewlines) | `string[]` | Split a string by newlines |
| [`getArrayFromCommas`](#getarrayfromcommas) | `string[]` | Split a string by commas |
| [`chunk`](#chunk) | `T[][]` | Split into fixed-size chunks |
| [`unique`](#unique) | `T[]` | Remove duplicate values |
| [`uniqueBy`](#uniqueby) | `T[]` | Remove duplicates by object key |
| [`groupBy`](#groupby) | `Record<string, T[]>` | Group objects by a key |
| [`zip`](#zip) | `[A, B][]` | Combine two arrays into tuples |
| [`intersection`](#intersection) | `T[]` | Elements present in both arrays |
| [`difference`](#difference) | `T[]` | Elements in `a` not in `b` |
| [`union`](#union) | `T[]` | All unique elements from both arrays |

---

## Methods

### `first`

Returns the first item of the array. If `amount` is greater than 1, returns an array of the first `amount` items.

```typescript
static first<Type>(array: Type[], amount?: number): Type | Type[] | undefined
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `array` | `Type[]` | — | Input array |
| `amount` | `number` | `1` | How many items to return |

**Example**

```typescript
ArrayAccess.first([10, 20, 30]);    // 10
ArrayAccess.first([10, 20, 30], 2); // [10, 20]
```

---

### `last`

Returns the last item of the array. If `amount` is greater than 1, returns an array of the last `amount` items.

```typescript
static last<Type>(array: Type[], amount?: number): Type | Type[] | undefined
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `array` | `Type[]` | — | Input array |
| `amount` | `number` | `1` | How many items to return |

**Example**

```typescript
ArrayAccess.last([10, 20, 30]);    // 30
ArrayAccess.last([10, 20, 30], 2); // [20, 30]
```

---

### `flatten`

Recursively flattens a nested array into a single-level array.

```typescript
static flatten<Type>(array: Type[]): Type[]
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `Type[]` | Potentially nested array |

**Example**

```typescript
ArrayAccess.flatten([1, [2, [3, [4]]]]);
// [1, 2, 3, 4]
```

---

### `sortByProperty`

Sorts an array of objects by a given property in ascending order. Returns the mutated array.

```typescript
static sortByProperty<Type, Key extends keyof Type>(
  array: Type[],
  property: Key,
): Type[]
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `Type[]` | Array of objects to sort |
| `property` | `Key` | The property key to sort by |

**Example**

```typescript
const users = [{ name: 'Zara', age: 30 }, { name: 'Anna', age: 25 }];
ArrayAccess.sortByProperty(users, 'name');
// [{ name: 'Anna', age: 25 }, { name: 'Zara', age: 30 }]
```

---

### `getObjectByValue`

Finds and returns the first object in the array where `object[key] === value`. Returns `undefined` if not found.

```typescript
static getObjectByValue<Type extends object, Key extends keyof Type>(
  array: Type[],
  key: Key,
  value: Type[Key],
): Type | undefined
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `Type[]` | Array of objects to search |
| `key` | `Key` | Property key to match against |
| `value` | `Type[Key]` | Value to find |

**Example**

```typescript
const users = [{ id: 1, name: 'Anna' }, { id: 2, name: 'Ben' }];
ArrayAccess.getObjectByValue(users, 'id', 2);
// { id: 2, name: 'Ben' }
```

---

### `hasObjectWithValue`

Returns `true` if at least one object in the array has `object[key] === value`.

```typescript
static hasObjectWithValue<Type>(
  array: Type[],
  key: keyof Type,
  value: Type[keyof Type],
): boolean
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `Type[]` | Array of objects to search |
| `key` | `keyof Type` | Property key to check |
| `value` | `Type[keyof Type]` | Value to look for |

**Example**

```typescript
const users = [{ id: 1, name: 'Anna' }, { id: 2, name: 'Ben' }];
ArrayAccess.hasObjectWithValue(users, 'name', 'Anna'); // true
ArrayAccess.hasObjectWithValue(users, 'name', 'Zara'); // false
```

---

### `removeItem`

Returns a new array with all occurrences of `itemToRemove` filtered out.

```typescript
static removeItem<Type>(array: Type[], itemToRemove: Type): Type[]
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `Type[]` | Source array |
| `itemToRemove` | `Type` | Value to remove (strict equality) |

**Example**

```typescript
ArrayAccess.removeItem([1, 2, 3, 2], 2); // [1, 3]
```

---

### `getRandomItem`

Returns a random item from the array, or `undefined` if the array is empty.

```typescript
static getRandomItem<Type>(array: Type[]): Type | undefined
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `Type[]` | Source array |

**Example**

```typescript
ArrayAccess.getRandomItem(['a', 'b', 'c']); // 'a', 'b', or 'c'
```

---

### `wrapInArray`

Wraps a value in an array. Returns an empty array for `null` or `undefined`. Returns the original array if the value is already an array.

```typescript
static wrapInArray<Type>(value: Type | null | undefined): Type[]
```

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `Type \| null \| undefined` | Value to wrap |

**Example**

```typescript
ArrayAccess.wrapInArray('hello');    // ['hello']
ArrayAccess.wrapInArray([1, 2, 3]); // [1, 2, 3]
ArrayAccess.wrapInArray(null);      // []
```

---

### `toStringSentence`

Joins an array of strings into a natural-language sentence: `"a, b and c."`.

```typescript
static toStringSentence(array: string[]): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `string[]` | Array of strings |

**Example**

```typescript
ArrayAccess.toStringSentence(['apples', 'bananas', 'oranges']);
// 'apples, bananas and oranges.'

ArrayAccess.toStringSentence([]); // ''
```

---

### `toCommaSeparatedString`

Joins an array of strings with `', '`.

```typescript
static toCommaSeparatedString(array: string[]): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `string[]` | Array of strings |

**Example**

```typescript
ArrayAccess.toCommaSeparatedString(['a', 'b', 'c']); // 'a, b, c'
```

---

### `getArrayFromNewlines`

Splits a string into an array by newline characters. Returns an empty array if the string is empty.

```typescript
static getArrayFromNewlines(string: string): string[]
```

| Parameter | Type | Description |
| --- | --- | --- |
| `string` | `string` | Input string |

**Example**

```typescript
ArrayAccess.getArrayFromNewlines('line1\nline2\nline3');
// ['line1', 'line2', 'line3']
```

---

### `getArrayFromCommas`

Splits a string by commas and trims whitespace from each item. Returns an empty array if the string is empty.

```typescript
static getArrayFromCommas(string: string): string[]
```

| Parameter | Type | Description |
| --- | --- | --- |
| `string` | `string` | Input string |

**Example**

```typescript
ArrayAccess.getArrayFromCommas('apple, banana ,cherry');
// ['apple', 'banana', 'cherry']
```

---

### `chunk`

Splits an array into chunks of the given size. The last chunk may be smaller than `size`.

```typescript
static chunk<Type>(array: Type[], size: number): Type[][]
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `Type[]` | Source array |
| `size` | `number` | Maximum items per chunk |

**Example**

```typescript
ArrayAccess.chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]
```

---

### `unique`

Returns a new array with duplicate values removed (uses `Set` equality).

```typescript
static unique<Type>(array: Type[]): Type[]
```

**Example**

```typescript
ArrayAccess.unique([1, 2, 2, 3, 1]);
// [1, 2, 3]
```

---

### `uniqueBy`

Returns a new array with duplicates removed based on the value of a given key. Keeps the first occurrence.

```typescript
static uniqueBy<Type>(array: Type[], key: keyof Type): Type[]
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `Type[]` | Array of objects |
| `key` | `keyof Type` | Property to deduplicate by |

**Example**

```typescript
const users = [
  { id: 1, name: 'Jan' },
  { id: 2, name: 'Luca' },
  { id: 1, name: 'Jan (duplicate)' },
];
ArrayAccess.uniqueBy(users, 'id');
// [{ id: 1, name: 'Jan' }, { id: 2, name: 'Luca' }]
```

---

### `groupBy`

Groups an array of objects by the value of a given key. Returns a record where each key maps to an array of matching items.

```typescript
static groupBy<Type>(array: Type[], key: keyof Type): Record<string, Type[]>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `array` | `Type[]` | Array of objects |
| `key` | `keyof Type` | Property to group by |

**Example**

```typescript
const items = [
  { type: 'fruit', name: 'apple' },
  { type: 'veg', name: 'carrot' },
  { type: 'fruit', name: 'banana' },
];
ArrayAccess.groupBy(items, 'type');
// {
//   fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
//   veg: [{ type: 'veg', name: 'carrot' }]
// }
```

---

### `zip`

Combines two arrays element-by-element into an array of `[a, b]` tuples. The result length equals the shorter array.

```typescript
static zip<A, B>(a: A[], b: B[]): [A, B][]
```

| Parameter | Type | Description |
| --- | --- | --- |
| `a` | `A[]` | First array |
| `b` | `B[]` | Second array |

**Example**

```typescript
ArrayAccess.zip([1, 2, 3], ['a', 'b', 'c']);
// [[1, 'a'], [2, 'b'], [3, 'c']]
```

---

### `intersection`

Returns the elements that are present in **both** arrays.

```typescript
static intersection<Type>(a: Type[], b: Type[]): Type[]
```

**Example**

```typescript
ArrayAccess.intersection([1, 2, 3, 4], [2, 4, 6]);
// [2, 4]
```

---

### `difference`

Returns the elements that are in `a` but **not** in `b`.

```typescript
static difference<Type>(a: Type[], b: Type[]): Type[]
```

**Example**

```typescript
ArrayAccess.difference([1, 2, 3, 4], [2, 4]);
// [1, 3]
```

---

### `union`

Returns a new array containing all unique elements from both arrays.

```typescript
static union<Type>(a: Type[], b: Type[]): Type[]
```

**Example**

```typescript
ArrayAccess.union([1, 2, 3], [2, 3, 4]);
// [1, 2, 3, 4]
```

---
