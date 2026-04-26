# Validation

Common validation helpers for emails, URLs, phone numbers, numbers, ranges, and IBANs.

**Source:** `src/helper/validation.helper.ts`

---

## Import

```typescript
import { Validation } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`isValidEmail`](#isvalidemail) | `boolean` | Validate an email address |
| [`isUrl`](#isurl) | `boolean` | Validate an absolute HTTP(S) URL |
| [`isPhoneNumber`](#isphonenumber) | `boolean` | Validate a phone number |
| [`isNumeric`](#isnumeric) | `boolean` | Check if a string is a finite number |
| [`isBetween`](#isbetween) | `boolean` | Check if a number is within a range |
| [`isIban`](#isiban) | `boolean` | Validate an IBAN (ISO 13616-1 + Modulo-97) |

---

## Methods

### `isValidEmail`

Returns `true` when the string is a syntactically valid email address. Supports `+` aliases.

> This method is also available on `Utilities` (which is now `@deprecated` in favour of `Validation`).

```typescript
static isValidEmail(email: string): boolean
```

**Example**

```typescript
Validation.isValidEmail('jan@example.com');       // true
Validation.isValidEmail('jan+tag@example.com');   // true
Validation.isValidEmail('not-an-email');           // false
```

---

### `isUrl`

Returns `true` when the string is a valid absolute HTTP or HTTPS URL.

```typescript
static isUrl(str: string): boolean
```

**Example**

```typescript
Validation.isUrl('https://example.com');       // true
Validation.isUrl('http://localhost:3000');      // true
Validation.isUrl('ftp://files.example.com');   // false
Validation.isUrl('not a url');                 // false
```

---

### `isPhoneNumber`

Returns `true` when the string looks like a valid phone number (E.164-style or national format). Accepts digits, spaces, dashes, parentheses, and an optional leading `+`.

```typescript
static isPhoneNumber(str: string): boolean
```

**Example**

```typescript
Validation.isPhoneNumber('+49 123 4567890');  // true
Validation.isPhoneNumber('0123-456789');      // true
Validation.isPhoneNumber('abc');              // false
```

---

### `isNumeric`

Returns `true` when the string represents a finite number (integer or decimal, optionally negative).

```typescript
static isNumeric(str: string): boolean
```

**Example**

```typescript
Validation.isNumeric('42');      // true
Validation.isNumeric('-3.14');   // true
Validation.isNumeric('');        // false
Validation.isNumeric('abc');     // false
```

---

### `isBetween`

Returns `true` when `n` is within the closed interval `[min, max]`.

```typescript
static isBetween(n: number, min: number, max: number): boolean
```

| Parameter | Type | Description |
| --- | --- | --- |
| `n` | `number` | Value to check |
| `min` | `number` | Lower bound (inclusive) |
| `max` | `number` | Upper bound (inclusive) |

**Example**

```typescript
Validation.isBetween(5, 1, 10);   // true
Validation.isBetween(0, 1, 10);   // false
Validation.isBetween(10, 1, 10);  // true
```

---

### `isIban`

Returns `true` when the string is a structurally valid IBAN (ISO 13616-1 format + Modulo-97 checksum). Ignores spaces.

```typescript
static isIban(str: string): boolean
```

**Example**

```typescript
Validation.isIban('DE89 3704 0044 0532 0130 00');  // true
Validation.isIban('GB82WEST12345698765432');         // true
Validation.isIban('DE00000000000000000000');         // false
```
