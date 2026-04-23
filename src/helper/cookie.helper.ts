import type { CookieOptions } from '../interfaces/general.interface';

/**
 * Cookie provides a type-safe API for reading and writing browser cookies.
 */
export default class Cookie {
  static set(name: string, value: string, options: CookieOptions = {}): void {
    const { expires, path = '/', domain, secure, sameSite } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires != null) {
      const date =
        typeof expires === 'number'
          ? new Date(Date.now() + expires * 864e5) // days → ms
          : expires;
      cookieString += `; expires=${date.toUTCString()}`;
    }

    cookieString += `; path=${path}`;

    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    if (secure) {
      cookieString += '; secure';
    }

    if (sameSite) {
      cookieString += `; samesite=${sameSite}`;
    }

    document.cookie = cookieString;
  }

  static get(name: string): string | null {
    const key = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      if (cookie.startsWith(key)) {
        return decodeURIComponent(cookie.slice(key.length));
      }
    }

    return null;
  }

  static delete(name: string, path = '/'): void {
    document.cookie = `${encodeURIComponent(name)}=;`
      + ` expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  }

  static getAll(): Record<string, string> {
    const result: Record<string, string> = {};

    if (!document.cookie) {
      return result;
    }

    for (const cookie of document.cookie.split('; ')) {
      const eqIdx = cookie.indexOf('=');

      if (eqIdx === -1) {
        continue;
      }

      const name = decodeURIComponent(cookie.slice(0, eqIdx));
      const value = decodeURIComponent(cookie.slice(eqIdx + 1));
      result[name] = value;
    }

    return result;
  }

  static has(name: string): boolean {
    return this.get(name) !== null;
  }
}
