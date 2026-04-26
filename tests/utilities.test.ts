import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Utilities from '../src/helper/utilities.helper';

describe('Utilities', () => {
  describe('delay', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('resolves after the given milliseconds', async () => {
      const promise = Utilities.delay(100);
      vi.advanceTimersByTime(100);
      await promise;
    });
  });

  describe('debounce', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('calls function only after delay', () => {
      const callback = vi.fn();
      const debounced = Utilities.debounce(callback, 100);
      debounced();
      debounced();
      debounced();
      expect(callback).not.toHaveBeenCalled();
      vi.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('isEmpty', () => {
    it('returns true for null', () => {
      expect(Utilities.isEmpty(null)).toBe(true);
    });

    it('returns true for undefined', () => {
      expect(Utilities.isEmpty(undefined)).toBe(true);
    });

    it('returns true for empty string', () => {
      expect(Utilities.isEmpty('')).toBe(true);
    });

    it('returns true for whitespace string', () => {
      expect(Utilities.isEmpty('   ')).toBe(true);
    });

    it('returns false for non-empty string', () => {
      expect(Utilities.isEmpty('hello')).toBe(false);
    });

    it('returns true for empty array', () => {
      expect(Utilities.isEmpty([])).toBe(true);
    });

    it('returns false for non-empty array', () => {
      expect(Utilities.isEmpty([1])).toBe(false);
    });

    it('returns true for empty Map', () => {
      expect(Utilities.isEmpty(new Map())).toBe(true);
    });

    it('returns false for non-empty Map', () => {
      expect(Utilities.isEmpty(new Map([['k', 'v']]))).toBe(false);
    });

    it('returns true for empty Set', () => {
      expect(Utilities.isEmpty(new Set())).toBe(true);
    });

    it('returns false for non-empty Set', () => {
      expect(Utilities.isEmpty(new Set([1]))).toBe(false);
    });

    it('returns true for empty object', () => {
      expect(Utilities.isEmpty({})).toBe(true);
    });

    it('returns false for non-empty object', () => {
      expect(Utilities.isEmpty({ a: 1 })).toBe(false);
    });

    it('returns true for empty FormData', () => {
      expect(Utilities.isEmpty(new FormData())).toBe(true);
    });

    it('returns false for non-empty FormData', () => {
      const formData = new FormData();
      formData.append('key', 'value');
      expect(Utilities.isEmpty(formData)).toBe(false);
    });

    it('returns false for a truthy primitive (number)', () => {
      expect(Utilities.isEmpty(42 as any)).toBe(false);
    });
  });

  describe('iterate', () => {
    it('iterates over an array', () => {
      const result: number[] = [];
      Utilities.iterate([1, 2, 3], (number) => result.push(number));
      expect(result).toEqual([1, 2, 3]);
    });

    it('iterates over a Map', () => {
      const result: string[] = [];
      Utilities.iterate(
        new Map([['a', 1], ['b', 2]]),
        (value, key) => result.push(`${key}:${value}`),
      );
      expect(result).toEqual(['a:1', 'b:2']);
    });

    it('iterates over a plain object', () => {
      const result: string[] = [];
      Utilities.iterate(
        { x: 1, y: 2 },
        (value, key) => result.push(`${key}=${value}`),
      );
      expect(result).toEqual(['x=1', 'y=2']);
    });

    it('iterates over a string character by character', () => {
      const chars: string[] = [];
      Utilities.iterate('abc', (char: string) => chars.push(char));
      expect(chars).toEqual(['a', 'b', 'c']);
    });

    it('iterates over FormData', () => {
      const formData = new FormData();
      formData.append('key', 'value');
      const result: string[] = [];
      Utilities.iterate(formData, (value, key) => result.push(`${key}:${value}`));
      expect(result).toEqual(['key:value']);
    });

    it('throws for non-iterable type', () => {
      expect(() => Utilities.iterate(42 as any, () => {})).toThrow('not iterable');
    });
  });

  describe('getFormDataFromJson', () => {
    it('converts flat object to FormData', () => {
      const formData = Utilities.getFormDataFromJson({ name: 'Alice', age: '30' });
      expect(formData.get('name')).toBe('Alice');
      expect(formData.get('age')).toBe('30');
    });

    it('handles nested objects with dot notation', () => {
      const formData = Utilities.getFormDataFromJson({ user: { name: 'Bob' } });
      expect(formData.get('user.name')).toBe('Bob');
    });

    it('silently drops falsy values', () => {
      const formData = Utilities.getFormDataFromJson({ name: 'Alice', count: 0 as any });
      expect(formData.get('name')).toBe('Alice');
      expect(formData.get('count')).toBeNull();
    });
  });

  describe('throttle', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('calls function at most once per interval', () => {
      const callback = vi.fn();
      const throttled = Utilities.throttle(callback, 100);
      throttled();
      throttled();
      throttled();
      expect(callback).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(100);
      throttled();
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('memoize', () => {
    it('returns cached result on repeated calls', () => {
      const callback = vi.fn((index: number) => index * 2);
      const memoized = Utilities.memoize(callback);
      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls function again with different args', () => {
      const callback = vi.fn((index: number) => index * 2);
      const memoized = Utilities.memoize(callback);
      memoized(1);
      memoized(2);
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('pipe', () => {
    it('applies functions left to right', () => {
      const add1 = (index: number) => index + 1;
      const double = (index: number) => index * 2;
      expect(Utilities.pipe(add1, double)(3)).toBe(8);
    });
  });

  describe('compose', () => {
    it('applies functions right to left', () => {
      const add1 = (index: number) => index + 1;
      const double = (index: number) => index * 2;
      expect(Utilities.compose(add1, double)(3)).toBe(7);
    });
  });

  describe('getRandomNumber', () => {
    it('returns a number within the given range', () => {
      for (let index = 0; index < 50; index++) {
        const result = Utilities.getRandomNumber(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
      }
    });
  });

  describe('calculatePxFromRem', () => {
    it('returns 0 for falsy value', () => {
      expect(Utilities.calculatePxFromRem(0)).toBe(0);
    });

    it('converts rem number to px using document font size', () => {
      // happy-dom default font size is 16px
      const result = Utilities.calculatePxFromRem(2);
      expect(result).toBe(32);
    });

    it('converts rem string to px', () => {
      const result = Utilities.calculatePxFromRem('1.5');
      expect(result).toBe(24);
    });
  });

  describe('clamp', () => {
    it('returns value when within range', () => {
      expect(Utilities.clamp(5, 1, 10)).toBe(5);
    });

    it('returns min when value is below min', () => {
      expect(Utilities.clamp(0, 1, 10)).toBe(1);
    });

    it('returns max when value is above max', () => {
      expect(Utilities.clamp(11, 1, 10)).toBe(10);
    });
  });

  describe('createClamper', () => {
    it('returns a clamper function with fixed bounds', () => {
      const clamp = Utilities.createClamper(0, 100);
      expect(clamp(50)).toBe(50);
      expect(clamp(-5)).toBe(0);
      expect(clamp(200)).toBe(100);
    });
  });

  describe('getNextSmallerHeadingType', () => {
    it('returns next smaller heading', () => {
      expect(Utilities.getNextSmallerHeadingType('h1')).toBe('h2');
      expect(Utilities.getNextSmallerHeadingType('h5')).toBe('h6');
    });

    it('returns h6 when already at h6', () => {
      expect(Utilities.getNextSmallerHeadingType('h6')).toBe('h6');
    });

    it('falls back to h1 for invalid heading', () => {
      expect(Utilities.getNextSmallerHeadingType('invalid')).toBe('h1');
    });

    it('falls back to h1 for heading level below 1', () => {
      expect(Utilities.getNextSmallerHeadingType('h0')).toBe('h1');
    });
  });

  describe('generateRandomText', () => {
    it('returns string of given length', () => {
      expect(Utilities.generateRandomText(10)).toHaveLength(10);
    });

    it('respects minUppercase constraint', () => {
      const result = Utilities.generateRandomText(10, { minUppercase: 3 });
      const upperCount = result.split('').filter(char => char >= 'A' && char <= 'Z').length;
      expect(upperCount).toBeGreaterThanOrEqual(3);
    });

    it('respects minLowercase constraint', () => {
      const result = Utilities.generateRandomText(10, { minLowercase: 3 });
      const lowerCount = result.split('').filter(char => char >= 'a' && char <= 'z').length;
      expect(lowerCount).toBeGreaterThanOrEqual(3);
    });

    it('respects minNumbers constraint', () => {
      const result = Utilities.generateRandomText(10, { minNumbers: 3 });
      const numCount = result.split('').filter(char => char >= '0' && char <= '9').length;
      expect(numCount).toBeGreaterThanOrEqual(3);
    });

    it('increases length when requirements exceed it', () => {
      const result = Utilities.generateRandomText(2, { minUppercase: 3, minLowercase: 3 });
      expect(result.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe('numberIsEven', () => {
    it('returns true for an even number', () => {
      expect(Utilities.numberIsEven(4)).toBe(true);
    });

    it('returns false for an odd number', () => {
      expect(Utilities.numberIsEven(3)).toBe(false);
    });
  });

  describe('numberIsOdd', () => {
    it('returns true for an odd number', () => {
      expect(Utilities.numberIsOdd(7)).toBe(true);
    });

    it('returns false for an even number', () => {
      expect(Utilities.numberIsOdd(8)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('returns true for a valid email address', () => {
      expect(Utilities.isValidEmail('user@example.com')).toBe(true);
    });

    it('returns false for an invalid email address', () => {
      expect(Utilities.isValidEmail('not-an-email')).toBe(false);
    });
  });
});
