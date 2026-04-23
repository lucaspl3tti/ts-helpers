import { describe, it, expect } from 'vitest';
import ArrayAccess from '../src/helper/array-access.helper';

describe('ArrayAccess', () => {
  describe('first', () => {
    it('returns the first item by default', () => {
      expect(ArrayAccess.first([1, 2, 3])).toBe(1);
    });

    it('returns first N items as array', () => {
      expect(ArrayAccess.first([1, 2, 3, 4], 2)).toEqual([1, 2]);
    });

    it('returns undefined for empty array', () => {
      expect(ArrayAccess.first([])).toBeUndefined();
    });
  });

  describe('last', () => {
    it('returns the last item by default', () => {
      expect(ArrayAccess.last([1, 2, 3])).toBe(3);
    });

    it('returns last N items as array', () => {
      expect(ArrayAccess.last([1, 2, 3, 4], 2)).toEqual([3, 4]);
    });

    it('returns undefined for empty array', () => {
      expect(ArrayAccess.last([])).toBeUndefined();
    });
  });

  describe('flatten', () => {
    it('flattens nested array with default depth', () => {
      expect(ArrayAccess.flatten([[1, [2]], [3]])).toEqual([1, 2, 3]);
    });

    it('flattens to specified depth', () => {
      expect(ArrayAccess.flatten([1, [2, [3]]], 1)).toEqual([1, 2, [3]]);
    });

    it('returns flat array unchanged', () => {
      expect(ArrayAccess.flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('sortByProperty', () => {
    const items = [{ age: 30 }, { age: 20 }, { age: 25 }];

    it('sorts ascending by default', () => {
      expect(ArrayAccess.sortByProperty(items, 'age').map(i => i.age)).toEqual([20, 25, 30]);
    });

    it('sorts descending when specified', () => {
      expect(ArrayAccess.sortByProperty(items, 'age', 'desc').map(i => i.age)).toEqual([30, 25, 20]);
    });

    it('does not mutate original array', () => {
      const original = [...items];
      ArrayAccess.sortByProperty(items, 'age');
      expect(items).toEqual(original);
    });

    it('preserves order of equal-value items', () => {
      const result = ArrayAccess.sortByProperty(
        [{ age: 20 }, { age: 20 }],
        'age',
      );
      expect(result.map(i => i.age)).toEqual([20, 20]);
    });
  });

  describe('getObjectByValue', () => {
    const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

    it('returns object matching key/value', () => {
      expect(ArrayAccess.getObjectByValue(items, 'id', 2)).toEqual({ id: 2, name: 'Bob' });
    });

    it('returns undefined when not found', () => {
      expect(ArrayAccess.getObjectByValue(items, 'id', 99)).toBeUndefined();
    });
  });

  describe('hasObjectWithValue', () => {
    const items = [{ id: 1 }, { id: 2 }];

    it('returns true when object with value exists', () => {
      expect(ArrayAccess.hasObjectWithValue(items, 'id', 1)).toBe(true);
    });

    it('returns false when not found', () => {
      expect(ArrayAccess.hasObjectWithValue(items, 'id', 99)).toBe(false);
    });
  });

  describe('removeItem', () => {
    it('removes item by value', () => {
      expect(ArrayAccess.removeItem([1, 2, 3], 2)).toEqual([1, 3]);
    });

    it('removes item by predicate', () => {
      expect(ArrayAccess.removeItem([1, 2, 3], (x) => x > 1)).toEqual([1]);
    });

    it('returns unchanged array when item not found', () => {
      expect(ArrayAccess.removeItem([1, 2, 3], 99)).toEqual([1, 2, 3]);
    });
  });

  describe('getRandomItem', () => {
    it('returns an item from the array', () => {
      const arr = [1, 2, 3];
      const result = ArrayAccess.getRandomItem(arr);
      expect(arr).toContain(result);
    });

    it('returns undefined for empty array', () => {
      expect(ArrayAccess.getRandomItem([])).toBeUndefined();
    });
  });

  describe('wrapInArray', () => {
    it('wraps a value in an array', () => {
      expect(ArrayAccess.wrapInArray('hello')).toEqual(['hello']);
    });

    it('returns empty array for null', () => {
      expect(ArrayAccess.wrapInArray(null)).toEqual([]);
    });

    it('returns empty array for undefined', () => {
      expect(ArrayAccess.wrapInArray(undefined)).toEqual([]);
    });

    it('returns array unchanged when already array', () => {
      expect(ArrayAccess.wrapInArray([1, 2])).toEqual([1, 2]);
    });
  });

  describe('toStringSentence', () => {
    it('converts array to sentence with and', () => {
      expect(ArrayAccess.toStringSentence(['a', 'b', 'c'])).toBe('a, b and c.');
    });

    it('handles single item', () => {
      // Single item: join gives 'a', regex does not match so no period is appended
      expect(ArrayAccess.toStringSentence(['a'])).toBe('a');
    });

    it('returns empty string for empty array', () => {
      expect(ArrayAccess.toStringSentence([])).toBe('');
    });

    it('converts two-item array with "and" separator and period', () => {
      expect(ArrayAccess.toStringSentence(['a', 'b'])).toBe('a and b.');
    });
  });

  describe('toCommaSeparatedString', () => {
    it('joins items with comma and space', () => {
      expect(ArrayAccess.toCommaSeparatedString(['a', 'b', 'c'])).toBe('a, b, c');
    });

    it('returns empty string for empty array', () => {
      expect(ArrayAccess.toCommaSeparatedString([])).toBe('');
    });
  });

  describe('getArrayFromNewlines', () => {
    it('splits string by newlines', () => {
      expect(ArrayAccess.getArrayFromNewlines('a\nb\nc')).toEqual(['a', 'b', 'c']);
    });

    it('returns empty array for empty string', () => {
      expect(ArrayAccess.getArrayFromNewlines('')).toEqual([]);
    });
  });

  describe('getArrayFromCommas', () => {
    it('splits CSV string and trims values', () => {
      expect(ArrayAccess.getArrayFromCommas('a, b , c')).toEqual(['a', 'b', 'c']);
    });

    it('returns empty array for empty string', () => {
      expect(ArrayAccess.getArrayFromCommas('')).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('splits array into chunks of given size', () => {
      expect(ArrayAccess.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('returns empty array for size <= 0', () => {
      expect(ArrayAccess.chunk([1, 2, 3], 0)).toEqual([]);
    });

    it('returns single chunk when size >= length', () => {
      expect(ArrayAccess.chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
  });

  describe('unique', () => {
    it('removes duplicates', () => {
      expect(ArrayAccess.unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });

    it('returns unchanged array with no duplicates', () => {
      expect(ArrayAccess.unique([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('uniqueBy', () => {
    it('removes duplicates by property', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 1 }];
      expect(ArrayAccess.uniqueBy(items, 'id')).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });

  describe('groupBy', () => {
    it('groups array items by property', () => {
      const items = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
      expect(ArrayAccess.groupBy(items, 'type')).toEqual({
        a: [{ type: 'a' }, { type: 'a' }],
        b: [{ type: 'b' }],
      });
    });
  });

  describe('zip', () => {
    it('combines two arrays into tuples', () => {
      expect(ArrayAccess.zip([1, 2], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']]);
    });

    it('stops at shorter array', () => {
      expect(ArrayAccess.zip([1, 2, 3], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']]);
    });
  });

  describe('intersection', () => {
    it('returns elements common to both arrays', () => {
      expect(ArrayAccess.intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    });

    it('returns empty array when no common elements', () => {
      expect(ArrayAccess.intersection([1, 2], [3, 4])).toEqual([]);
    });
  });

  describe('difference', () => {
    it('returns elements only in first array', () => {
      expect(ArrayAccess.difference([1, 2, 3], [2, 3])).toEqual([1]);
    });

    it('returns empty array when all elements are in second array', () => {
      expect(ArrayAccess.difference([1, 2], [1, 2, 3])).toEqual([]);
    });
  });

  describe('union', () => {
    it('combines unique elements from both arrays', () => {
      expect(ArrayAccess.union([1, 2], [2, 3])).toEqual([1, 2, 3]);
    });

    it('returns unique values from both', () => {
      expect(ArrayAccess.union([1, 1], [2, 2])).toEqual([1, 2]);
    });
  });
});
