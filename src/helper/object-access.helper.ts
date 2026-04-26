import Utilities from './utilities.helper';

/**
 * ObjectAccess provides utility methods for easily accessing and manipulating objects.
 */
export default class ObjectAccess {
  static length(
    object: object,
  ): number {
    return Object.keys(object).length;
  }

  static has<Type extends object>(
    object: Type,
    key: (keyof Type)[],
  ): boolean {
    return key.every((item) => Object.prototype.hasOwnProperty.call(object, item));
  }

  static first<Type extends Record<string, unknown>>(object: Type, amount: 1): [string, unknown] | undefined; // eslint-disable-line max-len
  static first<Type extends Record<string, unknown>>(object: Type, amount: number): [string, unknown][]; // eslint-disable-line max-len
  static first<Type extends Record<string, unknown>>(object: Type): [string, unknown] | undefined;
  static first<Type extends Record<string, unknown>>(
    object: Type,
    amount = 1,
  ): [string, unknown] | [string, unknown][] | undefined {
    const entries = Object.entries(object);

    if (amount === 1) {
      return entries[0];
    }

    return entries.slice(0, amount);
  }

  static last<Type extends Record<string, unknown>>(object: Type, amount: 1): [string, unknown] | undefined; // eslint-disable-line max-len
  static last<Type extends Record<string, unknown>>(object: Type, amount: number): [string, unknown][]; // eslint-disable-line max-len
  static last<Type extends Record<string, unknown>>(object: Type): [string, unknown] | undefined;
  static last<Type extends Record<string, unknown>>(
    object: Type,
    amount = 1,
  ): [string, unknown] | [string, unknown][] | undefined {
    const entries = Object.entries(object);

    if (amount === 1) {
      return entries[entries.length - 1];
    }

    return entries.slice(-amount);
  }

  static addProperty<Obj extends object, Key extends string | number | symbol, Value>(
    object: Obj,
    keyToAdd: Key,
    valueToAdd: Value,
  ): Obj & Record<Key, Value> {
    return {
      ...object,
      [keyToAdd]: valueToAdd,
    } as Obj & Record<Key, Value>;
  }

  /**
   * @deprecated: Will be removed in a future release. Use `ObjectAccess.omit`
   */
  static removeProperty<Type extends object, Key extends keyof Type>(
    object: Type,
    keyToRemove: Key,
  ): Omit<Type, Key> {
    // eslint-disable-next-line no-unused-vars
    const { [keyToRemove]: removedItem, ...rest } = object;
    return rest as Omit<Type, Key>;
  }

  static getRandomProperty<Type extends Record<string, unknown>>(
    object: Type,
  ): [string, unknown] | undefined {
    const entries = Object.entries(object);
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
    callback: (value: Type[keyof Type], key: keyof Type) => Value,
  ): Record<keyof Type, Value> {
    const result = {} as Record<keyof Type, Value>;

    for (const key of Object.keys(object) as (keyof Type)[]) {
      result[key] = callback(object[key], key);
    }

    return result;
  }
}
