# Utilities

General-purpose utility functions for delays, debouncing, iteration, validation, and random generation.

**Source:** `src/helper/utilities.helper.ts`

---

## Import

```typescript
import { Utilities } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`delay`](#delay) | `Promise<void>` | Async delay for a given number of milliseconds |
| [`debounce`](#debounce) | `(...args) => void` | Debounce a function call |
| [`throttle`](#throttle) | `T` | Throttle a function to max once per interval |
| [`memoize`](#memoize) | `T` | Cache function results by arguments |
| [`pipe`](#pipe) | `(arg: T) => T` | Left-to-right function composition |
| [`compose`](#compose) | `(arg: T) => T` | Right-to-left function composition |
| [`isEmpty`](#isempty) | `boolean` | Check if a value is empty |
| [`iterate`](#iterate) | `void` | Iterate over Map, Array, FormData, object, or string |
| [`getFormDataFromJson`](#getformdatafromjson) | `FormData` | Convert a JSON object to FormData |
| [`getRandomNumber`](#getrandomnumber) | `number` | Random integer in a range |
| [`numberIsEven`](#numberiseven) | `boolean` | Check if a number is even |
| [`numberIsOdd`](#numberisodd) | `boolean` | Check if a number is odd |
| [`calculatePxFromRem`](#calculatepxfromrem) | `number` | Convert REM to pixels |
| [`clamp`](#clamp) | `number` | Clamp a value between min and max |
| [`createClamper`](#createclamper) | `(value) => number` | Create a reusable clamping function |
| [`isValidEmail`](#isvalidemail) | `boolean` | Validate an email address |
| [`getNextSmallerHeadingType`](#getnextsmallerheadingtype) | `HeadingType` | Step down a heading level |
| [`generateRandomText`](#generaterandomtext) | `string` | Generate a random text string |

---

## Methods

### `delay`

Pauses async execution for the given number of milliseconds.

> Must be called with `await`.

```typescript
static delay(milliseconds: number): Promise<void>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `milliseconds` | `number` | Duration to wait in ms |

**Example**

```typescript
await Utilities.delay(1000); // wait 1 second
console.log('done');
```

---

### `debounce`

Wraps a function so it only executes after the specified delay has elapsed since the last call.

```typescript
static debounce<Type extends (...args: any[]) => void>(
  callback: Type,
  delay: number,
): (...args: Parameters<Type>) => void
```

| Parameter | Type | Description |
| --- | --- | --- |
| `callback` | `Type` | The function to debounce |
| `delay` | `number` | Delay in milliseconds |

**Example**

```typescript
const onResize = Utilities.debounce(() => {
  console.log('resized');
}, 200);

window.addEventListener('resize', onResize);
```

---

### `isEmpty`

Returns `true` if the value is considered empty. Handles strings (whitespace-only), arrays, Maps, Sets, FormData, and plain objects.

```typescript
static isEmpty<Type>(value: Type): boolean
```

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `Type` | The value to check |

**Example**

```typescript
Utilities.isEmpty('');          // true
Utilities.isEmpty('  ');        // true
Utilities.isEmpty([]);          // true
Utilities.isEmpty({});          // true
Utilities.isEmpty(new Map());   // true
Utilities.isEmpty('hello');     // false
```

---

### `iterate`

Iterates over a Map, Array, FormData, plain object, or string, calling `callback` for each entry.

```typescript
static iterate<Key extends string | number, Item>(
  source: Map<Key, Item> | Array<Item> | FormData | object | string,
  callback: (value: Item, key?: Key) => void,
): void
```

| Parameter | Type | Description |
| --- | --- | --- |
| `source` | `Map \| Array \| FormData \| object \| string` | The data to iterate over |
| `callback` | `(value, key?) => void` | Called with each value and optional key |

**Example**

```typescript
Utilities.iterate({ a: 1, b: 2 }, (value, key) => {
  console.log(key, value); // 'a' 1, 'b' 2
});

Utilities.iterate(['x', 'y'], (value, index) => {
  console.log(index, value); // 0 'x', 1 'y'
});
```

---

### `getFormDataFromJson`

Recursively converts a JSON object to a `FormData` instance. Nested objects use dot-notation keys.

