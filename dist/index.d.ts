/**
 * ArrayAccess provides utility methods for easily accessing and manipulating arrays
 */
export declare class ArrayAccess {
    static first<Type>(array: Type[], amount?: number): Type | Type[] | undefined;
    static last<Type>(array: Type[], amount?: number): Type | Type[] | undefined;
    static flatten<Type>(array: Type[]): Type[];
    static sortByProperty<Type, Key extends keyof Type>(array: Type[], property: Key): Type[];
    static getObjectByValue<Type extends object, Key extends keyof Type>(array: Type[], key: Key, value: Type[Key]): Type | undefined;
    static hasObjectWithValue<Type>(array: Type[], key: keyof Type, value: Type[keyof Type]): boolean;
    static removeItem<Type>(array: Type[], itemToRemove: Type): Type[];
    static getRandomItem<Type>(array: Type[]): Type | undefined;
    static wrapInArray<Type>(value: Type | null | undefined): Type[];
    static toStringSentence(array: string[]): string;
    static toCommaSeparatedString(array: string[]): string;
    static getArrayFromNewlines(string: string): string[];
    static getArrayFromCommas(string: string): string[];
}

declare type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'fhd' | 'qhd' | 'uhd';

declare interface CallbackOptions<Scope = unknown> {
    scope?: Scope;
    once?: boolean;
}

/**
 * Color provides utility methods for working with colors in different formats.
 * It supports conversion between hex, RGB, RGBA, HSL, and HSLA formats, as well as extracting
 * colors from CSS variables and calculating text colors based on background colors.
 */
export declare class Color {
    static getRandomColor(): string;
    static getComputedStyleColor(variableName: CssVariableName): ColorDefinition;
    static detectColorFormat(color: ColorDefinition): ColorFormat;
    static calculateRgbChannel(min: number, max: number, hueShifted: number): number;
    static getTextColorFromBackgroundColor(backgroundColor: ColorDefinition): HexCode;
    static hexToRgb(hexCode: HexCode, returnType?: ColorReturnType): RgbObject | RgbString | RgbaString | null;
    static parseRgbStringToObject(rgbString: RgbString | RgbaString): RgbObject | null;
    static hslToRgb(hslString: HslString | HslaString, returnType?: ColorReturnType): RgbObject | RgbString | RgbaString | null;
    static rgbToHex(rgb: RgbObject): HexCode;
    static hslToHex(hsl: HslString | HslaString): HexCode | null;
    static rgbToHsl(rgbString: RgbString | RgbaString, returnType?: ColorReturnType): HslObject | HslString | HslaString | null;
    static hexToHsl(hexCode: HexCode, returnType?: ColorReturnType): HslObject | HslString | HslaString | null;
}

declare type ColorDefinition = HexCode | RgbString | RgbaString | HslString | HslaString;

declare type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'unknown';

declare type ColorReturnType = 'string' | 'object';

declare type CssVariableName = `--${string}`;

export declare class DeviceAccess {
    static isTouch(): boolean;
    static isHoverCapable(): boolean;
    static hasAnyFinePointer(): boolean;
    static hasAnyCoarsePointer(): boolean;
    static canAnyInputHover(): boolean;
    static isPortrait(): boolean;
    static isLandscape(): boolean;
    static getScreenWidth(): number;
    static getScreenHeight(): number;
}

/**
 * Dom provides utility methods for working with the DOM.
 */
