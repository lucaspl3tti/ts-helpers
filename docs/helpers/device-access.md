# DeviceAccess

Detect device capabilities using media queries and browser APIs.

**Source:** `src/helper/device-access.helper.ts`

---

## Import

```typescript
import { DeviceAccess } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`isTouch`](#istouch) | `boolean` | Detect touch input capability |
| [`isHoverCapable`](#ishovercapable) | `boolean` | Detect hover capability |
| [`hasAnyFinePointer`](#hasanyfinepointer) | `boolean` | Check for a fine pointer (e.g. mouse) |
| [`hasAnyCoarsePointer`](#hasanycoarsepointer) | `boolean` | Check for a coarse pointer (e.g. finger) |
| [`canAnyInputHover`](#cananyinputhover) | `boolean` | Check if any input device supports hover |
| [`isPortrait`](#isportrait) | `boolean` | Check portrait orientation |
| [`isLandscape`](#islandscape) | `boolean` | Check landscape orientation |
| [`getScreenWidth`](#getscreenwidth) | `number` | Get physical screen width |
| [`getScreenHeight`](#getscreenheight) | `number` | Get physical screen height |

---

## Methods

### `isTouch`

Returns `true` if the device supports touch input, determined by `navigator.maxTouchPoints > 0` or the presence of a coarse pointer.

```typescript
static isTouch(): boolean
```

**Example**

```typescript
if (DeviceAccess.isTouch()) {
  // enable swipe gestures
}
```

---

### `isHoverCapable`

Returns `true` if the device has a fine pointer (e.g. mouse) or any input that supports hover.

```typescript
static isHoverCapable(): boolean
```

**Example**

```typescript
if (DeviceAccess.isHoverCapable()) {
  // show hover-only tooltips
}
```

---

### `hasAnyFinePointer`

Returns `true` if any of the connected input devices is a fine pointer (e.g. a mouse or stylus). Wraps `window.matchMedia('(any-pointer: fine)')`.

```typescript
static hasAnyFinePointer(): boolean
```

**Example**

```typescript
DeviceAccess.hasAnyFinePointer(); // true on a desktop with a mouse
```

---

### `hasAnyCoarsePointer`

Returns `true` if any connected input device is a coarse pointer (e.g. a finger on a touch screen). Wraps `window.matchMedia('(any-pointer: coarse)')`.

```typescript
static hasAnyCoarsePointer(): boolean
```

**Example**

```typescript
DeviceAccess.hasAnyCoarsePointer(); // true on a touchscreen
```

---

### `canAnyInputHover`

Returns `true` if any connected input device is capable of hovering. Wraps `window.matchMedia('(any-hover: hover)')`.

```typescript
static canAnyInputHover(): boolean
```

**Example**

```typescript
DeviceAccess.canAnyInputHover(); // false on touch-only devices
```

---

### `isPortrait`

Returns `true` if the device is currently in portrait orientation. Wraps `window.matchMedia('(orientation: portrait)')`.

```typescript
static isPortrait(): boolean
```

**Example**

```typescript
if (DeviceAccess.isPortrait()) {
  // adjust layout for portrait mode
}
```

---

### `isLandscape`

Returns `true` if the device is currently in landscape orientation. Wraps `window.matchMedia('(orientation: landscape)')`.

```typescript
static isLandscape(): boolean
```

**Example**

```typescript
if (DeviceAccess.isLandscape()) {
  // enable side-by-side layout
}
```

---

### `getScreenWidth`

Returns the physical width of the screen in pixels (`window.screen.width`).

> This reflects the physical screen size, not the viewport or window size. Use [`ViewportAccess`](viewport-access.md) for viewport-based breakpoints.

```typescript
static getScreenWidth(): number
```

**Example**

```typescript
const width = DeviceAccess.getScreenWidth(); // e.g. 1920
```

---

### `getScreenHeight`

Returns the physical height of the screen in pixels (`window.screen.height`).

```typescript
static getScreenHeight(): number
```

**Example**

```typescript
const height = DeviceAccess.getScreenHeight(); // e.g. 1080
```
