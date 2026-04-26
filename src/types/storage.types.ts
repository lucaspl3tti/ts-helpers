export type StorageType = 'local' | 'session';

export interface StorageOptions {
  /** Time-to-live in seconds. After expiry `get()` returns `null`. */
  ttl?: number;
  /** Which storage to use. Defaults to `'local'`. */
  storage?: StorageType;
}

export interface StorageEntry<Value> {
  value: Value;
  expiresAt: number | null;
}
