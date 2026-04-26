import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import DeviceAccess from '../src/helper/device-access.helper';

function mockMatchMedia(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
}

describe('DeviceAccess', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('hasAnyFinePointer', () => {
    it('returns true when media query matches', () => {
      mockMatchMedia(true);
      expect(DeviceAccess.hasAnyFinePointer()).toBe(true);
    });

    it('returns false when media query does not match', () => {
      mockMatchMedia(false);
      expect(DeviceAccess.hasAnyFinePointer()).toBe(false);
    });
  });

  describe('hasAnyCoarsePointer', () => {
    it('returns true when media query matches', () => {
      mockMatchMedia(true);
      expect(DeviceAccess.hasAnyCoarsePointer()).toBe(true);
    });

    it('returns false when media query does not match', () => {
      mockMatchMedia(false);
      expect(DeviceAccess.hasAnyCoarsePointer()).toBe(false);
    });
  });

  describe('canAnyInputHover', () => {
    it('returns true when media query matches', () => {
      mockMatchMedia(true);
      expect(DeviceAccess.canAnyInputHover()).toBe(true);
    });

    it('returns false when media query does not match', () => {
      mockMatchMedia(false);
      expect(DeviceAccess.canAnyInputHover()).toBe(false);
    });
  });

  describe('isTouch', () => {
    let originalMaxTouchPoints: number;

    beforeEach(() => {
      originalMaxTouchPoints = navigator.maxTouchPoints;
    });

    afterEach(() => {
      Object.defineProperty(navigator, 'maxTouchPoints', {
        configurable: true,
        value: originalMaxTouchPoints,
      });
    });

    it('returns true when maxTouchPoints > 0', () => {
      Object.defineProperty(navigator, 'maxTouchPoints', {
        configurable: true,
        value: 5,
      });
      mockMatchMedia(false);
      expect(DeviceAccess.isTouch()).toBe(true);
    });

    it('returns true when coarse pointer matches', () => {
      Object.defineProperty(navigator, 'maxTouchPoints', {
        configurable: true,
        value: 0,
      });
      mockMatchMedia(true);
      expect(DeviceAccess.isTouch()).toBe(true);
    });

    it('returns false when no touch indicators', () => {
      Object.defineProperty(navigator, 'maxTouchPoints', {
        configurable: true,
        value: 0,
      });
      mockMatchMedia(false);
      expect(DeviceAccess.isTouch()).toBe(false);
    });
  });

  describe('isHoverCapable', () => {
    it('returns true when fine pointer matches', () => {
      mockMatchMedia(true);
      expect(DeviceAccess.isHoverCapable()).toBe(true);
    });

    it('returns false when nothing matches', () => {
      mockMatchMedia(false);
      expect(DeviceAccess.isHoverCapable()).toBe(false);
    });

    it('returns true when only canAnyInputHover matches', () => {
      vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
        matches: query.includes('hover'),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as MediaQueryList));
      expect(DeviceAccess.isHoverCapable()).toBe(true);
    });
  });

  describe('isPortrait', () => {
    it('returns true when portrait query matches', () => {
      mockMatchMedia(true);
      expect(DeviceAccess.isPortrait()).toBe(true);
    });

    it('returns false when not in portrait', () => {
      mockMatchMedia(false);
      expect(DeviceAccess.isPortrait()).toBe(false);
    });
  });

  describe('isLandscape', () => {
    it('returns true when landscape query matches', () => {
      mockMatchMedia(true);
      expect(DeviceAccess.isLandscape()).toBe(true);
    });

    it('returns false when not in landscape', () => {
      mockMatchMedia(false);
      expect(DeviceAccess.isLandscape()).toBe(false);
    });
  });

  describe('getScreenWidth', () => {
    it('returns the current screen width', () => {
      Object.defineProperty(window.screen, 'width', { configurable: true, value: 1280 });
      expect(DeviceAccess.getScreenWidth()).toBe(1280);
      Object.defineProperty(window.screen, 'width', { configurable: true, value: 0 });
    });
  });

  describe('getScreenHeight', () => {
    it('returns the current screen height', () => {
      Object.defineProperty(window.screen, 'height', { configurable: true, value: 800 });
      expect(DeviceAccess.getScreenHeight()).toBe(800);
      Object.defineProperty(window.screen, 'height', { configurable: true, value: 0 });
    });
  });
});
