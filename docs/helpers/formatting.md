# Formatting

Utilities for formatting dates, byte sizes, and strings.

**Source:** `src/helper/formatting.helper.ts`

---

## Import

```typescript
import { Formatting } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`formatDate`](#formatdate) | `string` | Format a date using `Intl.DateTimeFormat` |
| [`formatBytes`](#formatbytes) | `string` | Convert bytes to a human-readable string |
| [`formatNumber`](#formatnumber) | `string` | Format a number using `Intl.NumberFormat` |
| [`decodeString`](#decodestring) | `string` | Decode HTML entities in a string |
| [`truncateString`](#truncatestring) | `string` | Truncate a string with an ellipsis |
| [`camelToDashCase`](#cameltodashcase) | `string` | Convert camelCase to dash-case |
| [`dashToCamelCase`](#dashtocamelcase) | `string` | Convert dash-case to camelCase |
| [`spaceToDashCase`](#spacetodashcase) | `string` | Convert space-separated to dash-case |
| [`capitalize`](#capitalize) | `string` | Capitalise the first letter |
| [`titleCase`](#titlecase) | `string` | Capitalise the first letter of every word |
| [`convertToUnit`](#converttounit) | `string \| null` | Append a CSS unit to a number |
| [`removeWhitespace`](#removewhitespace) | `string` | Strip leading indentation from multiline strings |

---

## Methods

### `formatDate`

Formats a date string or `Date` object using the browser's locale and `Intl.DateTimeFormat`.

Defaults to `{ day: '2-digit', month: '2-digit', year: 'numeric' }` if no options are provided. Locale is determined from `navigator.language` (falls back to `'de-DE'`).

Throws if the value is empty or invalid.

```typescript
static formatDate(
  value: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| Date` | — | Date string or `Date` object |
| `options` | `Intl.DateTimeFormatOptions` | `{ day: '2-digit', month: '2-digit', year: 'numeric' }` | Format options passed to `Intl.DateTimeFormat` |

**Example**

```typescript
Formatting.formatDate('2026-01-15');
// '15.01.2026' (with de-DE locale)

Formatting.formatDate(new Date(), { month: 'long', year: 'numeric' });
// e.g. 'Januar 2026'
```

---

### `formatBytes`

Converts a byte count to a human-readable string with the appropriate unit.

```typescript
static formatBytes(bytes: number): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `bytes` | `number` | Number of bytes |

**Example**

```typescript
Formatting.formatBytes(0);              // '0 Bytes'
Formatting.formatBytes(1024);           // '1 kb'
Formatting.formatBytes(1048576);        // '1 mb'
Formatting.formatBytes(1073741824);     // '1 gb'
```

---

### `decodeString`

Decodes HTML entities in a string by leveraging a temporary `<textarea>` element.

```typescript
static decodeString(string: string): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `string` | `string` | String that may contain HTML entities |

**Example**

```typescript
Formatting.decodeString('Hello &amp; World');
// 'Hello & World'

Formatting.decodeString('&lt;div&gt;');
// '<div>'
```

---

### `truncateString`

Truncates a string to `maxCharacters` and appends an ellipsis (`…`). If `useWordBoundary` is `true` (default), the cut happens at the last space before the limit.

Returns the original string unchanged if it is within the limit.

```typescript
static truncateString(
  string: string,
  maxCharacters: number,
  useWordBoundary?: boolean,
): string
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `string` | `string` | — | Source string |
| `maxCharacters` | `number` | — | Maximum character count (including ellipsis) |
| `useWordBoundary` | `boolean` | `true` | Cut at the last space rather than mid-word |

**Example**

```typescript
Formatting.truncateString('Hello, World! This is a long text.', 20);
// 'Hello, World! This…'

Formatting.truncateString('Hello, World! This is a long text.', 20, false);
// 'Hello, World! This i…'
```

---

### `camelToDashCase`

Converts a camelCase string to dash-case (kebab-case).

```typescript
static camelToDashCase(string: string): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `string` | `string` | camelCase string |

**Example**

```typescript
Formatting.camelToDashCase('backgroundColor'); // 'background-color'
Formatting.camelToDashCase('myVariableName');   // 'my-variable-name'
```

---

### `spaceToDashCase`

Converts the first space in a string to a dash and lowercases the result.

```typescript
static spaceToDashCase(string: string): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `string` | `string` | Space-separated string |

**Example**

```typescript
Formatting.spaceToDashCase('my button');  // 'my-button'
Formatting.spaceToDashCase('Hello World'); // 'hello-world'
```

---

### `convertToUnit`

Appends a CSS unit suffix to a number or numeric string. Returns `null` for non-finite or empty values. Returns the original string unchanged if it is not numeric.

```typescript
static convertToUnit(string: string | number, unit?: string): string | null
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `string` | `string \| number` | — | The value to convert |
| `unit` | `string` | `'px'` | The unit suffix to append |

**Example**

```typescript
Formatting.convertToUnit(16);        // '16px'
Formatting.convertToUnit(1.5, 'rem'); // '1.5rem'
Formatting.convertToUnit('');        // null
Formatting.convertToUnit('auto');    // 'auto' (non-numeric string returned as-is)
```

---

### `removeWhitespace`

Strips the common leading indentation from each line of a multiline string. Useful for cleaning up template literals.

```typescript
static removeWhitespace(str: string): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `str` | `string` | Indented multiline string |

**Example**

```typescript
const html = Formatting.removeWhitespace(`
  <div>
    <p>Hello</p>
  </div>
`);
// '<div>\n  <p>Hello</p>\n</div>\n'
```

---

### `formatNumber`

Formats a number using the browser locale and `Intl.NumberFormat`. Locale defaults to `navigator.language` (falls back to `'de-DE'`).

```typescript
static formatNumber(
  n: number,
  locale?: string,
  options?: Intl.NumberFormatOptions,
): string
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `n` | `number` | — | The number to format |
| `locale` | `string` | `navigator.language \| 'de-DE'` | BCP 47 locale string |
| `options` | `Intl.NumberFormatOptions` | `undefined` | Options passed to `Intl.NumberFormat` |

**Example**

```typescript
Formatting.formatNumber(1234567.89);
// '1.234.567,89' (de-DE locale)

Formatting.formatNumber(1234567.89, 'en-US');
// '1,234,567.89'

Formatting.formatNumber(0.42, 'en-US', { style: 'percent' });
// '42%'
```

---

### `dashToCamelCase`

Converts a dash-case (kebab-case) string to camelCase.

```typescript
static dashToCamelCase(string: string): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `string` | `string` | dash-case string |

**Example**

```typescript
Formatting.dashToCamelCase('background-color'); // 'backgroundColor'
Formatting.dashToCamelCase('my-variable-name'); // 'myVariableName'
```

---

### `capitalize`

Capitalises the first letter of a string, leaving the rest unchanged.

```typescript
static capitalize(string: string): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `string` | `string` | Source string |

**Example**

```typescript
Formatting.capitalize('hello world'); // 'Hello world'
Formatting.capitalize('');            // ''
```

---

### `titleCase`

Capitalises the first letter of every word in a string.

```typescript
static titleCase(string: string): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `string` | `string` | Source string |

**Example**

```typescript
Formatting.titleCase('hello world');     // 'Hello World'
Formatting.titleCase('the quick brown'); // 'The Quick Brown'
```

---
