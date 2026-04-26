# Storage

Type-safe wrapper around `localStorage` and `sessionStorage` with optional TTL (time-to-live) support.

**Source:** `src/helper/storage.helper.ts`

---

## Import

```typescript
import { Storage } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`set`](#set) | `void` | Persist a value |
| [`get`](#get) | `T \| null` | Retrieve a stored value |
| [`remove`](#remove) | `void` | Delete an entry |
| [`clear`](#clear) | `void` | Delete all entries from the selected storage |
| [`has`](#has) | `boolean` | Check whether a key exists and has not expired |

---

## Methods

### `set`

Store a value under a given key. The value is serialised to JSON internally.

```typescript
static set<T>(key: string, value: T, options?: StorageOptions): void
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | — | Storage key |
| `value` | `T` | — | Value to store (must be JSON-serialisable) |
| `options` | `StorageOptions` | `{}` | Optional TTL and storage type |

See [`StorageOptions`](../types.md#storageoptions) for option details.

**Example**

```typescript
// Simple value
Storage.set('theme', 'dark');

// With TTL (expires in 1 hour)
Storage.set('token', 'abc123', { ttl: 3600 });

// In sessionStorage
Storage.set('draft', { title: 'Hello' }, { storage: 'session' });
```

---

### `get`

Retrieve a previously stored value. Returns `null` when the key does not exist or the entry has expired.

```typescript
static get<T>(key: string, storage?: StorageType): T | null
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | — | Storage key |
| `storage` | `StorageType` | `'local'` | Which storage to read from |

**Example**

```typescript
const theme = Storage.get<string>('theme');       // 'dark' | null
const draft = Storage.get<object>('draft', 'session');
```

---

### `remove`

Remove the entry with the given key.

```typescript
static remove(key: string, storage?: StorageType): void
```

**Example**

```typescript
Storage.remove('token');
Storage.remove('draft', 'session');
```

---

### `clear`

Remove **all** entries from the selected storage.

```typescript
static clear(storage?: StorageType): void
```

**Example**

```typescript
Storage.clear();            // clears localStorage
Storage.clear('session');   // clears sessionStorage
```

---

### `has`

Returns `true` when the key exists and the entry has not expired.

```typescript
static has(key: string, storage?: StorageType): boolean
```

**Example**

```typescript
if (Storage.has('token')) {
  // proceed with token
}
```

---

## Full Example

```typescript
import { Storage } from '@lucaspl3tti/ts-helpers';

// Store user preferences with a 7-day TTL
Storage.set('prefs', { language: 'en', darkMode: true }, { ttl: 7 * 86400 });

// Read back (typed)
const prefs = Storage.get<{ language: string; darkMode: boolean }>('prefs');

if (prefs) {
  console.log(prefs.language); // 'en'
}

// Clean up on logout
Storage.remove('prefs');
```
