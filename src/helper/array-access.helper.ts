import Utilities from './utilities.helper';
import type { ComparableKeys } from '../types/base.types';

/**
 * ArrayAccess provides utility methods for easily accessing and manipulating arrays
 */
export default class ArrayAccess {
  static first<Type>(array: Type[], amount: 1): Type | undefined;
  static first<Type>(array: Type[], amount: number): Type[];
  static first<Type>(array: Type[]): Type | undefined;
  static first<Type>(array: Type[], amount = 1): Type | Type[] | undefined {
    if (amount === 1) {
      return array[0];
    }

    return array.slice(0, amount);
  }

  static last<Type>(array: Type[], amount: 1): Type | undefined;
  static last<Type>(array: Type[], amount: number): Type[];
  static last<Type>(array: Type[]): Type | undefined;
  static last<Type>(array: Type[], amount = 1): Type | Type[] | undefined {
    if (amount === 1) {
      return array[array.length - 1];
    }

    return array.slice(-amount);
  }

  static flatten<Type>(array: Type[], depth = Infinity): Type[] {
    return array.flat(depth) as Type[];
  }

  static sortByProperty<Type, Key extends ComparableKeys<Type>>(
    array: Type[],
    property: Key,
    direction: 'asc' | 'desc' = 'asc',
  ): Type[] {
    return [...array].sort((itemA, itemB) => {
      if (itemA[property] > itemB[property]) {
        return direction === 'asc' ? 1 : -1;
      }

      if (itemA[property] < itemB[property]) {
        return direction === 'asc' ? -1 : 1;
      }

      return 0;
    });
  }

  static getObjectByValue<Type extends Record<string, unknown>, Key extends keyof Type>(
    array: Type[],
    key: Key,
    value: Type[Key],
  ): Type|undefined {
    return array.find((item) => item[key] === value);
  }

  static hasObjectWithValue<Type, Key extends keyof Type>(
    array: Type[],
    key: Key,
    value: Type[Key],
  ): boolean {
    return array.some((item) => item[key] === value);
  }

  static removeItem<Type>(
    array: Type[],
    itemOrPredicate: Type | ((item: Type) => boolean),
  ): Type[] {
    if (typeof itemOrPredicate === 'function') {
      return array.filter((item) => !(itemOrPredicate as (item: Type) => boolean)(item));
    }

    return array.filter((item) => item !== itemOrPredicate);
  }

  static getRandomItem<Type>(array: Type[]): Type|undefined {
    return array[Utilities.getRandomNumber(0, array.length - 1)];
  }

  static wrapInArray<Type>(value: Type|null|undefined): Type[] {
    if (value === null || value === undefined) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  }

  static toStringSentence(array: string[]): string {
    if (!array.length) {
      return '';
    }

    return array.join(', ').replace(/, ([^,]*)$/, ' and $1.');
  }

  static toCommaSeparatedString(array: string[]): string {
    if (!array.length) {
      return '';
    }

    return array.join(', ');
  }

  static getArrayFromNewlines(string: string): string[] {
    if (Utilities.isEmpty(string)) {
      return [];
    }

    return string.split(/\n|\s\n/);
  }

  static getArrayFromCommas(string: string): string[] {
    if (Utilities.isEmpty(string)) {
      return [];
    }

    return string.split(',').map(item => item.trim());
  }

  static chunk<Type>(array: Type[], size: number): Type[][] {
    if (size <= 0) {
      return [];
    }

    const result: Type[][] = [];

    for (let index = 0; index < array.length; index += size) {
      result.push(array.slice(index, index + size));
    }

    return result;
  }

  static unique<Type>(array: Type[]): Type[] {
    return [...new Set(array)];
  }

  static uniqueBy<Type, Key extends keyof Type>(array: Type[], key: Key): Type[] {
    const seen = new Set<Type[Key]>();
    return array.filter((item) => {
      const value = item[key];

      if (seen.has(value)) {
        return false;
      }

      seen.add(value);
      return true;
    });
  }

  static groupBy<Type, Key extends keyof Type>(array: Type[], key: Key): Record<string, Type[]> {
    return array.reduce((groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<string, Type[]>);
  }

  static zip<A, B>(itemA: A[], itemB: B[]): [A, B][] {
    const length = Math.min(itemA.length, itemB.length);
    return Array.from({ length }, (value, index) => [
      itemA[index] as A,
      itemB[index] as B,
    ] as [A, B]);
  }

  static intersection<Type>(itemA: Type[], itemB: Type[]): Type[] {
    const setB = new Set(itemB);
    return itemA.filter((item) => setB.has(item));
  }

  static difference<Type>(itemA: Type[], itemB: Type[]): Type[] {
    const setB = new Set(itemB);
    return itemA.filter((item) => !setB.has(item));
  }

  static union<Type>(itemA: Type[], itemB: Type[]): Type[] {
    return this.unique([...itemA, ...itemB]);
  }
}
