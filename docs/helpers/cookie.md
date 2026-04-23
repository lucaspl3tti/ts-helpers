# Cookie

Type-safe API for reading and writing browser cookies via `document.cookie`.

**Source:** `src/helper/cookie.helper.ts`

---

## Import

```typescript
import { Cookie } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`set`](#set) | `void` | Set a cookie |
| [`get`](#get) | `string \| null` | Read a cookie by name |
| [`delete`](#delete) | `void` | Delete a cookie |
| [`getAll`](#getall) | `Record<string, string>` | Return all cookies |
| [`has`](#has) | `boolean` | Check whether a cookie exists |

---

## Methods

### `set`

Create or update a cookie.

```typescript
static set(name: string, value: string, options?: CookieOptions): void
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Cookie name |
| `value` | `string` | — | Cookie value (URI-encoded automatically) |
| `options` | `CookieOptions` | `{}` | Expiry, path, domain, secure, sameSite |

See [`CookieOptions`](../types.md#cookieoptions) for option details.

**Example**

```typescript
// Session cookie (no expires)
Cookie.set('lang', 'en');

// Expires in 7 days
Cookie.set('token', 'abc123', { expires: 7 });

// Full options
Cookie.set('session', 'xyz', {
  expires: 1,
  path: '/',
  secure: true,
  sameSite: 'Strict',
});
```

---

### `get`

Read a cookie by name. Returns `null` when the cookie does not exist.

```typescript
static get(name: string): string | null
```

**Example**

```typescript
Cookie.get('lang');   // 'en' | null
```

---

### `delete`

Delete a cookie by setting its expiry date to the past.

```typescript
static delete(name: string, path?: string): void
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Cookie name |
| `path` | `string` | `'/'` | Cookie path |

**Example**

```typescript
Cookie.delete('token');
```

---

### `getAll`

Return all current cookies as a key/value record.

```typescript
static getAll(): Record<string, string>
```

**Example**

```typescript
const cookies = Cookie.getAll();
// { lang: 'en', token: 'abc123' }
```

---

### `has`

Returns `true` when a cookie with the given name exists.

```typescript
static has(name: string): boolean
```

**Example**

```typescript
if (!Cookie.has('token')) {
  redirect('/login');
}
```
