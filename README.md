# @lucaspl3tti/ts-helpers

A lightweight, type-safe collection of utility functions to speed up your TypeScript and JavaScript development.

![NPM Version](https://img.shields.io/npm/v/@lucaspl3tti/ts-helpers?style=flat-square)
![License](https://img.shields.io/npm/l/@lucaspl3tti/ts-helpers?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square)

## Features

- **Zero dependencies** — pure TypeScript, no runtime dependencies
- **Tree-shakeable** — import only what you need
- **Fully typed** — strict TypeScript with generics throughout
- **Dual format** — ESM and CommonJS bundles included
- **Browser-first** — designed for modern browser environments

### Helper classes

| Class | Description |
| --- | --- |
| [`ArrayAccess`](docs/helpers/array-access.md) | Safe array access and manipulation |
| [`Color`](docs/helpers/color.md) | Color conversion (Hex, RGB, HSL) and contrast calculation |
| [`Cookie`](docs/helpers/cookie.md) | Type-safe browser cookie API |
| [`DeviceAccess`](docs/helpers/device-access.md) | Device capability detection via media queries |
| [`Dom`](docs/helpers/dom.md) | DOM querying, class/style management, element creation |
| [`Formatting`](docs/helpers/formatting.md) | Formatting for dates, bytes, numbers, and strings |
| [`NativeEventEmitter`](docs/helpers/event-emitter.md) | Typed custom event pub/sub system |
| [`ObjectAccess`](docs/helpers/object-access.md) | Safe object access and manipulation |
| [`Storage`](docs/helpers/storage.md) | Type-safe localStorage/sessionStorage wrapper with TTL |
| [`StringHelper`](docs/helpers/string.md) | Advanced string utilities (slugify, template, stripHtml, …) |
| [`Utilities`](docs/helpers/utilities.md) | Delays, debouncing, throttle, memoize, pipe/compose, and more |
| [`Validation`](docs/helpers/validation.md) | Validation for emails, URLs, IBANs, phone numbers, and ranges |
| [`ViewportAccess`](docs/helpers/viewport-access.md) | Viewport/breakpoint detection and media query utilities |

---

## Installation

```bash
npm install @lucaspl3tti/ts-helpers
```

---

## Usage

Import named exports from the package. All helpers are tree-shakeable.

```typescript
import { Dom, Utilities, Color } from '@lucaspl3tti/ts-helpers';
```

### CommonJS

```javascript
const { Dom, Utilities } = require('@lucaspl3tti/ts-helpers');
```

### Quick Start Example

```typescript
import { Dom, Utilities, ArrayAccess } from '@lucaspl3tti/ts-helpers';

// DOM manipulation
const button = Dom.get<Document, HTMLButtonElement>(document, '#my-button');
Dom.addClass(button, ['active', 'highlighted']);

// Async delay
await Utilities.delay(500);

// Debounce an event handler
const onResize = Utilities.debounce(() => {
  console.log('resized');
}, 200);
window.addEventListener('resize', onResize);

// Array utilities
const items = ['apple', 'banana', 'cherry'];
console.log(ArrayAccess.first(items));          // 'apple'
console.log(ArrayAccess.toStringSentence(items)); // 'apple, banana and cherry.'
```

---

## Documentation

Full API reference is available in the [`docs/`](docs/) directory:

- [Types & Interfaces](docs/types.md)
- [ArrayAccess](docs/helpers/array-access.md)
- [Color](docs/helpers/color.md)
- [DeviceAccess](docs/helpers/device-access.md)
- [Dom](docs/helpers/dom.md)
- [Formatting](docs/helpers/formatting.md)
- [NativeEventEmitter](docs/helpers/event-emitter.md)
- [ObjectAccess](docs/helpers/object-access.md)
- [Utilities](docs/helpers/utilities.md)
- [ViewportAccess](docs/helpers/viewport-access.md)

---

## License

MIT License © 2026 Jan-Luca Splettößer
