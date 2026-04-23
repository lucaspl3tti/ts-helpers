/**
 * Validation provides common validation helpers beyond `Utilities.isValidEmail`.
 */
export default class Validation {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+(\+[a-zA-Z0-9._-]+)?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  static isUrl(string: string): boolean {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  static isPhoneNumber(string: string): boolean {
    return /^\+?[\d\s\-().]{7,20}$/.test(string.trim());
  }

  static isNumeric(string: string): boolean {
    return string.trim() !== '' && isFinite(Number(string));
  }

  static isBetween(number: number, min: number, max: number): boolean {
    return number >= min && number <= max;
  }

  static isEven(number: number): boolean {
    return number % 2 === 0;
  }

  static isOdd(number: number): boolean {
    return number % 2 !== 0;
  }

  static isIban(string: string): boolean {
    const cleaned = string.replace(/\s+/g, '').toUpperCase();

    if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(cleaned)) {
      return false;
    }

    // Move first 4 chars to the end, then replace letters with numbers (A=10 … Z=35)
    const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
    const numeric = rearranged.replace(/[A-Z]/g, (char) =>
      String(char.charCodeAt(0) - 55),
    );

    // Modulo 97 via chunked big-integer arithmetic
    let remainder = 0;
    for (let i = 0; i < numeric.length; i++) {
      remainder = (remainder * 10 + Number(numeric[i])) % 97;
    }

    return remainder === 1;
  }
}
