import { describe, it, expect } from 'vitest';
import ObjectAccess from '../src/helper/object-access.helper';

describe('ObjectAccess', () => {
  describe('deepClone', () => {
    it('clones a simple object', () => {
      const obj = { a: 1, b: 'hello' };
      const clone = ObjectAccess.deepClone(obj);
      expect(clone).toEqual(obj);
      expect(clone).not.toBe(obj);
    });

    it('clones nested objects without sharing references', () => {
      const obj = { a: { b: { c: 42 } } };
      const clone = ObjectAccess.deepClone(obj);
      clone.a.b.c = 99;
      expect(obj.a.b.c).toBe(42);
    });

    it('clones Date objects correctly', () => {
      const date = new Date('2026-01-01');
      const clone = ObjectAccess.deepClone(date);
      expect(clone).toEqual(date);
      expect(clone).not.toBe(date);
    });

    it('clones arrays', () => {
      const arr = [1, 2, { x: 3 }];
      const clone = ObjectAccess.deepClone(arr);
      expect(clone).toEqual(arr);
      expect(clone).not.toBe(arr);
    });
  });

  describe('length', () => {
    it('returns the number of keys', () => {
      expect(ObjectAccess.length({ a: 1, b: 2, c: 3 })).toBe(3);
    });

    it('returns 0 for empty object', () => {
      expect(ObjectAccess.length({})).toBe(0);
    });
  });

  describe('has', () => {
    it('returns true when all keys exist', () => {
      expect(ObjectAccess.has({ a: 1, b: 2 }, ['a', 'b'])).toBe(true);
    });

    it('returns false when a key is missing', () => {
      expect(ObjectAccess.has({ a: 1 }, ['a', 'b'])).toBe(false);
    });
  });

  describe('addProperty', () => {
    it('adds a property and returns a new object', () => {
      const obj = { a: 1 };
      const result = ObjectAccess.addProperty(obj, 'b', 2);
      expect(result).toEqual({ a: 1, b: 2 });
      expect(obj).toEqual({ a: 1 });
    });
  });

  describe('removeProperty', () => {
    it('removes a property and returns a new object', () => {
      const obj = { a: 1, b: 2 };
      const result = ObjectAccess.removeProperty(obj, 'b');
      expect(result).toEqual({ a: 1 });
      expect(obj).toEqual({ a: 1, b: 2 });
    });
  });

  describe('first', () => {
    it('returns first entry as [key, value] tuple by default', () => {
      expect(ObjectAccess.first({ a: 1, b: 2 })).toEqual(['a', 1]);
    });

    it('returns first N entries as array of tuples', () => {
      expect(ObjectAccess.first({ a: 1, b: 2, c: 3 }, 2)).toEqual([['a', 1], ['b', 2]]);
    });

    it('returns undefined for empty object', () => {
      expect(ObjectAccess.first({})).toBeUndefined();
    });

    it('returns empty array when amount > 1 and object is empty', () => {
      expect(ObjectAccess.first({}, 2)).toEqual([]);
    });
  });

  describe('last', () => {
    it('returns last entry as [key, value] tuple by default', () => {
      expect(ObjectAccess.last({ a: 1, b: 2 })).toEqual(['b', 2]);
    });

    it('returns last N entries as array of tuples', () => {
      expect(ObjectAccess.last({ a: 1, b: 2, c: 3 }, 2)).toEqual([['b', 2], ['c', 3]]);
    });

    it('returns undefined for empty object', () => {
      expect(ObjectAccess.last({})).toBeUndefined();
    });
  });

  describe('getRandomProperty', () => {
    it('returns a [key, value] tuple from the object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = ObjectAccess.getRandomProperty(obj) as [string, number];
      expect(Object.entries(obj)).toContainEqual(result);
    });

    it('returns undefined for empty object', () => {
      expect(ObjectAccess.getRandomProperty({})).toBeUndefined();
    });
  });

  describe('pick', () => {
    it('returns object with only specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(ObjectAccess.pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('ignores keys not present in the object', () => {
      const obj = { a: 1 };
      expect(ObjectAccess.pick(obj, ['a', 'b' as keyof typeof obj])).toEqual({ a: 1 });
    });
  });

  describe('omit', () => {
    it('returns object without specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(ObjectAccess.omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('returns full object when no keys match', () => {
      const obj = { a: 1, b: 2 };
      expect(ObjectAccess.omit(obj, [])).toEqual({ a: 1, b: 2 });
    });
  });

  describe('deepMerge', () => {
    it('merges flat objects, source overwrites target', () => {
      expect(ObjectAccess.deepMerge({ a: 1, b: 2 }, { b: 99 })).toEqual({ a: 1, b: 99 });
    });

    it('deep merges nested objects', () => {
      const target = { a: { x: 1, y: 2 } };
      const source = { a: { y: 99 } } as Partial<typeof target>;
      expect(ObjectAccess.deepMerge(target, source)).toEqual({ a: { x: 1, y: 99 } });
    });

    it('does not mutate the original target', () => {
      const target = { a: 1 };
      ObjectAccess.deepMerge(target, { a: 99 });
      expect(target.a).toBe(1);
    });

    it('overwrites array properties without recursing', () => {
      const target = { items: [1, 2, 3] };
      const source = { items: [4, 5] };
      expect(ObjectAccess.deepMerge(target, source)).toEqual({ items: [4, 5] });
    });
  });

  describe('mapValues', () => {
    it('transforms all values with callback', () => {
      const result = ObjectAccess.mapValues({ a: 1, b: 2 }, (v) => v * 2);
      expect(result).toEqual({ a: 2, b: 4 });
    });

    it('passes key to callback', () => {
      const keys: string[] = [];
      ObjectAccess.mapValues({ a: 1, b: 2 }, (v, k) => { keys.push(k as string); return v; });
      expect(keys).toEqual(['a', 'b']);
    });
  });
});
