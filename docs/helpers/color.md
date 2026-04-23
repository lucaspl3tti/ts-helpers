# Color

Utilities for color conversion and manipulation. Supports Hex, RGB, RGBA, HSL, and HSLA formats.

**Source:** `src/helper/color.helper.ts`

---

## Import

```typescript
import { Color } from '@lucaspl3tti/ts-helpers';

// Color-specific types are also exported:
import type { RgbObject, HslObject, ColorFormat, HexCode, ColorDefinition } from '@lucaspl3tti/ts-helpers';
```

---

## Types

All color-specific types are documented in [Types & Interfaces](../types.md). Quick reference:

| Type | Description |
| --- | --- |
| [`RgbObject`](../types.md#rgbobject) | `{ red, green, blue, alpha? }` |
| [`HslObject`](../types.md#hslobject) | `{ hue, saturation, lightness, alpha? }` |
| [`ColorFormat`](../types.md#colorformat) | `'hex' \| 'rgb' \| 'rgba' \| 'hsl' \| 'hsla' \| 'unknown'` |
| [`ColorReturnType`](../types.md#colorreturntype) | `'string' \| 'object'` |
| [`ColorDefinition`](../types.md#colordefinition) | Union of all color string types |
| [`HexCode`](../types.md#hexcode) | `` `#${string}` `` |
| [`RgbString`](../types.md#rgbstring) | `` `rgb(n, n, n)` `` |
| [`RgbaString`](../types.md#rgbastring) | `` `rgba(n, n, n, n)` `` |
| [`HslString`](../types.md#hslstring) | `` `hsl(n, n, n)` `` |
| [`HslaString`](../types.md#hslastring) | `` `hsla(n, n, n, n)` `` |
| [`CssVariableName`](../types.md#cssvariablename) | `` `--${string}` `` |

---

## Methods Overview

| Method | Returns | Description |
| --- | --- | --- |
| [`getRandomColor`](#getrandomcolor) | `string` | Generate a random hex color |
| [`getComputedStyleColor`](#getcomputedstylecolor) | `ColorDefinition` | Read a CSS variable color |
| [`detectColorFormat`](#detectcolorformat) | `ColorFormat` | Detect the format of a color string |
| [`calculateRgbChannel`](#calculatergbchannel) | `number` | Calculate a single RGB channel from HSL values |
| [`getTextColorFromBackgroundColor`](#gettextcolorfrombackgroundcolor) | `HexCode` | Get a readable text color for a background |
| [`hexToRgb`](#hextorgb) | `RgbObject \| RgbString \| RgbaString \| null` | Convert hex to RGB |
| [`parseRgbStringToObject`](#parsergbstringtoobject) | `RgbObject \| null` | Parse RGB(A) string to object |
| [`hslToRgb`](#hsltorgb) | `RgbObject \| RgbString \| RgbaString \| null` | Convert HSL to RGB |
| [`rgbToHex`](#rgbtohex) | `HexCode` | Convert RGB object to hex |
| [`hslToHex`](#hsltohex) | `HexCode \| null` | Convert HSL string to hex |
| [`rgbToHsl`](#rgbtohsl) | `HslObject \| HslString \| HslaString \| null` | Convert RGB string to HSL |
| [`hexToHsl`](#hextohsl) | `HslObject \| HslString \| HslaString \| null` | Convert hex to HSL |

---

## Methods

### `getRandomColor`

Returns a random hex color string.

```typescript
static getRandomColor(): string
```

**Example**

```typescript
Color.getRandomColor(); // e.g. '#A3F2C1'
```

---

### `getComputedStyleColor`

Reads a CSS custom property value from the document root and returns it as a `ColorDefinition` string.

```typescript
static getComputedStyleColor(variableName: CssVariableName): ColorDefinition
```

| Parameter | Type | Description |
| --- | --- | --- |
| `variableName` | `CssVariableName` | CSS variable name, e.g. `'--primary-color'` |

**Example**

```typescript
// CSS: :root { --brand: #3498db; }
Color.getComputedStyleColor('--brand'); // '#3498db'
```

---

### `detectColorFormat`

Detects and returns the format of a color string.

```typescript
static detectColorFormat(color: ColorDefinition): ColorFormat
```

| Parameter | Type | Description |
| --- | --- | --- |
| `color` | `ColorDefinition` | The color string to inspect |

**Example**

```typescript
Color.detectColorFormat('#ff0000');           // 'hex'
Color.detectColorFormat('rgb(255, 0, 0)');   // 'rgb'
Color.detectColorFormat('rgba(255,0,0,0.5)');// 'rgba'
Color.detectColorFormat('hsl(0, 100%, 50%)');// 'hsl'
```

---

### `calculateRgbChannel`

Low-level helper that calculates a single RGB channel value during HSL-to-RGB conversion.

```typescript
static calculateRgbChannel(
  min: number,
  max: number,
  hueShifted: number,
): number
```

| Parameter | Type | Description |
| --- | --- | --- |
| `min` | `number` | Minimum luminance value |
| `max` | `number` | Maximum luminance value |
| `hueShifted` | `number` | Hue shifted by ±1/3 for the specific channel |

This method is used internally by `hslToRgb`. You typically don't need to call it directly.

---

### `getTextColorFromBackgroundColor`

Returns `#000` (black) or `#fff` (white) — whichever gives better readability on the given background color. Uses the WCAG-style brightness formula.

Accepts any supported color format (hex, rgb, rgba, hsl, hsla).

```typescript
static getTextColorFromBackgroundColor(
  backgroundColor: ColorDefinition,
): HexCode
```

| Parameter | Type | Description |
| --- | --- | --- |
| `backgroundColor` | `ColorDefinition` | Background color in any supported format |

**Example**

```typescript
Color.getTextColorFromBackgroundColor('#ffffff'); // '#000'
Color.getTextColorFromBackgroundColor('#000000'); // '#fff'
Color.getTextColorFromBackgroundColor('hsl(200, 80%, 30%)'); // '#fff'
```

---

### `hexToRgb`

Converts a hex color code to an RGB(A) object or CSS string. Supports 3-digit and 8-digit (with alpha) hex codes.

```typescript
static hexToRgb(
  hexCode: HexCode,
  returnType?: ColorReturnType,
): RgbObject | RgbString | RgbaString | null
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `hexCode` | `HexCode` | — | Hex color, e.g. `'#ff6600'` |
| `returnType` | `ColorReturnType` | `'object'` | `'object'` for `RgbObject`, `'string'` for CSS string |

**Example**

```typescript
Color.hexToRgb('#ff6600');
// { red: 255, green: 102, blue: 0 }

Color.hexToRgb('#ff6600', 'string');
// 'rgb(255, 102, 0)'

Color.hexToRgb('#ff660080', 'string');
// 'rgba(255, 102, 0, 0.5)'
```

---

### `parseRgbStringToObject`

Parses an `rgb()` or `rgba()` CSS string and returns it as an `RgbObject`.

```typescript
static parseRgbStringToObject(
  rgbString: RgbString | RgbaString,
): RgbObject | null
```

| Parameter | Type | Description |
| --- | --- | --- |
| `rgbString` | `RgbString \| RgbaString` | CSS color string |

**Example**

```typescript
Color.parseRgbStringToObject('rgb(255, 102, 0)');
// { red: 255, green: 102, blue: 0 }

Color.parseRgbStringToObject('rgba(255, 102, 0, 0.5)');
// { red: 255, green: 102, blue: 0, alpha: 0.5 }
```

---

### `hslToRgb`

Converts an `hsl()` or `hsla()` CSS string to an RGB(A) object or CSS string.

```typescript
static hslToRgb(
  hslString: HslString | HslaString,
  returnType?: ColorReturnType,
): RgbObject | RgbString | RgbaString | null
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `hslString` | `HslString \| HslaString` | — | HSL(A) CSS color string |
| `returnType` | `ColorReturnType` | `'object'` | Return format |

**Example**

```typescript
Color.hslToRgb('hsl(0, 100%, 50%)');
// { red: 255, green: 0, blue: 0 }

Color.hslToRgb('hsl(0, 100%, 50%)', 'string');
// 'rgb(255, 0, 0)'
```

---

### `rgbToHex`

Converts an `RgbObject` to a hex color string. Channel values are clamped to 0–255.

```typescript
static rgbToHex(rgb: RgbObject): HexCode
```

| Parameter | Type | Description |
| --- | --- | --- |
| `rgb` | `RgbObject` | RGB color object |

**Example**

```typescript
Color.rgbToHex({ red: 255, green: 102, blue: 0 });
// '#ff6600'
```

---

### `hslToHex`

Converts an `hsl()` or `hsla()` CSS string to a hex color string.

```typescript
static hslToHex(hsl: HslString | HslaString): HexCode | null
```

| Parameter | Type | Description |
| --- | --- | --- |
| `hsl` | `HslString \| HslaString` | HSL(A) CSS color string |

**Example**

```typescript
Color.hslToHex('hsl(0, 100%, 50%)');
// '#ff0000'
```

---

### `rgbToHsl`

Converts an `rgb()` or `rgba()` CSS string to an HSL(A) object or CSS string.

```typescript
static rgbToHsl(
  rgbString: RgbString | RgbaString,
  returnType?: ColorReturnType,
): HslObject | HslString | HslaString | null
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `rgbString` | `RgbString \| RgbaString` | — | RGB(A) CSS color string |
| `returnType` | `ColorReturnType` | `'object'` | Return format |

**Example**

```typescript
Color.rgbToHsl('rgb(255, 0, 0)');
// { hue: 0, saturation: 100, lightness: 50 }

Color.rgbToHsl('rgb(255, 0, 0)', 'string');
// 'hsl(0, 100, 50)'
```

---

### `hexToHsl`

Converts a hex color code to an HSL(A) object or CSS string.

```typescript
static hexToHsl(
  hexCode: HexCode,
  returnType?: ColorReturnType,
): HslObject | HslString | HslaString | null
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `hexCode` | `HexCode` | — | Hex color, e.g. `'#ff0000'` |
| `returnType` | `ColorReturnType` | `'object'` | Return format |

**Example**

```typescript
Color.hexToHsl('#ff0000');
// { hue: 0, saturation: 100, lightness: 50 }

Color.hexToHsl('#ff0000', 'string');
// 'hsl(0, 100, 50)'
```
