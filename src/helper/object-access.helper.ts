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

  /**
   * @deprecated: Will be removed in a future release. Use `ObjectAccess.omit`
   */
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

  static deepClone<Type>(object: Type): Type {
    return structuredClone(object);
  }

  static pick<Type extends object, Key extends keyof Type>(
    object: Type,
    keys: Key[],
  ): Pick<Type, Key> {
    const result = {} as Pick<Type, Key>;
    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        result[key] = object[key];
      }
    });
    return result;
  }

  static omit<Type extends object, Key extends keyof Type>(
    object: Type,
    keys: Key[],
  ): Omit<Type, Key> {
    const result = { ...object };
    keys.forEach((key) => delete (result as Type)[key]);
    return result as Omit<Type, Key>;
  }

  static deepMerge<Type extends object>(target: Type, source: Partial<Type>): Type {
    const result: Type = structuredClone(target);

    for (const key of Object.keys(source) as (keyof Type)[]) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue !== null &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue !== null &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = ObjectAccess.deepMerge(
          targetValue as object,
          sourceValue as object,
        ) as Type[keyof Type];
      } else {
        result[key] = sourceValue as Type[keyof Type];
      }
    }

    return result;
  }

  static mapValues<Type extends object, Value>(
    object: Type,
    fn: (value: Type[keyof Type], key: keyof Type) => Value,
  ): Record<keyof Type, Value> {
    const result = {} as Record<keyof Type, Value>;

    for (const key of Object.keys(object) as (keyof Type)[]) {
      result[key] = fn(object[key], key);
    }

    return result;
  }
}
