import { describe, it, expect } from 'vitest';
import Formatting from '../src/helper/formatting.helper';

describe('Formatting', () => {
  describe('spaceToDashCase', () => {
    it('converts a single space to a dash', () => {
      expect(Formatting.spaceToDashCase('hello world')).toBe('hello-world');
    });

    it('converts multiple spaces to dashes', () => {
      expect(Formatting.spaceToDashCase('hello world foo')).toBe('hello-world-foo');
    });

    it('lowercases the result', () => {
      expect(Formatting.spaceToDashCase('Hello World')).toBe('hello-world');
    });

    it('handles string with no spaces', () => {
      expect(Formatting.spaceToDashCase('hello')).toBe('hello');
    });

    it('handles empty string', () => {
      expect(Formatting.spaceToDashCase('')).toBe('');
    });
  });

  describe('camelToDashCase', () => {
    it('converts camelCase to dash-case', () => {
      expect(Formatting.camelToDashCase('backgroundColor')).toBe('background-color');
    });

    it('handles multiple uppercase letters', () => {
      expect(Formatting.camelToDashCase('myVariableName')).toBe('my-variable-name');
    });
  });

  describe('truncateString', () => {
    it('returns the original string if within limit', () => {
      expect(Formatting.truncateString('hello', 10)).toBe('hello');
    });

    it('truncates at word boundary by default', () => {
      expect(Formatting.truncateString('Hello, World! This is a long text.', 20))
        .toBe('Hello, World! This\u2026');
    });

    it('truncates mid-word when useWordBoundary is false', () => {
      const result = Formatting.truncateString('Hello, World! This is a long text.', 20, false);
      expect(result).toBe('Hello, World! This i\u2026');
    });
  });

  describe('convertToUnit', () => {
    it('appends px by default', () => {
      expect(Formatting.convertToUnit(16)).toBe('16px');
    });

    it('appends a custom unit', () => {
      expect(Formatting.convertToUnit(1.5, 'rem')).toBe('1.5rem');
    });

    it('returns null for empty string', () => {
      expect(Formatting.convertToUnit('')).toBeNull();
    });

    it('returns the original non-numeric string', () => {
      expect(Formatting.convertToUnit('auto')).toBe('auto');
    });

    it('returns null for Infinity', () => {
      expect(Formatting.convertToUnit(Infinity)).toBeNull();
    });
  });

  describe('formatBytes', () => {
    it('handles 0 bytes', () => {
      expect(Formatting.formatBytes(0)).toBe('0 Bytes');
    });

    it('formats kilobytes', () => {
      expect(Formatting.formatBytes(1024)).toBe('1 kb');
    });

    it('formats megabytes', () => {
      expect(Formatting.formatBytes(1048576)).toBe('1 mb');
    });
  });

  describe('formatDate', () => {
    it('formats a date string with default options', () => {
      const result = Formatting.formatDate('2026-01-15');
      expect(result).toMatch(/15/);
      expect(result).toMatch(/01|1/);
      expect(result).toMatch(/2026/);
    });

    it('formats a Date object', () => {
      const result = Formatting.formatDate(new Date('2026-06-01'));
      expect(result).toMatch(/2026/);
    });

    it('throws for empty string', () => {
      expect(() => Formatting.formatDate('')).toThrow('Date value must not be null or empty');
    });

    it('throws for invalid date', () => {
      expect(() => Formatting.formatDate('not-a-date')).toThrow('Invalid date');
    });
  });

  describe('decodeString', () => {
    it('decodes HTML entities', () => {
      expect(Formatting.decodeString('&amp;')).toBe('&');
    });

    it('decodes lt and gt', () => {
      expect(Formatting.decodeString('&lt;div&gt;')).toBe('<div>');
    });

    it('returns empty string for empty input', () => {
      expect(Formatting.decodeString('')).toBe('');
    });
  });

  describe('dashToCamelCase', () => {
    it('converts dash-case to camelCase', () => {
      expect(Formatting.dashToCamelCase('background-color')).toBe('backgroundColor');
    });

    it('handles multiple dashes', () => {
      expect(Formatting.dashToCamelCase('my-variable-name')).toBe('myVariableName');
    });

    it('returns string unchanged when no dashes', () => {
      expect(Formatting.dashToCamelCase('hello')).toBe('hello');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(Formatting.capitalize('hello')).toBe('Hello');
    });

    it('returns falsy value unchanged', () => {
      expect(Formatting.capitalize('')).toBe('');
    });
  });

  describe('titleCase', () => {
    it('capitalizes each word', () => {
      expect(Formatting.titleCase('hello world')).toBe('Hello World');
    });

    it('handles single word', () => {
      expect(Formatting.titleCase('hello')).toBe('Hello');
    });
  });

  describe('formatNumber', () => {
    it('formats number with locale', () => {
      const result = Formatting.formatNumber(1234567, 'en-US');
      expect(result).toBe('1,234,567');
    });

    it('formats number with options', () => {
      const result = Formatting.formatNumber(9.99, 'en-US', { style: 'currency', currency: 'USD' });
      expect(result).toContain('9.99');
    });
  });

  describe('removeWhitespace', () => {
    it('removes common leading indentation', () => {
      const input = '\n    hello\n    world';
      const result = Formatting.removeWhitespace(input);
      expect(result).toBe('hello\nworld');
    });

    it('preserves relative indentation', () => {
      const input = '\n  hello\n    world';
      const result = Formatting.removeWhitespace(input);
      expect(result).toBe('hello\n  world');
    });
  });
});
