# Types & Interfaces

This page documents all shared interfaces and type aliases exported by `@lucaspl3tti/ts-helpers`.

---

## Interfaces

### `CallbackOptions<Scope>`

Configuration options for event callbacks in [`NativeEventEmitter`](helpers/event-emitter.md).

```typescript
interface CallbackOptions<Scope = unknown> {
  scope?: Scope;
  once?: boolean;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `scope` | `Scope` | Bind the callback to a custom `this` scope |
| `once` | `boolean` | If `true`, the listener fires only once and is then removed |

**Source:** `src/interfaces/general.interface.ts`

---

### `ElementCreateOptions`

Options for creating DOM elements with [`Dom.createElement()`](helpers/dom.md#createelement).

```typescript
interface ElementCreateOptions {
  id?: string;
  classes?: string | string[];
  text?: string;
  html?: string;
  dataset?: object;
  [key: string]: any;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `id` | `string` | Sets the element's `id` attribute |
| `classes` | `string \| string[]` | One or more CSS classes to add |
| `text` | `string` | Sets `textContent` |
| `html` | `string` | Sets `innerHTML` |
| `dataset` | `object` | Key/value pairs added as `data-*` attributes |
| `[key]` | `any` | Any additional key is set as an HTML attribute via `setAttribute` |

**Source:** `src/interfaces/general.interface.ts`

---

### `JsonObject`

A generic plain object with string keys.

```typescript
interface JsonObject {
  [key: string]: any;
}
```

Used as a loose type for object parameters throughout `ObjectAccess` and `Utilities`.

**Source:** `src/interfaces/general.interface.ts`

---

### `Listener`

Internal representation of a registered event listener in `NativeEventEmitter`.

```typescript
interface Listener {
  callback: (event: Event) => void;
  options: CallbackOptions;
  splitEventName: string[];
}
```

| Property | Type | Description |
| --- | --- | --- |
| `callback` | `(event: Event) => void` | The actual listener function attached to the DOM |
| `options` | `CallbackOptions` | The options passed when subscribing |
| `splitEventName` | `string[]` | The event name split by `.` (for dot-notation namespacing) |

**Source:** `src/interfaces/general.interface.ts`

---

### `ScrollToAnchorOptions`

Options for anchor-based scroll operations.

```typescript
interface ScrollToAnchorOptions {
  targetSelector: string;
  offset?: number;
  callback?: (() => void);
}
```

| Property | Type | Description |
| --- | --- | --- |
| `targetSelector` | `string` | CSS selector of the target element |
| `offset` | `number` | Pixel offset subtracted from the scroll position |
| `callback` | `() => void` | Function called after scrolling |

**Source:** `src/interfaces/general.interface.ts`

---

### `RandomTextOptions`

Options for controlling character requirements in [`Utilities.generateRandomText()`](helpers/utilities.md#generaterandomtext).

```typescript
interface RandomTextOptions {
  minUppercase?: number;
  minLowercase?: number;
  minNumbers?: number;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `minUppercase` | `number` | Minimum number of uppercase letters |
| `minLowercase` | `number` | Minimum number of lowercase letters |
| `minNumbers` | `number` | Minimum number of digit characters |

**Source:** `src/interfaces/general.interface.ts`

---

### `RgbObject`

Represents a color in RGB or RGBA format as a plain object.

```typescript
interface RgbObject {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `red` | `number` | Red channel (0–255) |
| `green` | `number` | Green channel (0–255) |
| `blue` | `number` | Blue channel (0–255) |
| `alpha` | `number` | Alpha channel (0–1), optional |

**Source:** `src/helper/color.helper.ts`

---

### `HslObject`

Represents a color in HSL or HSLA format as a plain object.

```typescript
interface HslObject {
  hue: number;
  saturation: number;
  lightness: number;
  alpha?: number;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `hue` | `number` | Hue angle (0–360) |
| `saturation` | `number` | Saturation percentage (0–100) |
| `lightness` | `number` | Lightness percentage (0–100) |
| `alpha` | `number` | Alpha channel (0–1), optional |

**Source:** `src/helper/color.helper.ts`

---

## Type Aliases

### `Breakpoint`

Named viewport breakpoints used by [`ViewportAccess`](helpers/viewport-access.md).

```typescript
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'fhd' | 'qhd' | 'uhd';
```

| Value | Width (px) |
| --- | --- |
| `'sm'` | 576 |
| `'md'` | 768 |
| `'lg'` | 992 |
| `'xl'` | 1200 |
| `'xxl'` | 1400 |
| `'3xl'` | 1600 |
| `'fhd'` | 1920 |
| `'qhd'` | 2560 |
| `'uhd'` | 3840 |

**Source:** `src/interfaces/general.interface.ts`

---

### `HeadingType`

Valid HTML heading tag names.

```typescript
type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
```

**Source:** `src/interfaces/general.interface.ts`

---

### `ColorFormat`

Detected color format string returned by [`Color.detectColorFormat()`](helpers/color.md#detectcolorformat).

```typescript
type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'unknown';
```

**Source:** `src/helper/color.helper.ts`

---

### `ColorReturnType`

Controls whether a color conversion method returns an object or a CSS string.

```typescript
type ColorReturnType = 'string' | 'object';
```

**Source:** `src/helper/color.helper.ts`

---

### `ColorDefinition`

Union of all supported color string formats.

```typescript
type ColorDefinition = HexCode | RgbString | RgbaString | HslString | HslaString;
```

**Source:** `src/helper/color.helper.ts`

---

### `HexCode`

A template literal type enforcing the `#` prefix for hex colors.

```typescript
type HexCode = `#${string}`;
```

**Source:** `src/helper/color.helper.ts`

---

### `RgbString`

A template literal type for CSS `rgb()` color strings.

```typescript
type RgbString = `rgb(${number}, ${number}, ${number})`;
```

**Source:** `src/helper/color.helper.ts`

---

### `RgbaString`

A template literal type for CSS `rgba()` color strings.

```typescript
type RgbaString = `rgba(${number}, ${number}, ${number}, ${number})`;
```

**Source:** `src/helper/color.helper.ts`

---

### `HslString`

A template literal type for CSS `hsl()` color strings.

```typescript
type HslString = `hsl(${number}, ${number}, ${number})`;
```

**Source:** `src/helper/color.helper.ts`

---

### `HslaString`

A template literal type for CSS `hsla()` color strings.

```typescript
type HslaString = `hsla(${number}, ${number}, ${number}, ${number})`;
```

**Source:** `src/helper/color.helper.ts`

---

### `CssVariableName`

A template literal type for CSS custom property names.

```typescript
type CssVariableName = `--${string}`;
```

**Source:** `src/helper/color.helper.ts`

---

### `CssVariable`

A template literal type for `var()` CSS variable references.

```typescript
type CssVariable = `var(${CssVariableName})`;
```

**Source:** `src/helper/color.helper.ts`

---

### `StorageType`

Selects which browser storage to use.

```typescript
type StorageType = 'local' | 'session';
```

**Source:** `src/interfaces/general.interface.ts`

---

## Storage Interfaces

### `StorageOptions`

Options for [`Storage.set()`](helpers/storage.md#set).

```typescript
interface StorageOptions {
  ttl?: number;
  storage?: StorageType;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `ttl` | `number` | Time-to-live in seconds. After expiry `get()` returns `null`. |
| `storage` | `StorageType` | Which storage to use. Defaults to `'local'`. |

**Source:** `src/interfaces/general.interface.ts`

---

### `CookieOptions`

Options for [`Cookie.set()`](helpers/cookie.md#set).

```typescript
interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}
```

| Property | Type | Description |
| --- | --- | --- |
| `expires` | `number \| Date` | Days from now (number) or exact expiry `Date` |
| `path` | `string` | Cookie path. Defaults to `'/'`. |
| `domain` | `string` | Cookie domain |
| `secure` | `boolean` | Send only over HTTPS |
| `sameSite` | `'Strict' \| 'Lax' \| 'None'` | SameSite attribute |

**Source:** `src/interfaces/general.interface.ts`
