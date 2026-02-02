import Dom from './dom.helper';

/**
 * Formatting provides utility methods for formatting various data types,
 * such as dates, bytes, strings, and more.
 */
export default class Formatting {
  static formatDate(
    value: string|Date,
    options: Intl.DateTimeFormatOptions = {},
  ): string {
    if (!value || value === '') {
      throw new Error('Date value must not be null or empty');
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    const languageCode = navigator?.language || 'de-DE';

    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    options = { ...defaultOptions, ...options };

    const dateTimeFormatter = new Intl.DateTimeFormat(languageCode, options);
    return dateTimeFormatter.format(date);
  }

  static formatBytes(bytes: number): string {
    const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb'];

    if (bytes === 0) {
      return '0 Bytes';
    }

    const magnitude = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = parseFloat((bytes / Math.pow(1024, magnitude)).toFixed(2));
    return `${size} ${sizes[magnitude]}`;
  }

  static decodeString(string: string): string {
    if (string.length === 0) {
      return string;
    }

    const textarea: HTMLTextAreaElement = Dom.createElement('textarea', {
      html: string,
    });

    const decodedString = textarea.value;
    textarea.remove();

    return decodedString;
  }

  static truncateString(
    string: string,
    maxCharacters: number,
    useWordBoundary = true,
  ): string {
    if (string.length <= maxCharacters) {
      return string;
    }

    let newString = string.slice(0, maxCharacters - 1);

    if (useWordBoundary) {
      newString = newString.slice(0, newString.lastIndexOf(' '));
    }

    newString += '\u2026';
    return newString;
  }

  static camelToDashCase(string: string): string {
    return string.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
  }

  static spaceToDashCase(string: string): string {
    return string.replace(' ', '-').toLowerCase();
  }

  /**
   * Convert a given string to a string with a unit.
   *
   * If the given string is empty or not a number, it will return null.
   * If the given string is a number, it will return a string with the given
   * unit (default is 'px').
   */
  static convertToUnit(string: string|number, unit = 'px'): string|null {
    if (string === null || string === '') {
      return null;
    } else if (isNaN(+string)) {
      return String(string);
    } else if (!isFinite(+string)) {
      return null;
    } else {
      return `${Number(string)}${unit}`;
    }
  }

  static removeWhitespace(str: string) {
    const lines = str
      .replace(/^\n/, '')
      .split('\n');
    const indent = Math.min(
      ...lines.filter(Boolean)
        .map(line => line.match(/^\s*/)![0].length),
    );

    return lines.map(line => line.slice(indent)).join('\n');
  }
}
