import type { JsonObject } from '../interfaces/general.interface';
import Utilities from './utilities.helper';

/**
 * ObjectAccess provides utility methods for easily accessing and manipulating objects.
 */
export default class ObjectAccess {
  static length(
    object: JsonObject,
  ): number {
    return Object.keys(object).length;
  }

  static has(
    object: JsonObject,
    key: (keyof JsonObject)[],
  ): boolean {
    return key.every((k) => Object.prototype.hasOwnProperty.call(object, k));
  }

  static first<Key extends string|number|symbol>(
    object: JsonObject,
    amount = 1,
  ): JsonObject|JsonObject[]|undefined {
    const entries = Object.entries(object) as [Key, any][];

    if (amount === 1) {
      return entries[0];
    }

    return entries.slice(0, amount);
  }

  static last<Key extends string|number|symbol>(
    object: JsonObject,
    amount = 1,
  ): JsonObject|JsonObject[]|undefined {
    const entries = Object.entries(object) as [Key, any][];

    if (amount === 1) {
      return entries[entries.length - 1];
    }

    return entries.slice(-amount);
  }

  static addProperty<Key extends string | number | symbol, Value>(
    object: { [key: string|number|symbol]: any },
    keyToAdd: Key,
    valueToAdd: Value,
  ): { [key: string|number|symbol]: any } {
    return {
      ...object,
      [keyToAdd]: valueToAdd,
    };
  }

  static removeProperty<Key extends string | number | symbol>(
    object: JsonObject,
    keyToRemove: Key,
  ): JsonObject {
    // eslint-disable-next-line no-unused-vars
    const { [keyToRemove]: removedItem, ...rest } = object;
    return rest as JsonObject;
  }

  static getRandomProperty<Key extends string | number | symbol>(
    object: JsonObject,
  ): JsonObject|undefined  {
    const entries = Object.entries(object) as [Key, any][];
    const randomIndex = Utilities.getRandomNumber(0, entries.length - 1);

    return entries[randomIndex];
  }

  static deepClone(object: JsonObject): JsonObject|undefined {
    return JSON.parse(JSON.stringify(object));
  }
}