```typescript
static getFormDataFromJson(
  jsonObject: JsonObject,
  parentKey?: string,
): FormData
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `jsonObject` | `JsonObject` | — | The object to convert |
| `parentKey` | `string` | `''` | Prefix for nested keys (used internally) |

**Example**

```typescript
const data = Utilities.getFormDataFromJson({ name: 'Jan', address: { city: 'Berlin' } });
// FormData entries: 'name' → 'Jan', 'address.city' → 'Berlin'
```

---

### `getRandomNumber`

Returns a random integer between `minimumValue` and `maximumValue` (both inclusive).

```typescript
static getRandomNumber(minimumValue: number, maximumValue: number): number
```

| Parameter | Type | Description |
| --- | --- | --- |
| `minimumValue` | `number` | Lower bound (inclusive) |
| `maximumValue` | `number` | Upper bound (inclusive) |

**Example**

```typescript
Utilities.getRandomNumber(1, 6); // dice roll: 1–6
```

---

### `numberIsEven`

Returns `true` if the number is even.

```typescript
static numberIsEven(number: number): boolean
```

**Example**

```typescript
Utilities.numberIsEven(4); // true
Utilities.numberIsEven(7); // false
```

---

### `numberIsOdd`

Returns `true` if the number is odd.

```typescript
static numberIsOdd(number: number): boolean
```

**Example**

```typescript
Utilities.numberIsOdd(3); // true
Utilities.numberIsOdd(8); // false
```

---

### `calculatePxFromRem`

Converts a REM value to pixels based on the root element's computed font size.

```typescript
static calculatePxFromRem(rem: number | string): number
```

| Parameter | Type | Description |
| --- | --- | --- |
| `rem` | `number \| string` | REM value (e.g. `1.5` or `'1.5rem'`) |

**Example**

```typescript
// Assuming root font-size is 16px:
Utilities.calculatePxFromRem(1);     // 16
Utilities.calculatePxFromRem('1.5'); // 24
```

---

### `clamp`

Clamps `value` so it is never below `min` or above `max`.

```typescript
static clamp(value: number, min: number, max: number): number
```

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `number` | Input value |
| `min` | `number` | Lower bound |
| `max` | `number` | Upper bound |

**Example**

```typescript
Utilities.clamp(150, 0, 100); // 100
Utilities.clamp(-5, 0, 100);  // 0
Utilities.clamp(50, 0, 100);  // 50
```

---

### `createClamper`

Returns a reusable clamping function bound to the given `min` and `max`.

```typescript
static createClamper(min: number, max: number): (value: number) => number
```

| Parameter | Type | Description |
| --- | --- | --- |
| `min` | `number` | Lower bound |
| `max` | `number` | Upper bound |

**Example**

```typescript
const clampRgb = Utilities.createClamper(0, 255);
clampRgb(300); // 255
clampRgb(-10); // 0
```

---

### `isValidEmail`

Tests whether a string is a valid email address using a regex pattern.

```typescript
static isValidEmail(email: string): boolean
```

| Parameter | Type | Description |
| --- | --- | --- |
| `email` | `string` | The email address to validate |

**Example**

```typescript
Utilities.isValidEmail('user@example.com'); // true
Utilities.isValidEmail('not-an-email');     // false
```

---

### `getNextSmallerHeadingType`

Returns the next smaller heading level (`h1` → `h2` → ... → `h6`). Falls back to `h1` for invalid input and stays at `h6` if already at the smallest level.

```typescript
static getNextSmallerHeadingType(headingType: string): HeadingType
```

| Parameter | Type | Description |
| --- | --- | --- |
| `headingType` | `string` | Current heading tag, e.g. `'h2'` |

**Example**

```typescript
Utilities.getNextSmallerHeadingType('h1'); // 'h2'
Utilities.getNextSmallerHeadingType('h5'); // 'h6'
Utilities.getNextSmallerHeadingType('h6'); // 'h6'
```

---

### `generateRandomText`

Generates a random string of the given length using uppercase letters, lowercase letters, and digits. Optionally enforce minimum character type requirements.

```typescript
static generateRandomText(length: number, options?: RandomTextOptions): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `length` | `number` | Total character count |
| `options` | `RandomTextOptions` | Optional minimum character type requirements |

See [`RandomTextOptions`](../types.md#randomtextoptions) for option details.

> If the total of `minUppercase + minLowercase + minNumbers` exceeds `length`, the length is automatically increased with a console warning.

**Example**

```typescript
Utilities.generateRandomText(10);
// e.g. 'aB3xR7mKpQ'

Utilities.generateRandomText(12, { minUppercase: 2, minNumbers: 3 });
// e.g. 'A4b9Xc1mKpZ2'
```

---

### `throttle`

Returns a throttled version of `fn` that is called **at most once** per `ms` milliseconds, regardless of how many times it is invoked.

> Use `throttle` for continuous events like `scroll` or `mousemove`. Use `debounce` when you want to wait until activity stops.

```typescript
static throttle<T extends (...args: any[]) => void>(fn: T, ms: number): T
```

| Parameter | Type | Description |
| --- | --- | --- |
| `fn` | `T` | Function to throttle |
| `ms` | `number` | Minimum milliseconds between calls |

**Example**

```typescript
const onScroll = Utilities.throttle(() => {
  console.log('scroll', window.scrollY);
}, 100);

window.addEventListener('scroll', onScroll);
```

---

### `memoize`

Returns a memoized version of `fn`. Subsequent calls with the same arguments return the cached result instead of re-executing the function.

> Uses `JSON.stringify` for cache key generation — works for serialisable arguments only.

```typescript
static memoize<T extends (...args: any[]) => any>(fn: T): T
```

| Parameter | Type | Description |
| --- | --- | --- |
| `fn` | `T` | Pure function to memoize |

**Example**

```typescript
const expensiveCalc = Utilities.memoize((n: number) => {
  console.log('computing...');
  return n * n;
});

expensiveCalc(4); // logs 'computing...' → 16
expensiveCalc(4); // cached → 16 (no log)
```

---

### `pipe`

Left-to-right function composition. `pipe(f, g, h)(x)` is equivalent to `h(g(f(x)))`.

```typescript
static pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T
```

| Parameter | Type | Description |
| --- | --- | --- |
| `...fns` | `Array<(arg: T) => T>` | Functions to compose left-to-right |

**Example**

```typescript
const process = Utilities.pipe(
  (s: string) => s.trim(),
  (s) => s.toLowerCase(),
  (s) => s.replace(/ /g, '-'),
);

process('  Hello World  '); // 'hello-world'
```

---

### `compose`

Right-to-left function composition. `compose(f, g, h)(x)` is equivalent to `f(g(h(x)))`.

```typescript
static compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T
```

| Parameter | Type | Description |
| --- | --- | --- |
| `...fns` | `Array<(arg: T) => T>` | Functions to compose right-to-left |

**Example**

```typescript
const process = Utilities.compose(
  (s: string) => s.replace(/ /g, '-'),
  (s) => s.toLowerCase(),
  (s) => s.trim(),
);

process('  Hello World  '); // 'hello-world'
```

---
