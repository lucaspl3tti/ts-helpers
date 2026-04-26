# StringHelper

Advanced string manipulation utilities beyond the basic formatting available in `Formatting`.

**Source:** `src/helper/string.helper.ts`

---

## Import

```typescript
import { StringHelper } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`slugify`](#slugify) | `string` | Convert a string to a URL-safe slug |
| [`truncateMiddle`](#truncatemiddle) | `string` | Truncate in the middle with an ellipsis |
| [`countOccurrences`](#countoccurrences) | `number` | Count occurrences of a substring |
| [`stripHtml`](#striphtml) | `string` | Remove all HTML tags |
| [`template`](#template) | `string` | Interpolate `{key}` placeholders |
| [`capitalize`](#capitalize) | `string` | Capitalise the first letter |
| [`titleCase`](#titlecase) | `string` | Capitalise the first letter of every word |

---

## Methods

### `slugify`

Converts a string to a URL-safe slug: lowercased, diacritics removed, non-alphanumeric characters replaced with dashes.

```typescript
static slugify(str: string): string
```

**Example**

```typescript
StringHelper.slugify('Hello World!');     // 'hello-world'
StringHelper.slugify('Über uns');         // 'uber-uns'
StringHelper.slugify('  foo  bar  ');     // 'foo-bar'
```

---

### `truncateMiddle`

Truncates the string to `maxLen` characters, preserving the start and end and inserting an ellipsis (`…`) in the middle.

```typescript
static truncateMiddle(str: string, maxLen: number): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `str` | `string` | Source string |
| `maxLen` | `number` | Maximum total length including the ellipsis |

**Example**

```typescript
StringHelper.truncateMiddle('hello-world-example', 11);
// 'hello…ample'

StringHelper.truncateMiddle('short', 10);
// 'short' (unchanged)
```

---

### `countOccurrences`

Count the number of non-overlapping occurrences of `search` in `str`.

```typescript
static countOccurrences(str: string, search: string): number
```

**Example**

```typescript
StringHelper.countOccurrences('banana', 'an');  // 2
StringHelper.countOccurrences('hello', 'x');    // 0
StringHelper.countOccurrences('aaa', '');       // 0
```

---

### `stripHtml`

Remove all HTML tags from a string, returning the plain text content.

```typescript
static stripHtml(str: string): string
```

**Example**

```typescript
StringHelper.stripHtml('<b>Hello</b> <em>World</em>');
// 'Hello World'

StringHelper.stripHtml('<p>Line 1</p><p>Line 2</p>');
// 'Line 1Line 2'
```

---

### `template`

Replace `{key}` placeholders in a string with values from a record. Unknown placeholders are left unchanged.

```typescript
static template(str: string, vars: Record<string, string>): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `str` | `string` | Template string with `{key}` placeholders |
| `vars` | `Record<string, string>` | Key/value map for substitution |

**Example**

```typescript
StringHelper.template('Hello {name}!', { name: 'Jan' });
// 'Hello Jan!'

StringHelper.template('{greeting}, {name}.', { greeting: 'Hi', name: 'Luca' });
// 'Hi, Luca.'

StringHelper.template('{a} and {b}', { a: 'x' });
// 'x and {b}'  ← unknown placeholder preserved
```

---

### `capitalize`

Capitalise only the first letter of the string, leaving the rest unchanged.

```typescript
static capitalize(str: string): string
```

**Example**

```typescript
StringHelper.capitalize('hello world');  // 'Hello world'
StringHelper.capitalize('');             // ''
```

---

### `titleCase`

Capitalise the first letter of every word.

```typescript
static titleCase(str: string): string
```

**Example**

```typescript
StringHelper.titleCase('hello world');     // 'Hello World'
StringHelper.titleCase('the quick brown'); // 'The Quick Brown'
```
