import { describe, it, expect } from 'vitest';
import StringHelper from '../src/helper/string.helper';

describe('StringHelper', () => {
  describe('slugify', () => {
    it('converts spaces to dashes and lowercases', () => {
      expect(StringHelper.slugify('Hello World')).toBe('hello-world');
    });

    it('removes diacritics', () => {
      expect(StringHelper.slugify('Héllo Wörld')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(StringHelper.slugify('Hello! World?')).toBe('hello-world');
    });

    it('collapses multiple spaces/dashes', () => {
      expect(StringHelper.slugify('hello   world')).toBe('hello-world');
    });

    it('strips leading and trailing dashes', () => {
      expect(StringHelper.slugify('  hello  ')).toBe('hello');
    });

    it('handles empty string', () => {
      expect(StringHelper.slugify('')).toBe('');
    });
  });

  describe('truncateMiddle', () => {
    it('returns string unchanged if within maxLen', () => {
      expect(StringHelper.truncateMiddle('hello', 10)).toBe('hello');
    });

    it('truncates with ellipsis in the middle', () => {
      expect(StringHelper.truncateMiddle('1234567890', 7)).toBe('123\u2026890');
    });

    it('handles exact maxLen', () => {
      expect(StringHelper.truncateMiddle('hello', 5)).toBe('hello');
    });

    it('handles maxLen of 1 (only ellipsis)', () => {
      expect(StringHelper.truncateMiddle('hello', 1)).toBe('\u2026');
    });
  });

  describe('countOccurrences', () => {
    it('counts substring occurrences correctly', () => {
      expect(StringHelper.countOccurrences('hello world hello', 'hello')).toBe(2);
    });

    it('returns 0 for empty search string', () => {
      expect(StringHelper.countOccurrences('hello', '')).toBe(0);
    });

    it('returns 0 when substring not found', () => {
      expect(StringHelper.countOccurrences('hello', 'xyz')).toBe(0);
    });

    it('treats matches as non-overlapping (aaa → 1 for search aa)', () => {
      expect(StringHelper.countOccurrences('aaa', 'aa')).toBe(1);
    });
  });

  describe('stripHtml', () => {
    it('removes HTML tags', () => {
      expect(StringHelper.stripHtml('<p>Hello <b>World</b></p>')).toBe('Hello World');
    });

    it('returns plain string unchanged', () => {
      expect(StringHelper.stripHtml('Hello World')).toBe('Hello World');
    });

    it('handles empty string', () => {
      expect(StringHelper.stripHtml('')).toBe('');
    });
  });

  describe('template', () => {
    it('replaces template variables', () => {
      expect(StringHelper.template('Hello {name}!', { name: 'World' })).toBe('Hello World!');
    });

    it('leaves unknown keys unchanged', () => {
      expect(StringHelper.template('Hello {name}!', {})).toBe('Hello {name}!');
    });

    it('replaces multiple variables', () => {
      expect(StringHelper.template('{a} and {b}', { a: 'foo', b: 'bar' })).toBe('foo and bar');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(StringHelper.capitalize('hello')).toBe('Hello');
    });

    it('returns empty string unchanged', () => {
      expect(StringHelper.capitalize('')).toBe('');
    });

    it('handles already capitalized string', () => {
      expect(StringHelper.capitalize('Hello')).toBe('Hello');
    });
  });

  describe('titleCase', () => {
    it('capitalizes first letter of each word', () => {
      expect(StringHelper.titleCase('hello world')).toBe('Hello World');
    });

    it('handles single word', () => {
      expect(StringHelper.titleCase('hello')).toBe('Hello');
    });

    it('handles empty string', () => {
      expect(StringHelper.titleCase('')).toBe('');
    });
  });
});