export declare class Dom {
    static isNode<Element extends HTMLElement | Document>(element: Element | null): boolean;
    static get<Parent extends HTMLElement | Document, Element extends HTMLElement>(parent: Parent, selector: string, strict?: boolean): Element | null;
    static getSingleElements<Parent extends HTMLElement | Document, Element extends HTMLElement>(parent: Parent, selectors: {
        [key: string]: string;
    }, strict?: boolean): {
        [key: string]: Element | null;
    };
    static getAll<Parent extends HTMLElement | Document, Element extends HTMLElement>(parent: Parent, selector: string, strict?: boolean): Element[];
    static addClass<Element extends HTMLElement>(element: Element, classes: string | string[]): void;
    static removeClass<Element extends HTMLElement>(element: Element, classes: string | string[]): void;
    static hasClass<Element extends HTMLElement>(element: Element, className: string): boolean;
    static toggleClass<Element extends HTMLElement>(element: Element, classes: string | string[]): void;
    static listenTo<Element extends HTMLElement | Document | Window, EventName extends keyof HTMLElementEventMap>(target: Element, event: EventName, callback: (eventDetails: HTMLElementEventMap[EventName]) => void): void;
    static setStyle<Element extends HTMLElement, StyleProperty extends keyof CSSStyleDeclaration>(element: Element, property: StyleProperty, value: CSSStyleDeclaration[StyleProperty]): void;
    static removeStyle<Element extends HTMLElement, StyleProperty extends keyof CSSStyleDeclaration>(element: Element, property: StyleProperty): void;
    static createElement<Parent extends HTMLElement, Element extends HTMLElement>(type: keyof HTMLElementTagNameMap, options?: ElementCreateOptions, appendTo?: Parent | null): Element;
    static hideElement<Element extends HTMLElement>(element: Element, hiddenClass?: string): void;
    static showElement<Element extends HTMLElement>(element: Element, showClass?: string, displayStyle?: CSSStyleDeclaration['display']): void;
    static findParent<Child extends HTMLElement, Parent extends HTMLElement>(childElement: Child, searchedSelector: string, iterationLimit?: number, currentIterationCount?: number): Parent | null;
    static getParent<Child extends HTMLElement, Parent extends HTMLElement>(childElement: Child, iterationLimit?: number, currentIterationCount?: number): Parent | null;
    static isInViewport<Element extends HTMLElement>(element: Element): boolean;
    static scrollToElement<Element extends HTMLElement>(element: Element, offset: number, callback?: (() => void) | null): void;
    static extractTextFromNodes(nodes: any[]): string;
    static getRect<Element extends HTMLElement>(element: Element): DOMRect;
    static getRects<Element extends HTMLElement>(...elements: Element[]): DOMRect[];
    static rectsOverlap(rectA: DOMRect, rectB: DOMRect, offsetA?: number, offsetB?: number): boolean;
    static isOverlapping(elementA: HTMLElement, elementB: HTMLElement): boolean;
    static isPointerInside<Element extends HTMLElement>(element: Element): boolean;
}

declare interface ElementCreateOptions {
    id?: string;
    classes?: string | string[];
    text?: string;
    html?: string;
    dataset?: object;
    [key: string]: any;
}

/**
 * Formatting provides utility methods for formatting various data types,
 * such as dates, bytes, strings, and more.
 */
export declare class Formatting {
    static formatDate(value: string | Date, options?: Intl.DateTimeFormatOptions): string;
    static formatBytes(bytes: number): string;
    static decodeString(string: string): string;
    static truncateString(string: string, maxCharacters: number, useWordBoundary?: boolean): string;
    static camelToDashCase(string: string): string;
    static spaceToDashCase(string: string): string;
    /**
     * Convert a given string to a string with a unit.
     *
     * If the given string is empty or not a number, it will return null.
     * If the given string is a number, it will return a string with the given
     * unit (default is 'px').
     */
    static convertToUnit(string: string | number, unit?: string): string | null;
    static removeWhitespace(str: string): string;
}

declare type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

declare type HexCode = `#${string}`;

declare type HslaString = `hsla(${number}, ${number}, ${number}, ${number})`;

declare interface HslObject {
    hue: number;
    saturation: number;
    lightness: number;
    alpha?: number;
}

declare type HslString = `hsl(${number}, ${number}, ${number})`;

declare interface JsonObject {
    [key: string]: any;
}

declare interface Listener {
    callback: (event: Event) => void;
    options: CallbackOptions;
    splitEventName: string[];
}

/**
 * Event Emitter which works with the provided DOM element.
 *
 * @example
 * const emitter = new NativeEventEmitter();
 * emitter.publish('my-event-name');
 *
 * @example using custom data
 * const emitter = new NativeEventEmitter();
 * emitter.publish('my-event-name', { custom: 'data' });
 * emitter.subscribe('my-event-name', (event) => {
 *     console.log(event.detail.custom);
 * });
 *
 * @example using a custom scope
 * const emitter = new NativeEventEmitter();
 * emitter.publish('my-event-name', { custom: 'data' });
 * emitter.subscribe('my-event-name', (event) => {
 *     console.log(event.detail.custom);
 * }, { scope: myScope });
 *
 * @example once listeners
 * const emitter = new NativeEventEmitter();
 * emitter.publish('my-event-name', { custom: 'data' });
 * emitter.subscribe('my-event-name', (event) => {
 *     console.log(event.detail);
 * }, { once: true });
 *
 */
