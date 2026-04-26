export interface RgbObject {
  red: number
  green: number
  blue: number
  alpha?: number
}

export interface HslObject {
  hue: number
  saturation: number
  lightness: number
  alpha?: number
}

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'unknown';

export type HexCode = `#${string}`;
export type RgbString = `rgb(${number}, ${number}, ${number})`;
export type RgbaString = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HslString = `hsl(${number}, ${number}, ${number})`;
export type HslaString = `hsla(${number}, ${number}, ${number}, ${number})`;

export type ColorReturnType = 'string' | 'object';
export type ColorDefinition = HexCode | RgbString | RgbaString | HslString | HslaString; // eslint-disable-line max-len
export type CssVariableName = `--${string}`;
export type CssVariable = `var(${CssVariableName})`;
