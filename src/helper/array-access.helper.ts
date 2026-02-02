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

  static flatten<Type>(array: Type[]): Type[] {
    return array.reduce((flat: Type[], toFlatten) => {
      return [
        ...flat,
        ...(Array.isArray(toFlatten) ? this.flatten(toFlatten) : [toFlatten]),
      ];
    }, [] as Type[]);
  }

  static sortByProperty<Type, Key extends keyof Type>(
    array: Type[],
    property: Key,
  ): Type[] {
    return array.sort((a, b) => (a[property] > b[property] ? 1 : -1));
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

  static removeItem<Type>(array: Type[], itemToRemove: Type) {
    return array.filter((item) => item !== itemToRemove);
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
}