export declare class NativeEventEmitter<Element extends HTMLElement> {
    _element: Element | Document;
    _listeners: Listener[];
    constructor(element?: Element | Document);
    get element(): Element | Document;
    set element(value: Element | Document);
    get listeners(): Listener[];
    set listeners(value: Listener[]);
    publish<EventType extends Record<string, any>>(eventName: string, detail?: EventType, cancelable?: boolean): CustomEvent<EventType>;
    subscribe<DetailType = unknown>(eventName: string, callback: (event: CustomEvent<DetailType>) => void, options?: CallbackOptions): void;
    unsubscribe(eventName: string): void;
    reset(): void;
}

/**
 * ObjectAccess provides utility methods for easily accessing and manipulating objects.
 */
export declare class ObjectAccess {
    static length(object: JsonObject): number;
    static has(object: JsonObject, key: (keyof JsonObject)[]): boolean;
    static first<Key extends string | number | symbol>(object: JsonObject, amount?: number): JsonObject | JsonObject[] | undefined;
    static last<Key extends string | number | symbol>(object: JsonObject, amount?: number): JsonObject | JsonObject[] | undefined;
    static addProperty<Key extends string | number | symbol, Value>(object: {
        [key: string | number | symbol]: any;
    }, keyToAdd: Key, valueToAdd: Value): {
        [key: string | number | symbol]: any;
    };
    static removeProperty<Key extends string | number | symbol>(object: JsonObject, keyToRemove: Key): JsonObject;
    static getRandomProperty<Key extends string | number | symbol>(object: JsonObject): JsonObject | undefined;
    static deepClone(object: JsonObject): JsonObject | undefined;
}

declare interface RandomTextOptions {
    minUppercase?: number;
    minLowercase?: number;
    minNumbers?: number;
}

declare type RgbaString = `rgba(${number}, ${number}, ${number}, ${number})`;

declare interface RgbObject {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}

declare type RgbString = `rgb(${number}, ${number}, ${number})`;

/**
 * Utilities provides a collection of general utility functions.
 */
export declare class Utilities {
    /**
     * Block scope for a given amount of time in ms and run next set piece of
     * code only after given time has passed
     *
     * @NOTE: Must be called with await!
     */
    static delay(milliseconds: number): Promise<void>;
    /**
     * Debounce a function call to prevent it from being called too frequently.
     * The function will only be called after the specified delay has passed
     * since the last call.
     */
    static debounce<Type extends (...args: any[]) => void>(callback: Type, delay: number): (...args: Parameters<Type>) => void;
    static isEmpty<Type>(value: Type): boolean;
    static iterate<Key extends string | number, Item>(source: Map<Key, Item> | Array<Item> | FormData | object | string, callback: (value: Item, key?: Key) => void): void;
    static getFormDataFromJson(jsonObject: JsonObject, parentKey?: string): FormData;
    static getRandomNumber(minimumValue: number, maximumValue: number): number;
    static numberIsEven(number: number): boolean;
    static numberIsOdd(number: number): boolean;
    static calculatePxFromRem(rem: number | string): number;
    static clamp(value: number, min: number, max: number): number;
    static createClamper(min: number, max: number): (value: number) => number;
    static isValidEmail(email: string): boolean;
    static getNextSmallerHeadingType(headingType: string): HeadingType;
    static generateRandomText(length: number, options?: RandomTextOptions): string;
}

/**
 * ViewportAccess provides a collection of function to detect the current viewport
 */
export declare class ViewportAccess {
    static breakpoints: Record<Breakpoint, number>;
    static getMediaQuery(breakpoint: Breakpoint, type?: 'min' | 'max'): MediaQueryList;
    static getMediaQueryBetween(breakpointMin: Breakpoint, breakpointMax: Breakpoint): MediaQueryList;
    static watchMediaQuery(mediaQuery: MediaQueryList, callback: (event: MediaQueryListEvent) => void): void;
    static getCurrentViewport(): number;
    static isXS(): boolean;
    static isSM(): boolean;
    static isMD(): boolean;
    static isLG(): boolean;
    static isXL(): boolean;
    static isXXL(): boolean;
    static is3XL(): boolean;
    static isFHD(): boolean;
    static isQHD(): boolean;
    static isUHD(): boolean;
}

export { }
