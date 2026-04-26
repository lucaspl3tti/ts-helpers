import { describe, it, expect, afterEach } from 'vitest';
import Color from '../src/helper/color.helper';

describe('Color', () => {
  describe('getRandomColor', () => {
    it('returns a string starting with # and 6 uppercase hex digits', () => {
      expect(Color.getRandomColor()).toMatch(/^#[0-9A-F]{6}$/);
    });
  });

  describe('getComputedStyleColor', () => {
    afterEach(() => {
      document.documentElement.style.removeProperty('--primary');
    });

    it('returns the value of a CSS variable', () => {
      document.documentElement.style.setProperty('--primary', '#ff0000');
      const result = Color.getComputedStyleColor('--primary');
      expect(result).toBe('#ff0000');
    });
  });

  describe('detectColorFormat', () => {
    it('detects hex format', () => {
      expect(Color.detectColorFormat('#ffffff' as any)).toBe('hex');
    });

    it('detects rgb format', () => {
      expect(Color.detectColorFormat('rgb(0, 0, 0)' as any)).toBe('rgb');
    });

    it('detects rgba format', () => {
      expect(Color.detectColorFormat('rgba(0, 0, 0, 1)' as any)).toBe('rgba');
    });

    it('detects hsl format', () => {
      expect(Color.detectColorFormat('hsl(0, 100%, 50%)' as any)).toBe('hsl');
    });

    it('detects hsla format', () => {
      expect(Color.detectColorFormat('hsla(0, 100%, 50%, 1)' as any)).toBe('hsla');
    });

    it('returns unknown for unrecognized format', () => {
      expect(Color.detectColorFormat('blue' as any)).toBe('unknown');
    });
  });

  describe('getTextColorFromBackgroundColor', () => {
    it('returns #000 for light hex color', () => {
      expect(Color.getTextColorFromBackgroundColor('#ffffff' as any)).toBe('#000');
    });

    it('returns #fff for dark hex color', () => {
      expect(Color.getTextColorFromBackgroundColor('#000000' as any)).toBe('#fff');
    });

    it('returns #000 for light rgb color', () => {
      expect(Color.getTextColorFromBackgroundColor('rgb(255, 255, 255)' as any)).toBe('#000');
    });

    it('returns #fff for dark rgb color', () => {
      expect(Color.getTextColorFromBackgroundColor('rgb(0, 0, 0)' as any)).toBe('#fff');
    });

    it('returns #000 for light hsl color', () => {
      expect(Color.getTextColorFromBackgroundColor('hsl(0, 0%, 100%)' as any)).toBe('#000');
    });

    it('returns #000 for empty/falsy input', () => {
      expect(Color.getTextColorFromBackgroundColor('' as any)).toBe('#000');
    });

    it('returns #000 for unknown color format', () => {
      expect(Color.getTextColorFromBackgroundColor('blue' as any)).toBe('#000');
    });

    it('returns #000 when hex color format detected but conversion fails', () => {
      // '#xyz' is detected as hex format but hexToRgb returns null → triggers !rgb path
      expect(Color.getTextColorFromBackgroundColor('#xyz' as any)).toBe('#000');
    });
  });

  describe('hexToRgb', () => {
    it('converts 6-digit hex to RGB object', () => {
      expect(Color.hexToRgb('#ff0000' as any)).toEqual({ red: 255, green: 0, blue: 0 });
    });

    it('converts 3-digit hex to RGB object', () => {
      expect(Color.hexToRgb('#fff' as any)).toEqual({ red: 255, green: 255, blue: 255 });
    });

    it('returns RGB string when returnType is string', () => {
      expect(Color.hexToRgb('#ff0000' as any, 'string')).toBe('rgb(255, 0, 0)');
    });

    it('converts hex with alpha to RGBA object', () => {
      const result = Color.hexToRgb('#ff000080' as any) as any;
      expect(result?.red).toBe(255);
      expect(result?.alpha).toBeCloseTo(0.5, 1);
    });

    it('returns RGBA string when hex has alpha and returnType is string', () => {
      // #ff000080 → alpha 0x80/255 ≈ 0.5
      expect(Color.hexToRgb('#ff000080' as any, 'string')).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('returns null for invalid hex', () => {
      expect(Color.hexToRgb('#xyz' as any)).toBeNull();
    });
  });

  describe('parseRgbStringToObject', () => {
    it('parses rgb string to object', () => {
      expect(Color.parseRgbStringToObject('rgb(10, 20, 30)' as any)).toEqual({
        red: 10, green: 20, blue: 30, alpha: undefined,
      });
    });

    it('parses rgba string to object with alpha', () => {
      const result = Color.parseRgbStringToObject('rgba(10, 20, 30, 0.5)' as any);
      expect(result?.alpha).toBe(0.5);
    });

    it('returns null for invalid format', () => {
      expect(Color.parseRgbStringToObject('not-rgb' as any)).toBeNull();
    });
  });

  describe('hslToRgb', () => {
    it('converts hsl string to RGB object', () => {
      const result = Color.hslToRgb('hsl(0, 100%, 50%)' as any) as any;
      expect(result?.red).toBe(255);
      expect(result?.green).toBe(0);
      expect(result?.blue).toBe(0);
    });

    it('handles grayscale (saturation 0)', () => {
      const result = Color.hslToRgb('hsl(0, 0%, 50%)' as any) as any;
      expect(result?.red).toBe(result?.green);
      expect(result?.green).toBe(result?.blue);
    });

    it('returns rgb string when returnType is string', () => {
      const result = Color.hslToRgb('hsl(0, 100%, 50%)' as any, 'string');
      expect(result).toBe('rgb(255, 0, 0)');
    });

    it('converts hsl string with lightness below 50% (takes lightness < 0.5 branch)', () => {
      // lightness=25% < 0.5 → maxLuminance = lightness*(1+saturation) branch
      const result = Color.hslToRgb('hsl(0, 100%, 25%)' as any) as any;
      expect(result?.red).toBe(128);
      expect(result?.green).toBe(0);
      expect(result?.blue).toBe(0);
    });

    it('returns rgba object when hsla string has alpha', () => {
      const result = Color.hslToRgb('hsla(0, 100%, 50%, 0.5)' as any) as any;
      expect(result?.red).toBe(255);
      expect(result?.alpha).toBe(0.5);
    });

    it('returns RGBA string when hsla string has alpha and returnType is string', () => {
      const result = Color.hslToRgb('hsla(0, 100%, 50%, 0.5)' as any, 'string');
      expect(result).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('returns null for invalid format', () => {
      expect(Color.hslToRgb('not-hsl' as any)).toBeNull();
    });
  });

  describe('rgbToHex', () => {
    it('converts RGB object to hex string', () => {
      expect(Color.rgbToHex({ red: 255, green: 0, blue: 0 })).toBe('#ff0000');
    });

    it('pads single digit hex values', () => {
      expect(Color.rgbToHex({ red: 0, green: 0, blue: 0 })).toBe('#000000');
    });
  });

  describe('hslToHex', () => {
    it('converts HSL string to hex', () => {
      expect(Color.hslToHex('hsl(0, 100%, 50%)' as any)).toBe('#ff0000');
    });

    it('returns null for invalid HSL', () => {
      expect(Color.hslToHex('invalid' as any)).toBeNull();
    });
  });

  describe('rgbToHsl', () => {
    it('converts rgb string to HSL object (red dominant)', () => {
      const result = Color.rgbToHsl('rgb(255, 0, 0)' as any) as any;
      expect(result?.hue).toBe(0);
      expect(result?.saturation).toBe(100);
      expect(result?.lightness).toBe(50);
    });

    it('converts rgb string to HSL object (green dominant)', () => {
      const result = Color.rgbToHsl('rgb(0, 255, 0)' as any) as any;
      expect(result?.hue).toBe(120);
      expect(result?.saturation).toBe(100);
      expect(result?.lightness).toBe(50);
    });

    it('converts rgb string to HSL object (blue dominant)', () => {
      const result = Color.rgbToHsl('rgb(0, 0, 255)' as any) as any;
      expect(result?.hue).toBe(240);
      expect(result?.saturation).toBe(100);
      expect(result?.lightness).toBe(50);
    });

    it('converts rgb string to HSL object (red dominant, green < blue)', () => {
      // green=0 < blue=128 → triggers the (green < blue ? 6 : 0) true branch
      const result = Color.rgbToHsl('rgb(255, 0, 128)' as any) as any;
      expect(result?.hue).toBe(330);
      expect(result?.saturation).toBe(100);
      expect(result?.lightness).toBe(50);
    });

    it('converts gray rgb string to HSL object (delta = 0)', () => {
      // r=g=b → delta=0 → hue stays 0, saturation ternary takes the 0 branch
      const result = Color.rgbToHsl('rgb(128, 128, 128)' as any) as any;
      expect(result?.hue).toBe(0);
      expect(result?.saturation).toBe(0);
      expect(result?.lightness).toBe(50);
    });

    it('converts rgba string to HSL object with alpha', () => {
      const result = Color.rgbToHsl('rgba(255, 0, 0, 0.5)' as any) as any;
      expect(result?.hue).toBe(0);
      expect(result?.alpha).toBe(0.5);
    });

    it('returns HSLA string when rgba input has alpha and returnType is string', () => {
      const result = Color.rgbToHsl('rgba(255, 0, 0, 0.5)' as any, 'string');
      expect(result).toBe('hsla(0, 100, 50, 0.5)');
    });

    it('returns null for invalid rgb', () => {
      expect(Color.rgbToHsl('invalid' as any)).toBeNull();
    });
  });

  describe('hexToHsl', () => {
    it('converts hex to HSL object', () => {
      const result = Color.hexToHsl('#ff0000' as any) as any;
      expect(result?.hue).toBe(0);
      expect(result?.saturation).toBe(100);
      expect(result?.lightness).toBe(50);
    });

    it('returns null for invalid hex', () => {
      expect(Color.hexToHsl('#xyz' as any)).toBeNull();
    });
  });
});
