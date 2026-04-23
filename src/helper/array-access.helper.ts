import Utilities from './utilities.helper';

/**
 * ArrayAccess provides utility methods for easily accessing and manipulating arrays
 */
export default class ArrayAccess {
  static first<Type>(array: Type[], amount = 1): Type|Type[]|undefined {
    if (amount === 1) {
      return array[0];
    }

    return array.slice(0, amount);
  }

  static last<Type>(array: Type[], amount = 1): Type|Type[]|undefined {
    if (amount === 1) {
      return array[array.length - 1];
    }

    return array.slice(-amount);
  }

  static flatten<Type>(array: Type[], depth = Infinity): Type[] {
    return array.flat(depth) as Type[];
  }

  static sortByProperty<Type, Key extends keyof Type>(
    array: Type[],
    property: Key,
    direction: 'asc' | 'desc' = 'asc',
  ): Type[] {
    return [...array].sort((a, b) => {
      if (a[property] > b[property]) {
        return direction === 'asc' ? 1 : -1;
      }

      if (a[property] < b[property]) {
        return direction === 'asc' ? -1 : 1;
      }

      return 0;
    });
  }

  static getObjectByValue<Type extends object, Key extends keyof Type>(
    array: Type[],
    key: Key,
    value: Type[Key],
  ): Type|undefined {
    return array.find((item) => item[key] === value);
  }

  static hasObjectWithValue<Type>(
    array: Type[],
    key: keyof Type,
    value: Type[keyof Type],
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

    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  }

  static unique<Type>(array: Type[]): Type[] {
    return [...new Set(array)];
  }

  static uniqueBy<Type>(array: Type[], key: keyof Type): Type[] {
    const seen = new Set();
    return array.filter((item) => {
      const value = item[key];

      if (seen.has(value)) {
        return false;
      }

      seen.add(value);
      return true;
    });
  }

  static groupBy<Type>(array: Type[], key: keyof Type): Record<string, Type[]> {
    return array.reduce((groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<string, Type[]>);
  }

  static zip<A, B>(a: A[], b: B[]): [A, B][] {
    const length = Math.min(a.length, b.length);
    const result: [A, B][] = [];

    for (let index = 0; index < length; index++) {
      result.push([a[index]!, b[index]!]);
    }

    return result;
  }

  static intersection<Type>(a: Type[], b: Type[]): Type[] {
    const setB = new Set(b);
    return a.filter((item) => setB.has(item));
  }

  static difference<Type>(a: Type[], b: Type[]): Type[] {
    const setB = new Set(b);
    return a.filter((item) => !setB.has(item));
  }

  static union<Type>(a: Type[], b: Type[]): Type[] {
    return this.unique([...a, ...b]);
  }
}
