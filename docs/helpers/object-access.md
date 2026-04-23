# ObjectAccess

Utility methods for safe object access and manipulation.

**Source:** `src/helper/object-access.helper.ts`

---

## Import

```typescript
import { ObjectAccess } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`length`](#length) | `number` | Count the number of own keys |
| [`has`](#has) | `boolean` | Check if all given keys exist |
| [`first`](#first) | `JsonObject \| JsonObject[] \| undefined` | Get the first entry/entries |
| [`last`](#last) | `JsonObject \| JsonObject[] \| undefined` | Get the last entry/entries |
| [`addProperty`](#addproperty) | `object` | Add a property immutably |
| [`removeProperty`](#removeproperty) | `JsonObject` | Remove a property immutably |
| [`getRandomProperty`](#getrandomproperty) | `JsonObject \| undefined` | Get a random entry |
| [`deepClone`](#deepclone) | `T` | Deep clone any value using `structuredClone` |
| [`pick`](#pick) | `Pick<T, K>` | Keep only specified keys |
| [`omit`](#omit) | `Omit<T, K>` | Remove specified keys |
| [`deepMerge`](#deepmerge) | `T` | Recursively merge two objects |
| [`mapValues`](#mapvalues) | `Record<keyof T, V>` | Transform all values with a function |

---

## Methods

### `length`

Returns the number of own enumerable keys of the object.

```typescript
static length(object: JsonObject): number
```

| Parameter | Type | Description |
| --- | --- | --- |
| `object` | `JsonObject` | The object to count keys on |

**Example**

```typescript
ObjectAccess.length({ a: 1, b: 2, c: 3 }); // 3
ObjectAccess.length({});                    // 0
```

---

### `has`

Returns `true` if the object has **all** of the given keys as own properties.

```typescript
static has(object: JsonObject, key: (keyof JsonObject)[]): boolean
```

| Parameter | Type | Description |
| --- | --- | --- |
| `object` | `JsonObject` | The object to inspect |
| `key` | `(keyof JsonObject)[]` | Array of keys that must all be present |

**Example**

```typescript
const obj = { name: 'Jan', age: 30 };
ObjectAccess.has(obj, ['name', 'age']);   // true
ObjectAccess.has(obj, ['name', 'email']); // false
```

---

### `first`

Returns the first entry of the object as `[key, value]`. If `amount` is greater than 1, returns an array of the first `amount` entries.

```typescript
static first<Key extends string | number | symbol>(
  object: JsonObject,
  amount?: number,
): JsonObject | JsonObject[] | undefined
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `object` | `JsonObject` | — | Source object |
| `amount` | `number` | `1` | Number of entries to return |

**Example**

```typescript
const obj = { a: 1, b: 2, c: 3 };
ObjectAccess.first(obj);    // ['a', 1]
ObjectAccess.first(obj, 2); // [['a', 1], ['b', 2]]
```

---

### `last`

Returns the last entry of the object as `[key, value]`. If `amount` is greater than 1, returns an array of the last `amount` entries.

