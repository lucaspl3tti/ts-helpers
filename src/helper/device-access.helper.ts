// DeviceAccess provides a collection of function to detect funtionalities of current device
export default class DeviceAccess {
  static isTouch(): boolean {
    return ((navigator.maxTouchPoints || 0) > 0) || this.hasAnyCoarsePointer();
  }

  static isHoverCapable(): boolean {
    return this.hasAnyFinePointer() || this.canAnyInputHover();
  }

  static hasAnyFinePointer(): boolean {
    return window.matchMedia('(any-pointer: fine)').matches;
  }

  static hasAnyCoarsePointer(): boolean {
    return window.matchMedia('(any-pointer: coarse)').matches;
  }

  static canAnyInputHover(): boolean {
    return window.matchMedia('(any-hover: hover)').matches;
  }

  static isPortrait(): boolean {
    return window.matchMedia('(orientation: portrait)').matches;
  }

  static isLandscape(): boolean {
    return window.matchMedia('(orientation: landscape)').matches;
  }

  static getScreenWidth(): number {
    return window.screen.width;
  }

  static getScreenHeight(): number {
    return window.screen.height;
  }
}
