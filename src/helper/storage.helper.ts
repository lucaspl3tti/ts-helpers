import type { StorageOptions, StorageType, StorageEntry } from '../interfaces/general.interface';

/**
 * Storage provides a type-safe wrapper around `localStorage` and
 * `sessionStorage` with optional time-to-live (TTL) support.
 */
export default class Storage {
  private static getStore(type: StorageType = 'local'): globalThis.Storage {
    return type === 'session' ? sessionStorage : localStorage;
  }

  static set<Value>(key: string, value: Value, options: StorageOptions = {}): void {
    const { ttl, storage = 'local' } = options;
    const entry: StorageEntry<Value> = {
      value,
      expiresAt: ttl != null ? Date.now() + ttl * 1000 : null,
    };

    this.getStore(storage).setItem(key, JSON.stringify(entry));
  }

  static get<Value>(key: string, storage: StorageType = 'local'): Value | null {
    const raw = this.getStore(storage).getItem(key);
    if (raw === null) {
      return null;
    }

    try {
      const entry = JSON.parse(raw) as StorageEntry<Value>;

      if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
        this.getStore(storage).removeItem(key);
        return null;
      }

      return entry.value;
    } catch {
      return null;
    }
  }

  static remove(key: string, storage: StorageType = 'local'): void {
    this.getStore(storage).removeItem(key);
  }

  static clear(storage: StorageType = 'local'): void {
    this.getStore(storage).clear();
  }

  static has(key: string, storage: StorageType = 'local'): boolean {
    return this.get(key, storage) !== null;
  }
}
