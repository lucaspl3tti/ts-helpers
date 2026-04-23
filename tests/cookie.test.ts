import { describe, it, expect, beforeEach } from 'vitest';
import Cookie from '../src/helper/cookie.helper';

describe('Cookie', () => {
  beforeEach(() => {
    // Clear all cookies using the helper's own encoding path
    document.cookie.split(';').forEach((cookie) => {
      const rawName = cookie.split('=')[0]?.trim();
      if (rawName) {
        Cookie.delete(decodeURIComponent(rawName));
      }
    });
  });

  describe('set and get', () => {
    it('sets and retrieves a cookie', () => {
      Cookie.set('username', 'Alice');
      expect(Cookie.get('username')).toBe('Alice');
    });

    it('encodes special characters in name and value', () => {
      Cookie.set('my key', 'hello world');
      expect(document.cookie).toContain('my%20key=hello%20world');
      expect(Cookie.get('my key')).toBe('hello world');
    });

    it('returns null for non-existent cookie', () => {
      expect(Cookie.get('nonexistent')).toBeNull();
    });

    it('sets cookie with numeric expiry in days', () => {
      Cookie.set('key', 'value', { expires: 1 });
      expect(Cookie.get('key')).toBe('value');
    });

    it('sets cookie with Date expiry', () => {
      const future = new Date(Date.now() + 86400000);
      Cookie.set('key', 'value', { expires: future });
      expect(Cookie.get('key')).toBe('value');
    });

    it('sets cookie with custom path', () => {
      Cookie.set('key', 'value', { path: '/' });
      expect(Cookie.get('key')).toBe('value');
    });

    it('sets cookie with secure flag', () => {
      Cookie.set('key', 'value', { secure: true });
      expect(Cookie.get('key')).toBe('value');
    });

    it('sets cookie with sameSite option', () => {
      Cookie.set('key', 'value', { sameSite: 'Strict' });
      expect(Cookie.get('key')).toBe('value');
    });

    it('sets cookie with domain option', () => {
      Cookie.set('key', 'value', { domain: 'localhost' });
      expect(Cookie.get('key')).toBe('value');
    });
  });

  describe('delete', () => {
    it('deletes an existing cookie', () => {
      Cookie.set('key', 'value');
      expect(Cookie.get('key')).toBe('value');
      Cookie.delete('key');
      expect(Cookie.get('key')).toBeNull();
    });
  });

  describe('getAll', () => {
    it('returns all cookies as a record', () => {
      Cookie.set('a', '1');
      Cookie.set('b', '2');
      const all = Cookie.getAll();
      expect(all['a']).toBe('1');
      expect(all['b']).toBe('2');
    });

    it('returns empty object when no cookies', () => {
      expect(Cookie.getAll()).toEqual({});
    });
  });

  describe('has', () => {
    it('returns true for an existing cookie', () => {
      Cookie.set('key', 'value');
      expect(Cookie.has('key')).toBe(true);
    });

    it('returns false for a non-existent cookie', () => {
      expect(Cookie.has('nonexistent')).toBe(false);
    });
  });
});
