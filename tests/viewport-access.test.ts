import { describe, it, expect, vi, afterEach } from 'vitest';
import ViewportAccess from '../src/helper/viewport-access.helper';

function setInnerWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
}

function mockMatchMedia(matches: boolean) {
  const mql = {
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList;
  vi.spyOn(window, 'matchMedia').mockReturnValue(mql);
  return mql;
}

describe('ViewportAccess', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('breakpoints', () => {
    it('has the expected breakpoint values', () => {
      expect(ViewportAccess.breakpoints.sm).toBe(576);
      expect(ViewportAccess.breakpoints.md).toBe(768);
      expect(ViewportAccess.breakpoints.lg).toBe(992);
      expect(ViewportAccess.breakpoints.xl).toBe(1200);
      expect(ViewportAccess.breakpoints.xxl).toBe(1400);
      expect(ViewportAccess.breakpoints['3xl']).toBe(1600);
      expect(ViewportAccess.breakpoints.fhd).toBe(1920);
      expect(ViewportAccess.breakpoints.qhd).toBe(2560);
      expect(ViewportAccess.breakpoints.uhd).toBe(3840);
    });
  });

  describe('getMediaQuery', () => {
    it('calls matchMedia with min-width by default', () => {
      const spy = vi.spyOn(window, 'matchMedia').mockReturnValue({} as MediaQueryList);
      ViewportAccess.getMediaQuery('md');
      expect(spy).toHaveBeenCalledWith('(min-width: 768px)');
    });

    it('calls matchMedia with max-width when specified', () => {
      const spy = vi.spyOn(window, 'matchMedia').mockReturnValue({} as MediaQueryList);
      ViewportAccess.getMediaQuery('lg', 'max');
      expect(spy).toHaveBeenCalledWith('(max-width: 992px)');
    });
  });

  describe('getMediaQueryBetween', () => {
    it('calls matchMedia with min and max width', () => {
      const spy = vi.spyOn(window, 'matchMedia').mockReturnValue({} as MediaQueryList);
      ViewportAccess.getMediaQueryBetween('sm', 'md');
      expect(spy).toHaveBeenCalledWith('(min-width: 576px) and (max-width: 768px)');
    });
  });

  describe('watchMediaQuery', () => {
    it('adds a change event listener and fires the callback on change', () => {
      const mql = mockMatchMedia(true);
      const cb = vi.fn();
      ViewportAccess.watchMediaQuery(mql, cb);
      expect(mql.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
      // Simulate the change event by invoking the registered handler
      const handler = (mql.addEventListener as ReturnType<typeof vi.fn>).mock.calls[0][1] as (e: MediaQueryListEvent) => void;
      const event = new Event('change') as MediaQueryListEvent;
      handler(event);
      expect(cb).toHaveBeenCalledWith(event);
    });
  });

  describe('isXS', () => {
    it('returns true when innerWidth is below sm', () => {
      setInnerWidth(400);
      expect(ViewportAccess.isXS()).toBe(true);
    });

    it('returns false when innerWidth is at sm', () => {
      setInnerWidth(576);
      expect(ViewportAccess.isXS()).toBe(false);
    });
  });

  describe('isSM', () => {
    it('returns true when innerWidth is in SM range', () => {
      setInnerWidth(600);
      expect(ViewportAccess.isSM()).toBe(true);
    });

    it('returns false below SM', () => {
      setInnerWidth(400);
      expect(ViewportAccess.isSM()).toBe(false);
    });
  });

  describe('isMD', () => {
    it('returns true in MD range', () => {
      setInnerWidth(800);
      expect(ViewportAccess.isMD()).toBe(true);
    });
  });

  describe('isLG', () => {
    it('returns true in LG range', () => {
      setInnerWidth(1000);
      expect(ViewportAccess.isLG()).toBe(true);
    });
  });

  describe('isXL', () => {
    it('returns true in XL range', () => {
      setInnerWidth(1300);
      expect(ViewportAccess.isXL()).toBe(true);
    });
  });

  describe('isXXL', () => {
    it('returns true in XXL range', () => {
      setInnerWidth(1500);
      expect(ViewportAccess.isXXL()).toBe(true);
    });
  });

  describe('is3XL', () => {
    it('returns true in 3XL range', () => {
      setInnerWidth(1700);
      expect(ViewportAccess.is3XL()).toBe(true);
    });
  });

  describe('isFHD', () => {
    it('returns true in FHD range', () => {
      setInnerWidth(2000);
      expect(ViewportAccess.isFHD()).toBe(true);
    });
  });

  describe('isQHD', () => {
    it('returns true in QHD range', () => {
      setInnerWidth(3000);
      expect(ViewportAccess.isQHD()).toBe(true);
    });
  });

  describe('isUHD', () => {
    it('returns true when innerWidth >= 3840', () => {
      setInnerWidth(4000);
      expect(ViewportAccess.isUHD()).toBe(true);
    });
  });

  describe('getCurrentViewport', () => {
    it('returns 0 for XS viewport', () => {
      setInnerWidth(400);
      expect(ViewportAccess.getCurrentViewport()).toBe(0);
    });

    it('returns sm breakpoint for SM viewport', () => {
      setInnerWidth(600);
      expect(ViewportAccess.getCurrentViewport()).toBe(576);
    });

    it('returns md breakpoint for MD viewport', () => {
      setInnerWidth(900);
      expect(ViewportAccess.getCurrentViewport()).toBe(768);
    });

    it('returns lg breakpoint for LG viewport', () => {
      setInnerWidth(1100);
      expect(ViewportAccess.getCurrentViewport()).toBe(992);
    });

    it('returns xl breakpoint for XL viewport', () => {
      setInnerWidth(1300);
      expect(ViewportAccess.getCurrentViewport()).toBe(1200);
    });

    it('returns xxl breakpoint for XXL viewport', () => {
      setInnerWidth(1500);
      expect(ViewportAccess.getCurrentViewport()).toBe(1400);
    });

    it('returns 3xl breakpoint for 3XL viewport', () => {
      setInnerWidth(1700);
      expect(ViewportAccess.getCurrentViewport()).toBe(1600);
    });

    it('returns fhd breakpoint for FHD viewport', () => {
      setInnerWidth(2000);
      expect(ViewportAccess.getCurrentViewport()).toBe(1920);
    });

    it('returns qhd breakpoint for QHD viewport', () => {
      setInnerWidth(3000);
      expect(ViewportAccess.getCurrentViewport()).toBe(2560);
    });

    it('returns uhd breakpoint for UHD viewport', () => {
      setInnerWidth(4000);
      expect(ViewportAccess.getCurrentViewport()).toBe(3840);
    });
  });

  describe('isAbove', () => {
    it('returns true when innerWidth >= breakpoint', () => {
      setInnerWidth(1000);
      expect(ViewportAccess.isAbove('lg')).toBe(true);
    });

    it('returns false when innerWidth < breakpoint', () => {
      setInnerWidth(800);
      expect(ViewportAccess.isAbove('lg')).toBe(false);
    });
  });

  describe('isBelow', () => {
    it('returns true when innerWidth < breakpoint', () => {
      setInnerWidth(800);
      expect(ViewportAccess.isBelow('lg')).toBe(true);
    });

    it('returns false when innerWidth >= breakpoint', () => {
      setInnerWidth(1000);
      expect(ViewportAccess.isBelow('lg')).toBe(false);
    });
  });
});
