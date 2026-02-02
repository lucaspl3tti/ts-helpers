import type { Breakpoint } from '../interfaces/general.interface';

/**
 * ViewportAccess provides a collection of function to detect the current viewport
 */
export default class ViewportAccess {
  // Predefined viewport widths -> based on Bootstrap 5 breakpoints + custom ones
  static breakpoints: Record<Breakpoint, number> = {
    'sm': 576,
    'md': 768,
    'lg': 992,
    'xl': 1200,
    'xxl': 1400,
    '3xl': 1600,
    'fhd': 1920,
    'qhd': 2560,
    'uhd': 3840,
  };

  static getMediaQuery(breakpoint: Breakpoint, type: 'min'|'max' = 'min'): MediaQueryList {
    const breakpointWidth = this.breakpoints[breakpoint];
    return window.matchMedia(`(${type}-width: ${breakpointWidth}px)`);
  }

  static getMediaQueryBetween(
    breakpointMin: Breakpoint,
    breakpointMax: Breakpoint,
  ): MediaQueryList {
    const breakpointMinWidth = this.breakpoints[breakpointMin];
    const breakpointMaxWidth = this.breakpoints[breakpointMax];

    // eslint-disable-next-line max-len
    return window.matchMedia(`(min-width: ${breakpointMinWidth}px) and (max-width: ${breakpointMaxWidth}px)`);
  }

  static watchMediaQuery(
    mediaQuery: MediaQueryList,
    callback: (event: MediaQueryListEvent) => void,
  ): void {
    mediaQuery.addEventListener('change', (event) => callback(event));
  }

  static getCurrentViewport(): number {
    if (this.isUHD()) {
      return this.breakpoints.uhd;
    }

    if (this.isQHD()) {
      return this.breakpoints.qhd;
    }

    if (this.isFHD()) {
      return this.breakpoints.fhd;
    }

    if (this.is3XL()) {
      return this.breakpoints['3xl'];
    }

    if (this.isXXL()) {
      return this.breakpoints.xxl;
    }

    if (this.isXL()) {
      return this.breakpoints.xl;
    }

    if (this.isLG()) {
      return this.breakpoints.lg;
    }

    if (this.isMD()) {
      return this.breakpoints.md;
    }

    if (this.isSM()) {
      return this.breakpoints.sm;
    }

    return 0;
  }

  static isXS(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth < this.breakpoints.sm;
  }

  static isSM(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth >= this.breakpoints.sm && viewportWidth < this.breakpoints.md;
  }

  static isMD(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth >= this.breakpoints.md && viewportWidth < this.breakpoints.lg;
  }

  static isLG(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth >= this.breakpoints.lg && viewportWidth < this.breakpoints.xl;
  }

  static isXL(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth >= this.breakpoints.xl && viewportWidth < this.breakpoints.xxl;
  }

  static isXXL(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth >= this.breakpoints.xxl && viewportWidth < this.breakpoints['3xl'];
  }

  static is3XL(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth >= this.breakpoints['3xl'] && viewportWidth < this.breakpoints.fhd;
  }

  static isFHD(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth >= this.breakpoints.fhd && viewportWidth < this.breakpoints.qhd;
  }

  static isQHD(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth >= this.breakpoints.qhd && viewportWidth < this.breakpoints.uhd;
  }

  static isUHD(): boolean {
    const viewportWidth = window.innerWidth;
    return viewportWidth >= this.breakpoints.uhd;
  }
}
