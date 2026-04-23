/**
 * StringHelper provides advanced string manipulation utilities that go
 * beyond the basic formatting methods in the `Formatting` class.
 */
export default class StringHelper {
  static slugify(string: string): string {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static truncateMiddle(string: string, maxLen: number): string {
    if (string.length <= maxLen) {
      return string;
    }

    const half = Math.floor((maxLen - 1) / 2);
    const start = string.slice(0, half);
    const end = string.slice(string.length - (maxLen - 1 - half));
    return `${start}\u2026${end}`;
  }

  static countOccurrences(string: string, search: string): number {
    if (!search) {
      return 0;
    }
    let count = 0;
    let position = string.indexOf(search);

    while (position !== -1) {
      count++;
      position = string.indexOf(search, position + search.length);
    }

    return count;
  }

  static stripHtml(string: string): string {
    return string.replace(/<[^>]*>/g, '');
  }

  static template(string: string, vars: Record<string, string>): string {
    return string.replace(/\{(\w+)\}/g, (ignored, key) => vars[key] ?? `{${key}}`);
  }

  static capitalize(string: string): string {
    if (!string) {
      return string;
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static titleCase(string: string): string {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
