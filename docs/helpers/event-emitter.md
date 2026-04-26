# NativeEventEmitter

A typed custom event pub/sub system built on top of native DOM `CustomEvent`. Attaches to any `HTMLElement` or `Document`.

**Source:** `src/helper/event-emitter.helper.ts`

---

## Import

```typescript
import { NativeEventEmitter } from '@lucaspl3tti/ts-helpers';
```

---

## Overview

`NativeEventEmitter` wraps the browser's `CustomEvent` API to provide a simple publish/subscribe interface with:

- **Type-safe event payloads** via generics
- **Scoped callbacks** — bind the listener to a custom `this` context
- **One-time listeners** — fire and auto-remove with `once: true`
- **Dot-notation namespacing** — e.g. `'form.submit'`
- **Global augmentation** — elements get an optional `$emitter` property

---

## Constructor

```typescript
constructor(element?: Element | Document)
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `element` | `Element \| Document` | `document` | The DOM node to attach events to |

The constructor sets `element.$emitter = this` so the emitter can be retrieved later via the element reference.

**Example**

```typescript
// Attach to document (default)
const emitter = new NativeEventEmitter();

// Attach to a specific element
const el = document.querySelector('#app')!;
const emitter = new NativeEventEmitter(el);

// Retrieve later via $emitter
el.$emitter?.publish('ready');
```

---

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `element` | `Element \| Document` | The DOM node this emitter is attached to |
| `listeners` | `Listener[]` | All currently registered listeners |

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`publish`](#publish) | `CustomEvent<T>` | Dispatch a custom event |
| [`subscribe`](#subscribe) | `void` | Listen for a custom event |
| [`unsubscribe`](#unsubscribe) | `void` | Remove a listener by event name |
| [`reset`](#reset) | `void` | Remove all listeners |

---

## Methods

### `publish`

Dispatches a `CustomEvent` on the attached element and returns the created event object.

```typescript
publish<EventType extends Record<string, any>>(
  eventName: string,
  detail?: EventType,
  cancelable?: boolean,
): CustomEvent<EventType>
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `eventName` | `string` | — | Name of the event to dispatch |
| `detail` | `EventType` | `{}` | Payload attached to `event.detail` |
| `cancelable` | `boolean` | `false` | Whether the event can be cancelled |

**Example**

```typescript
emitter.publish('user:login', { userId: 42 });
emitter.publish('form:submit', { valid: true }, true);
```

---

### `subscribe`

Registers a listener for the given event name. Supports scoped callbacks and one-time listeners via `CallbackOptions`.

Dot-notation names (e.g. `'form.submit'`) are split and stored for namespaced unsubscription.

```typescript
subscribe<DetailType = unknown>(
  eventName: string,
  callback: (event: CustomEvent<DetailType>) => void,
  options?: CallbackOptions,
): void
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `eventName` | `string` | — | Event name to listen for |
| `callback` | `(event: CustomEvent<DetailType>) => void` | — | Listener function |
| `options` | `CallbackOptions` | `{}` | Optional scope and once configuration |

See [`CallbackOptions`](../types.md#callbackoptions) for option details.

**Examples**

```typescript
// Basic listener
emitter.subscribe('user:login', (event) => {
  console.log(event.detail.userId);
});

// One-time listener
emitter.subscribe('modal:open', (event) => {
  console.log('opened once');
}, { once: true });

// Scoped listener (callback runs with myComponent as `this`)
emitter.subscribe('resize', function(event) {
  this.updateLayout();
}, { scope: myComponent });

// Dot-notation namespace
emitter.subscribe('form.submit', (event) => {
  // ...
});
```

---

### `unsubscribe`

Removes the listener(s) registered under the given event name. Supports dot-notation namespaces.

```typescript
unsubscribe(eventName: string): void
```

| Parameter | Type | Description |
| --- | --- | --- |
| `eventName` | `string` | Event name to remove |

**Example**

```typescript
emitter.unsubscribe('user:login');
emitter.unsubscribe('form.submit');
```

---

### `reset`

Removes **all** registered listeners from the attached element and clears the internal listener list.

```typescript
reset(): void
```

**Example**

```typescript
emitter.reset();
// All event listeners are detached from the element
```

---

## Full Example

```typescript
import { NativeEventEmitter } from '@lucaspl3tti/ts-helpers';

interface LoginPayload {
  userId: number;
  username: string;
}

const emitter = new NativeEventEmitter();

// Subscribe
emitter.subscribe<LoginPayload>('user:login', (event) => {
  console.log(`User ${event.detail.username} logged in`);
});

// Subscribe once
emitter.subscribe<LoginPayload>('user:login', (event) => {
  console.log('first login only');
}, { once: true });

// Publish
emitter.publish<LoginPayload>('user:login', { userId: 1, username: 'Jan' });

// Remove specific listener
emitter.unsubscribe('user:login');

// Remove all
emitter.reset();
```

---

## Global Type Augmentation

`NativeEventEmitter` extends the global `HTMLElement` and `Document` interfaces with an optional `$emitter` property, so you can access the emitter directly from any element reference:

```typescript
declare global {
  interface HTMLElement {
    $emitter?: NativeEventEmitter<HTMLElement>;
  }
  interface Document {
    $emitter?: NativeEventEmitter<HTMLElement>;
  }
}
```

**Example**

```typescript
const el = document.querySelector('#app')!;
const emitter = new NativeEventEmitter(el);

// Access later via the element
el.$emitter?.publish('ready');
```
