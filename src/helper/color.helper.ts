import Utilities from './utilities.helper';

/**
 * Color provides utility methods for working with colors in different formats.
 * It supports conversion between hex, RGB, RGBA, HSL, and HSLA formats, as well as extracting
 * colors from CSS variables and calculating text colors based on background colors.
 */
export default class Color {
  // **general color functions**
  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('')}`;
  }

  // Returns the computed style color of a given CSS variable
  static getComputedStyleColor(variableName: CssVariableName): ColorDefinition {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim() as ColorDefinition;
  }

  // Detects the color format of a given color string
  static detectColorFormat(color: ColorDefinition): ColorFormat {
    if (color.startsWith('#')) {
      return 'hex';
    }

    if (color.startsWith('rgb')) {
      return color.includes('a') ? 'rgba' : 'rgb';
    }

    if (color.startsWith('hsl')) {
      return color.includes('a') ? 'hsla' : 'hsl';
    }

    return 'unknown';
  }

  // Calculates a RGB color channel based on the HSL(A) values.
  static calculateRgbChannel(
    min: number,
    max: number,
    hueShifted: number,
  ): number {
    if (hueShifted < 0) {
      hueShifted += 1;
    }

    if (hueShifted > 1) {
      hueShifted -= 1;
    }

    if (hueShifted < 1 / 6) {
      return min + (max - min) * (6 * hueShifted);
    }

    if (hueShifted < 1 / 2) {
      return max;
    }

    if (hueShifted < 2 / 3) {
      return min + (max - min) * (2 / 3 - hueShifted) * 6;
    }

    return min;
  }

  // Get the text color to use with a given background color.
  static getTextColorFromBackgroundColor(
    backgroundColor: ColorDefinition,
  ): HexCode {
    if (!backgroundColor) {
      return '#000';
    }

    const colorFormat = this.detectColorFormat(backgroundColor);
    let rgb: RgbObject|null = null;

    switch (colorFormat) {
      case 'hex':
        rgb = this.hexToRgb(backgroundColor as HexCode) as RgbObject|null;
        break;
      case 'rgb':
      case 'rgba':
        rgb = this.parseRgbStringToObject(
          backgroundColor as RgbString|RgbaString,
        ) as RgbObject|null;
        break;
      case 'hsl':
      case 'hsla':
        rgb = this.hslToRgb(
          backgroundColor as HslString|HslaString,
        ) as RgbObject|null;
        break;
      default:
        console.warn(`Unsupported color format: ${backgroundColor}`);
        return '#000';
    }

    if (!rgb) {
      console.warn(`Could not convert color to RGB: ${backgroundColor}`);
      return '#000';
    }

    const brightness =
        (rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000;
    return brightness > 128 ? '#000' : '#fff';
  }

  // **Format to RGB/A functions**
  // Convert a hex code into a RGB/A object or string
  static hexToRgb(
    hexCode: HexCode,
    returnType: ColorReturnType = 'object',
  ): RgbObject|RgbString|RgbaString|null {
    let sanitizedHex = hexCode.replace(/^#/, '');

    if (sanitizedHex.length === 3) {
      sanitizedHex = sanitizedHex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    const match = sanitizedHex.match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i);

    if (!match ||!match[1] || !match[2] || !match[3]) {
      console.warn(`Invalid Hex format: ${sanitizedHex}`);
      return null;
    }

    const red = parseInt(match[1], 16);
    const green = parseInt(match[2], 16);
    const blue = parseInt(match[3], 16);
    const alpha = match[4] ? parseInt(match[4], 16) / 255 : undefined;

    if (alpha) {
      return returnType === 'object'
        ? { red, green, blue, alpha }
        : `rgba(${red}, ${green}, ${blue}, ${Number(alpha.toFixed(2))})`;
    }

    return returnType === 'object'
      ? { red, green, blue }
      : `rgb(${red}, ${green}, ${blue})`;
  }

  // Parses an RGB(A) string and returns an RGB/A object
  static parseRgbStringToObject(
    rgbString: RgbString|RgbaString,
  ): RgbObject|null {
    // eslint-disable-next-line max-len
    const rgbRegex = /^rgba?\(\s*(\d+(\.\d+)?)\s*,\s*(\d+(\.\d+)?)\s*,\s*(\d+(\.\d+)?)(?:\s*,\s*(0|0?\.\d+|1))?\s*\)$/;
    const match = rgbString.match(rgbRegex);

    if (!match ||!match[1] || !match[3] || !match[5]) {
      console.warn(`Invalid RGB(A) format: ${rgbString}`);
      return null;
    }

    const red = parseInt(match[1], 10);
    const green = parseInt(match[3], 10);
    const blue = parseInt(match[5], 10);
    const alpha = match[7] ? parseFloat(match[7]) : undefined;

    return { red, green, blue, alpha };
  }

  // Converts an HSL(A) string to an RGB(A) object
  static hslToRgb(
    hslString: HslString|HslaString,
    returnType: ColorReturnType = 'object',
  ): RgbObject|RgbString|RgbaString|null {
    // eslint-disable-next-line max-len
    const hslRegex = /^hsla?\(\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)%\s*,\s*(-?\d+(\.\d+)?)%(?:\s*,\s*(0|0?\.\d+|1))?\s*\)$/;
    const match = hslString.match(hslRegex);

    if (!match ||!match[1] || !match[3] || !match[5]) {
      console.warn(`Invalid HSL(A) format: ${hslString}`);
      return null;
    }

    const hue = parseInt(match[1], 10) / 360;
    const saturation = parseInt(match[3], 10) / 100;
    const lightness = parseInt(match[5], 10) / 100;
    const alpha = match[7] ? parseFloat(match[7]) : undefined;

    if (saturation === 0) {
      const gray = Math.round(lightness * 255);
      return { red: gray, green: gray, blue: gray, alpha };
    }

    const maxLuminance = lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
    const minLuminance = 2 * lightness - maxLuminance;

    const red = Math.round(this.calculateRgbChannel(
      minLuminance,
      maxLuminance,
      hue + 1 / 3,
    ) * 255);
    const green = Math.round(this.calculateRgbChannel(
      minLuminance,
      maxLuminance,
      hue,
    ) * 255);
    const blue = Math.round(this.calculateRgbChannel(
      minLuminance,
      maxLuminance,
      hue - 1 / 3,
    ) * 255);

    if (alpha) {
      return returnType === 'object'
        ? { red, green, blue, alpha }
        : `rgba(${red}, ${green}, ${blue}, ${Number(alpha.toFixed(2))})`;
    }

    return returnType === 'object'
      ? { red, green, blue }
      : `rgb(${red}, ${green}, ${blue})`;
  }

  // **Format to hex code functions**
  // Converts an RGB object to a hex code string
  static rgbToHex(rgb: RgbObject): HexCode {
    const clamp = Utilities.createClamper(0, 255);

    const red = clamp(rgb.red).toString(16).padStart(2, '0');
    const green = clamp(rgb.green).toString(16).padStart(2, '0');
    const blue = clamp(rgb.blue).toString(16).padStart(2, '0');

    return `#${red}${green}${blue}`;
  }

  // Converts an HSL String to a hex code string
  static hslToHex(hsl: HslString|HslaString): HexCode|null {
    const rgb = this.hslToRgb(hsl) as RgbObject;

    if (!rgb) {
      return null;
    }

    return this.rgbToHex(rgb);
  }

  // **Format to hsl object functions**
  // Converts an RGB object to an HSL object or string
  static rgbToHsl(
    rgbString: RgbString|RgbaString,
    returnType: ColorReturnType = 'object',
  ): HslObject|HslString|HslaString|null {
    const rgb = this.parseRgbStringToObject(rgbString);

    if (!rgb) {
      return null;
    }

    const clamp = Utilities.createClamper(0, 255);
    const red = clamp(rgb.red) / 255;
    const green = clamp(rgb.green) / 255;
    const blue = clamp(rgb.blue) / 255;

    const maxIntensity = Math.max(red, green, blue);
    const minIntensity = Math.min(red, green, blue);
    const delta = maxIntensity - minIntensity;

    let hue = 0;
    if (delta !== 0) {
      if (maxIntensity === red) {
        hue = ((green - blue) / delta + (green < blue ? 6 : 0)) * 60;
      } else if (maxIntensity === green) {
        hue = ((blue - red) / delta + 2) * 60;
      } else if (maxIntensity === blue) {
        hue = ((red - green) / delta + 4) * 60;
      }
    }

    let lightness = (maxIntensity + minIntensity) / 2;
    let saturation = delta === 0
      ? 0
      : delta / (1 - Math.abs(2 * lightness - 1));

    hue = Math.round(hue);
    saturation = Math.round(saturation * 100);
    lightness = Math.round(lightness * 100);

    if (rgb.alpha) {
      const alpha = Math.max(0, Math.min(1, rgb.alpha));
      return returnType === 'object'
        ? { hue, saturation, lightness, alpha }
        : `hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`;
    }

    return { hue, saturation, lightness };
  }

  // Converts an Hex Code to an HSL object or string
  static hexToHsl(
    hexCode: HexCode,
    returnType: ColorReturnType = 'object',
  ): HslObject|HslString|HslaString|null {
    const rgbString = this.hexToRgb(
      hexCode,
      'string',
    ) as RgbString|RgbaString|null;

    if (!rgbString) {
      return null;
    }

    return this.rgbToHsl(rgbString, returnType);
  }
}

// **Interfaces for the color helper class**
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
