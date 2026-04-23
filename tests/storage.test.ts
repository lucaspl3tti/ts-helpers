import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Storage from '../src/helper/storage.helper';

describe('Storage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('set and get', () => {
    it('stores and retrieves a value from localStorage', () => {
      Storage.set('key', { name: 'Alice' });
      expect(Storage.get('key')).toEqual({ name: 'Alice' });
    });

    it('stores and retrieves a value from sessionStorage', () => {
      Storage.set('key', 'hello', { storage: 'session' });
      expect(Storage.get('key', 'session')).toBe('hello');
    });

    it('returns null for missing key', () => {
      expect(Storage.get('missing')).toBeNull();
    });

    it('returns null for corrupted JSON', () => {
      localStorage.setItem('bad', 'not-json');
      expect(Storage.get('bad')).toBeNull();
    });
  });

  describe('TTL expiry', () => {
    it('returns value before TTL expires', () => {
      Storage.set('key', 'value', { ttl: 60 });
      expect(Storage.get('key')).toBe('value');
    });

    it('returns null after TTL expires', () => {
      const now = Date.now();
      Storage.set('key', 'value', { ttl: 1 });
      vi.spyOn(Date, 'now').mockReturnValue(now + 2000);
      expect(Storage.get('key')).toBeNull();
    });
  });

  describe('remove', () => {
    it('removes a key from localStorage', () => {
      Storage.set('key', 'value');
      Storage.remove('key');
      expect(Storage.get('key')).toBeNull();
    });

    it('removes a key from sessionStorage', () => {
      Storage.set('key', 'value', { storage: 'session' });
      Storage.remove('key', 'session');
      expect(Storage.get('key', 'session')).toBeNull();
    });
  });

  describe('clear', () => {
    it('clears all keys from localStorage', () => {
      Storage.set('a', 1);
      Storage.set('b', 2);
      Storage.clear();
      expect(Storage.get('a')).toBeNull();
      expect(Storage.get('b')).toBeNull();
    });

    it('clears all keys from sessionStorage', () => {
      Storage.set('a', 1, { storage: 'session' });
      Storage.clear('session');
      expect(Storage.get('a', 'session')).toBeNull();
    });
  });

  describe('has', () => {
    it('returns true when key exists and is not expired', () => {
      Storage.set('key', 'value');
      expect(Storage.has('key')).toBe(true);
    });

    it('returns false when key does not exist', () => {
      expect(Storage.has('nonexistent')).toBe(false);
    });

    it('returns false when key has expired', () => {
      const now = Date.now();
      Storage.set('key', 'value', { ttl: 1 });
      vi.spyOn(Date, 'now').mockReturnValue(now + 2000);
      expect(Storage.has('key')).toBe(false);
    });

    it('returns true when key exists in sessionStorage', () => {
      Storage.set('key', 'value', { storage: 'session' });
      expect(Storage.has('key', 'session')).toBe(true);
    });
  });
});
