import type { HeadingType, JsonObject, RandomTextOptions } from '../interfaces/general.interface';
import ObjectAccess from './object-access.helper';

/**
 * Utilities provides a collection of general utility functions.
 */
export default class Utilities {
  // ** General utility functions **
  /**
   * Block scope for a given amount of time in ms and run next set piece of
   * code only after given time has passed
   *
   * @NOTE: Must be called with await!
   */
  static delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /**
   * Debounce a function call to prevent it from being called too frequently.
   * The function will only be called after the specified delay has passed
   * since the last call.
   */
  static debounce<Type extends (...args: any[]) => void>(
    callback: Type,
    delay: number,
  ): (...args: Parameters<Type>) => void {
    let timeoutId: ReturnType<typeof setTimeout>|null = null;

    return function(...args: Parameters<Type>): void {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  static isEmpty<Type>(value: Type): boolean {
    if (!value) {
      return true;
    }

    if (typeof value === 'string') {
      return value.trim() === '';
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    if (value instanceof Map || value instanceof Set) {
      return value.size === 0;
    }

    if (value instanceof Object) {
      return ObjectAccess.length(value) === 0;
    }

    if (value instanceof FormData) {
      return ![...value.keys()].length || [...value.keys()].length === 0;
    }

    return false;
  }

  static iterate<Key extends string|number, Item>(
    source: Map<Key, Item>|Array<Item>|FormData|object|string,
    callback: (value: Item, key?: Key) => void,
  ): void {
    if (source instanceof Map || Array.isArray(source)) {
      return source.forEach((value, key) => callback(value, key as Key));
    }

    if (source instanceof FormData) {
      for (const entry of source.entries()) {
        callback(entry[1] as Item, entry[0] as Key);
      }

      return;
    }

    if (typeof source === 'object') {
      return Object.keys(source).forEach((key) => {
        callback((source as Record<string, Item>)[key] as Item, key as Key);
      });
    }

    if (typeof source === 'string') {
      for (const character of source) {
        callback(character as unknown as Item);
      }

      return;
    }

    // if source is not iterable throw error
    throw new Error(`The element type ${typeof source} is not iterable!`);
  }

  static getFormDataFromJson(
    jsonObject: JsonObject,
    parentKey: string = '',
  ): FormData {
    const formData = new FormData();

    this.iterate(Object.entries(jsonObject), ([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (value) {
        if (typeof value === 'object') {
          // Recursively handle nested objects
          const nestedFormData = this.getFormDataFromJson(
            value as JsonObject,
            fullKey,
          );

          nestedFormData.forEach((value, key) => formData.append(key, value));
        } else {
          formData.append(fullKey, value.toString());
        }
      }
    });

    return formData;
  }

  // ##### Number utility functions
  static getRandomNumber(minimumValue: number, maximumValue: number): number {
    return Math.floor(Math.random() * (maximumValue - minimumValue + 1) + minimumValue);
  }

  static numberIsEven(number: number): boolean {
    return number % 2 === 0;
  }

  static numberIsOdd(number: number): boolean {
    return number % 2 !== 0;
  }

  static calculatePxFromRem(rem: number|string): number {
    if (!rem) {
      return 0;
    }

    const value = typeof rem === 'number' ? rem : parseFloat(rem);
    return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  static createClamper(min: number, max: number): (value: number) => number {
    return (value: number): number => this.clamp(value, min, max);
  }

  // ##### Validation utility functions
  static isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+(\+[a-zA-Z0-9._-]+)?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  // ##### Text utility functions
  static getNextSmallerHeadingType(headingType: string): HeadingType {
    const level = parseInt(headingType.replace('h', ''), 10);

    if (isNaN(level) || level < 1 || level > 6) {
      console.warn(`Invalid Heading-Type "${headingType}". Falling back to h1.`);
      return 'h1';
    }

    const nextLevel = level >= 6 ? 6 : level + 1;

    return `h${nextLevel}` as HeadingType;
  }

  static generateRandomText(length: number, options?: RandomTextOptions): string {
    const charactersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLower = 'abcdefghijklmnopqrstuvwxyz';
    const charactersNumbers = '0123456789';

    const allCharacters = charactersUpper + charactersLower + charactersNumbers;
    const result: string[] = [];

    if (options) {
      if (options.minUppercase) {
        for (let index = 0; index < options.minUppercase; index++) {
          result.push(charactersUpper.charAt(this.getRandomNumber(0, charactersUpper.length - 1)));
        }
      }

      if (options.minLowercase) {
        for (let index = 0; index < options.minLowercase; index++) {
          result.push(charactersLower.charAt(this.getRandomNumber(0, charactersLower.length - 1)));
        }
      }

      if (options.minNumbers) {
        for (let index = 0; index < options.minNumbers; index++) {
          result.push(
            charactersNumbers.charAt(this.getRandomNumber(0, charactersNumbers.length - 1)),
          );
        }
      }
    }

    if (result.length > length) {
      console.warn('generateRandomText: Requirements exceed total length. Increasing length.');
      length = result.length; // eslint-disable-line prefer-destructuring
    }

    const remainingLength = length - result.length;

    for (let i = 0; i < remainingLength; i++) {
      result.push(allCharacters.charAt(this.getRandomNumber(0, allCharacters.length - 1)));
    }

    for (let index = result.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [result[index]!, result[swapIndex]!] = [result[swapIndex]!, result[index]!];
    }

    return result.join('');
  }
}