```typescript
static last<Key extends string | number | symbol>(
  object: JsonObject,
  amount?: number,
): JsonObject | JsonObject[] | undefined
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `object` | `JsonObject` | — | Source object |
| `amount` | `number` | `1` | Number of entries to return |

**Example**

```typescript
const obj = { a: 1, b: 2, c: 3 };
ObjectAccess.last(obj);    // ['c', 3]
ObjectAccess.last(obj, 2); // [['b', 2], ['c', 3]]
```

---

### `addProperty`

Returns a new object with the given key/value pair added. Does not mutate the original.

```typescript
static addProperty<Key extends string | number | symbol, Value>(
  object: { [key: string | number | symbol]: any },
  keyToAdd: Key,
  valueToAdd: Value,
): { [key: string | number | symbol]: any }
```

| Parameter | Type | Description |
| --- | --- | --- |
| `object` | `object` | Source object |
| `keyToAdd` | `Key` | Key to add |
| `valueToAdd` | `Value` | Value for the new key |

**Example**

```typescript
const original = { name: 'Jan' };
const updated = ObjectAccess.addProperty(original, 'age', 30);
// updated: { name: 'Jan', age: 30 }
// original is unchanged
```

---

### `removeProperty`

Returns a new object with the given key removed. Does not mutate the original.

```typescript
static removeProperty<Key extends string | number | symbol>(
  object: JsonObject,
  keyToRemove: Key,
): JsonObject
```

| Parameter | Type | Description |
| --- | --- | --- |
| `object` | `JsonObject` | Source object |
| `keyToRemove` | `Key` | Key to remove |

**Example**

```typescript
const original = { name: 'Jan', age: 30, role: 'admin' };
const updated = ObjectAccess.removeProperty(original, 'role');
// updated: { name: 'Jan', age: 30 }
```

---

### `getRandomProperty`

Returns a random entry of the object as `[key, value]`.

```typescript
static getRandomProperty<Key extends string | number | symbol>(
  object: JsonObject,
): JsonObject | undefined
```

| Parameter | Type | Description |
| --- | --- | --- |
| `object` | `JsonObject` | Source object |

**Example**

```typescript
const obj = { x: 10, y: 20, z: 30 };
ObjectAccess.getRandomProperty(obj);
// e.g. ['y', 20]
```

---

### `deepClone`

Creates a deep clone of the given value using the native `structuredClone` API. Supports objects, arrays, `Date`, `Map`, `Set`, and more.

```typescript
static deepClone<T>(object: T): T
```

| Parameter | Type | Description |
| --- | --- | --- |
| `object` | `T` | Value to clone |

**Example**

```typescript
const original = { a: { b: { c: 42 } }, date: new Date() };
const clone = ObjectAccess.deepClone(original);
clone.a.b.c = 99;
original.a.b.c; // still 42
clone.date instanceof Date; // true
```

---

### `pick`

Returns a new object containing only the specified keys.

```typescript
static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `obj` | `T` | Source object |
| `keys` | `K[]` | Keys to include |

**Example**

```typescript
const user = { id: 1, name: 'Jan', role: 'admin', age: 30 };
ObjectAccess.pick(user, ['id', 'name']);
// { id: 1, name: 'Jan' }
```

---

### `omit`

Returns a new object with the specified keys removed.

```typescript
static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `obj` | `T` | Source object |
| `keys` | `K[]` | Keys to exclude |

**Example**

```typescript
const user = { id: 1, name: 'Jan', password: 'secret' };
ObjectAccess.omit(user, ['password']);
// { id: 1, name: 'Jan' }
```

---

### `deepMerge`

Recursively merges `source` into `target` and returns a new object. Nested objects are merged; arrays and primitives from `source` overwrite `target`.

```typescript
static deepMerge<T extends object>(target: T, source: Partial<T>): T
```

| Parameter | Type | Description |
| --- | --- | --- |
| `target` | `T` | Base object |
| `source` | `Partial<T>` | Values to merge in |

**Example**

```typescript
const defaults = { theme: 'light', font: { size: 14, family: 'sans' } };
const overrides = { font: { size: 16 } };
ObjectAccess.deepMerge(defaults, overrides);
// { theme: 'light', font: { size: 16, family: 'sans' } }
```

---

### `mapValues`

Returns a new object with the same keys but all values transformed by the given function.

```typescript
static mapValues<T extends object, V>(
  obj: T,
  fn: (val: T[keyof T], key: keyof T) => V,
): Record<keyof T, V>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `obj` | `T` | Source object |
| `fn` | `(val, key) => V` | Transform function applied to each value |

**Example**

```typescript
const prices = { apple: 1.5, banana: 0.75, cherry: 3.0 };
ObjectAccess.mapValues(prices, (val) => val * 2);
// { apple: 3, banana: 1.5, cherry: 6 }
```

---
