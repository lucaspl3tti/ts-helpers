import { describe, it, expect } from 'vitest';
import Validation from '../src/helper/validation.helper';

describe('Validation', () => {
  describe('isValidEmail', () => {
    it('returns true for a valid email', () => {
      expect(Validation.isValidEmail('user@example.com')).toBe(true);
    });

    it('returns true for email with plus tag', () => {
      expect(Validation.isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('returns false for email without @', () => {
      expect(Validation.isValidEmail('userexample.com')).toBe(false);
    });

    it('returns false for email without domain', () => {
      expect(Validation.isValidEmail('user@')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(Validation.isValidEmail('')).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('returns true for https URL', () => {
      expect(Validation.isUrl('https://example.com')).toBe(true);
    });

    it('returns true for http URL', () => {
      expect(Validation.isUrl('http://example.com')).toBe(true);
    });

    it('returns false for ftp URL', () => {
      expect(Validation.isUrl('ftp://example.com')).toBe(false);
    });

    it('returns false for plain string', () => {
      expect(Validation.isUrl('not-a-url')).toBe(false);
    });
  });

  describe('isPhoneNumber', () => {
    it('returns true for international phone', () => {
      expect(Validation.isPhoneNumber('+49 123 456789')).toBe(true);
    });

    it('returns true for phone with dashes', () => {
      expect(Validation.isPhoneNumber('123-456-7890')).toBe(true);
    });

    it('returns false for too short number', () => {
      expect(Validation.isPhoneNumber('123')).toBe(false);
    });

    it('returns false for string with letters', () => {
      expect(Validation.isPhoneNumber('abc-def-ghij')).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('returns true for integer string', () => {
      expect(Validation.isNumeric('42')).toBe(true);
    });

    it('returns true for decimal string', () => {
      expect(Validation.isNumeric('3.14')).toBe(true);
    });

    it('returns false for non-numeric string', () => {
      expect(Validation.isNumeric('abc')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(Validation.isNumeric('')).toBe(false);
    });

    it('returns false for whitespace only', () => {
      expect(Validation.isNumeric('   ')).toBe(false);
    });
  });

  describe('isBetween', () => {
    it('returns true when number is within range', () => {
      expect(Validation.isBetween(5, 1, 10)).toBe(true);
    });

    it('returns true when number equals min', () => {
      expect(Validation.isBetween(1, 1, 10)).toBe(true);
    });

    it('returns true when number equals max', () => {
      expect(Validation.isBetween(10, 1, 10)).toBe(true);
    });

    it('returns false when number is below min', () => {
      expect(Validation.isBetween(0, 1, 10)).toBe(false);
    });

    it('returns false when number is above max', () => {
      expect(Validation.isBetween(11, 1, 10)).toBe(false);
    });
  });

  describe('isEven', () => {
    it('returns true for even number', () => {
      expect(Validation.isEven(4)).toBe(true);
    });

    it('returns false for odd number', () => {
      expect(Validation.isEven(3)).toBe(false);
    });

    it('returns true for zero', () => {
      expect(Validation.isEven(0)).toBe(true);
    });
  });

  describe('isOdd', () => {
    it('returns true for odd number', () => {
      expect(Validation.isOdd(3)).toBe(true);
    });

    it('returns false for even number', () => {
      expect(Validation.isOdd(4)).toBe(false);
    });
  });

  describe('isIban', () => {
    it('returns true for valid German IBAN', () => {
      expect(Validation.isIban('DE89370400440532013000')).toBe(true);
    });

    it('returns true for IBAN with spaces', () => {
      expect(Validation.isIban('DE89 3704 0044 0532 0130 00')).toBe(true);
    });

    it('returns false for IBAN with invalid checksum', () => {
      expect(Validation.isIban('DE00370400440532013000')).toBe(false);
    });

    it('returns false for string with wrong format', () => {
      expect(Validation.isIban('NOTANIBAN')).toBe(false);
    });
  });
});
