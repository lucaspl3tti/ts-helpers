# ViewportAccess

Detect the current viewport breakpoint and work with media queries. Breakpoints are based on Bootstrap 5 with additional custom sizes.

**Source:** `src/helper/viewport-access.helper.ts`

---

## Import

```typescript
import { ViewportAccess } from '@lucaspl3tti/ts-helpers';
```

---

## Breakpoints

The static `breakpoints` map defines the minimum width (in pixels) for each named breakpoint:

```typescript
static breakpoints: Record<Breakpoint, number> = {
  'sm':  576,
  'md':  768,
  'lg':  992,
  'xl':  1200,
  'xxl': 1400,
  '3xl': 1600,
  'fhd': 1920,
  'qhd': 2560,
  'uhd': 3840,
};
```

Each `isXxx()` method checks whether `window.innerWidth` falls **within** the range `[breakpoint, nextBreakpoint)`. `isXS()` matches anything below `sm` (< 576 px). `isUHD()` matches anything at or above 3840 px.

See [`Breakpoint`](../types.md#breakpoint) for the type definition.

---

## Methods Overview

### Media query utilities

| Method | Returns | Description |
| --- | --- | --- |
| [`getMediaQuery`](#getmediaquery) | `MediaQueryList` | Create a media query for a named breakpoint |
| [`getMediaQueryBetween`](#getmediaquerybetween) | `MediaQueryList` | Create a range media query between two breakpoints |
| [`watchMediaQuery`](#watchmediaquery) | `void` | Listen for media query changes |
| [`getCurrentViewport`](#getcurrentviewport) | `number` | Get the current breakpoint width in px |

### Breakpoint checks

| Method | Returns | Matches viewport width |
| --- | --- | --- |
| [`isXS`](#isxs) | `boolean` | `< 576px` |
| [`isSM`](#issm) | `boolean` | `>= 576px` and `< 768px` |
| [`isMD`](#ismd) | `boolean` | `>= 768px` and `< 992px` |
| [`isLG`](#islg) | `boolean` | `>= 992px` and `< 1200px` |
| [`isXL`](#isxl) | `boolean` | `>= 1200px` and `< 1400px` |
| [`isXXL`](#isxxl) | `boolean` | `>= 1400px` and `< 1600px` |
| [`is3XL`](#is3xl) | `boolean` | `>= 1600px` and `< 1920px` |
| [`isFHD`](#isfhd) | `boolean` | `>= 1920px` and `< 2560px` |
| [`isQHD`](#isqhd) | `boolean` | `>= 2560px` and `< 3840px` |
| [`isAbove`](#isabove) | `boolean` | `>= named breakpoint` |
| [`isBelow`](#isbelow) | `boolean` | `< named breakpoint` |
| [`isUHD`](#isuhd) | `boolean` | `>= 3840px` |

---

## Methods

### `getMediaQuery`

Returns a `MediaQueryList` for a named breakpoint. Defaults to a `min-width` query.

```typescript
static getMediaQuery(
  breakpoint: Breakpoint,
  type?: 'min' | 'max',
): MediaQueryList
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `breakpoint` | `Breakpoint` | — | Named breakpoint |
| `type` | `'min' \| 'max'` | `'min'` | Whether to use `min-width` or `max-width` |

**Example**

```typescript
const mq = ViewportAccess.getMediaQuery('lg');
// MediaQueryList for "(min-width: 992px)"

const mqMax = ViewportAccess.getMediaQuery('xl', 'max');
// MediaQueryList for "(max-width: 1200px)"
```

---

### `getMediaQueryBetween`

Returns a `MediaQueryList` matching a range between two named breakpoints.

```typescript
static getMediaQueryBetween(
  breakpointMin: Breakpoint,
  breakpointMax: Breakpoint,
): MediaQueryList
```

| Parameter | Type | Description |
| --- | --- | --- |
| `breakpointMin` | `Breakpoint` | Lower bound breakpoint name |
| `breakpointMax` | `Breakpoint` | Upper bound breakpoint name |

**Example**

```typescript
const mq = ViewportAccess.getMediaQueryBetween('md', 'xl');
// "(min-width: 768px) and (max-width: 1200px)"
```

---

### `watchMediaQuery`

Attaches a `change` event listener to a `MediaQueryList` that fires whenever the query's match state changes.

```typescript
static watchMediaQuery(
  mediaQuery: MediaQueryList,
  callback: (event: MediaQueryListEvent) => void,
): void
```

| Parameter | Type | Description |
| --- | --- | --- |
| `mediaQuery` | `MediaQueryList` | The media query to observe |
| `callback` | `(event: MediaQueryListEvent) => void` | Called on each change |

**Example**

```typescript
const mq = ViewportAccess.getMediaQuery('lg');

ViewportAccess.watchMediaQuery(mq, (event) => {
  if (event.matches) {
    console.log('now >= lg');
  } else {
    console.log('now < lg');
  }
});
```

---

### `getCurrentViewport`

Returns the pixel width of the currently active breakpoint. Returns `0` when the viewport is smaller than `sm`.

```typescript
static getCurrentViewport(): number
```

**Example**

```typescript
ViewportAccess.getCurrentViewport();
// e.g. 992 when viewport is LG
```

---

### `isXS`

Returns `true` when `window.innerWidth < 576`.

```typescript
static isXS(): boolean
```

---

### `isSM`

Returns `true` when `576 <= window.innerWidth < 768`.

```typescript
static isSM(): boolean
```

---

### `isMD`

Returns `true` when `768 <= window.innerWidth < 992`.

```typescript
static isMD(): boolean
```

---

### `isLG`

Returns `true` when `992 <= window.innerWidth < 1200`.

```typescript
static isLG(): boolean
```

---

### `isXL`

Returns `true` when `1200 <= window.innerWidth < 1400`.

```typescript
static isXL(): boolean
```

---

### `isXXL`

Returns `true` when `1400 <= window.innerWidth < 1600`.

```typescript
static isXXL(): boolean
```

---

### `is3XL`

Returns `true` when `1600 <= window.innerWidth < 1920`.

```typescript
static is3XL(): boolean
```

---

### `isFHD`

Returns `true` when `1920 <= window.innerWidth < 2560` (Full HD).

```typescript
static isFHD(): boolean
```

---

### `isQHD`

Returns `true` when `2560 <= window.innerWidth < 3840` (Quad HD).

```typescript
static isQHD(): boolean
```

---

### `isUHD`

Returns `true` when `window.innerWidth >= 3840` (Ultra HD / 4K).

```typescript
static isUHD(): boolean
```

---

### `isAbove`

Returns `true` when `window.innerWidth` is **at or above** the minimum width of the named breakpoint.

```typescript
static isAbove(breakpoint: Breakpoint): boolean
```

| Parameter | Type | Description |
| --- | --- | --- |
| `breakpoint` | `Breakpoint` | Named breakpoint to compare against |

```typescript
ViewportAccess.isAbove('lg');  // true when innerWidth >= 992
ViewportAccess.isAbove('xxl'); // true when innerWidth >= 1400
```

---

### `isBelow`

Returns `true` when `window.innerWidth` is **below** the minimum width of the named breakpoint.

```typescript
static isBelow(breakpoint: Breakpoint): boolean
```

| Parameter | Type | Description |
| --- | --- | --- |
| `breakpoint` | `Breakpoint` | Named breakpoint to compare against |

```typescript
ViewportAccess.isBelow('md'); // true when innerWidth < 768 (mobile)
ViewportAccess.isBelow('xl'); // true when innerWidth < 1200
```

---

## Example: Responsive logic

```typescript
import { ViewportAccess } from '@lucaspl3tti/ts-helpers';

function updateLayout() {
  if (ViewportAccess.isXS() || ViewportAccess.isSM()) {
    // mobile layout
  } else if (ViewportAccess.isMD() || ViewportAccess.isLG()) {
    // tablet layout
  } else {
    // desktop layout
  }
}

// React to resize
const mq = ViewportAccess.getMediaQuery('md');
ViewportAccess.watchMediaQuery(mq, () => updateLayout());
updateLayout();
```
