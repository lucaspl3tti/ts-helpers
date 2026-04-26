/**
 * ArrayAccess provides utility methods for easily accessing and manipulating arrays
 */
export declare class ArrayAccess {
    static first<Type>(array: Type[], amount: 1): Type | undefined;
    static first<Type>(array: Type[], amount: number): Type[];
    static first<Type>(array: Type[]): Type | undefined;
    static last<Type>(array: Type[], amount: 1): Type | undefined;
    static last<Type>(array: Type[], amount: number): Type[];
    static last<Type>(array: Type[]): Type | undefined;
    static flatten<Type>(array: Type[], depth?: number): Type[];
    static sortByProperty<Type, Key extends ComparableKeys<Type>>(array: Type[], property: Key, direction?: 'asc' | 'desc'): Type[];
    static getObjectByValue<Type extends Record<string, unknown>, Key extends keyof Type>(array: Type[], key: Key, value: Type[Key]): Type | undefined;
    static hasObjectWithValue<Type, Key extends keyof Type>(array: Type[], key: Key, value: Type[Key]): boolean;
    static removeItem<Type>(array: Type[], itemOrPredicate: Type | ((item: Type) => boolean)): Type[];
    static getRandomItem<Type>(array: Type[]): Type | undefined;
    static wrapInArray<Type>(value: Type | null | undefined): Type[];
    static toStringSentence(array: string[]): string;
    static toCommaSeparatedString(array: string[]): string;
    static getArrayFromNewlines(string: string): string[];
    static getArrayFromCommas(string: string): string[];
    static chunk<Type>(array: Type[], size: number): Type[][];
    static unique<Type>(array: Type[]): Type[];
    static uniqueBy<Type, Key extends keyof Type>(array: Type[], key: Key): Type[];
    static groupBy<Type, Key extends keyof Type>(array: Type[], key: Key): Record<string, Type[]>;
    static zip<A, B>(itemA: A[], itemB: B[]): [A, B][];
    static intersection<Type>(itemA: Type[], itemB: Type[]): Type[];
    static difference<Type>(itemA: Type[], itemB: Type[]): Type[];
    static union<Type>(itemA: Type[], itemB: Type[]): Type[];
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
    static getRandomColor(): HexCode;
    static getComputedStyleColor(variableName: CssVariableName): ColorDefinition;
    static detectColorFormat(color: ColorDefinition): ColorFormat;
    private static calculateRgbChannel;
    static getTextColorFromBackgroundColor(backgroundColor: ColorDefinition): HexCode;
    static hexToRgb(hexCode: HexCode, returnType?: 'object'): RgbObject | null;
    static hexToRgb(hexCode: HexCode, returnType: 'string'): RgbString | RgbaString | null;
    static parseRgbStringToObject(rgbString: RgbString | RgbaString): RgbObject | null;
    static hslToRgb(hslString: HslString | HslaString, returnType?: 'object'): RgbObject | null;
    static hslToRgb(hslString: HslString | HslaString, returnType: 'string'): RgbString | RgbaString | null;
    static rgbToHex(rgb: RgbObject): HexCode;
    static hslToHex(hsl: HslString | HslaString): HexCode | null;
    static rgbToHsl(rgbString: RgbString | RgbaString, returnType?: 'object'): HslObject | null;
    static rgbToHsl(rgbString: RgbString | RgbaString, returnType: 'string'): HslString | HslaString | null;
    static hexToHsl(hexCode: HexCode, returnType?: 'object'): HslObject | null;
    static hexToHsl(hexCode: HexCode, returnType: 'string'): HslString | HslaString | null;
}

declare type ColorDefinition = HexCode | RgbString | RgbaString | HslString | HslaString;

declare type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'unknown';

declare type ComparableKeys<Type> = {
    [Key in keyof Type]: Type[Key] extends string | number | boolean | Date ? Key : never;
}[keyof Type];

/**
 * Cookie provides a type-safe API for reading and writing browser cookies.
 */
export declare class Cookie {
    static set(name: string, value: string, options?: CookieOptions): void;
    static get(name: string): string | null;
    static delete(name: string, path?: string): void;
    static getAll(): Record<string, string>;
    static has(name: string): boolean;
}

declare interface CookieOptions {
    /** Expiry: number of days from now, or an exact `Date`. */
    expires?: number | Date;
    /** Cookie path. Defaults to `'/'`. */
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}

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
    static setStyle<Element extends HTMLElement, StyleProperty extends string & keyof CSSStyleDeclaration>(element: Element, property: StyleProperty, value: CSSStyleDeclaration[StyleProperty]): void;
    static removeStyle<Element extends HTMLElement, StyleProperty extends string & keyof CSSStyleDeclaration>(element: Element, property: StyleProperty): void;
    static createElement<TagName extends keyof HTMLElementTagNameMap, Parent extends HTMLElement>(type: TagName, options?: ElementCreateOptions, appendTo?: Parent | null): HTMLElementTagNameMap[TagName];
    static hideElement<Element extends HTMLElement>(element: Element, hiddenClass?: string): void;
    static showElement<Element extends HTMLElement>(element: Element, showClass?: string, displayStyle?: CSSStyleDeclaration['display']): void;
    static findParent<Child extends HTMLElement, Parent extends HTMLElement>(childElement: Child, searchedSelector: string, iterationLimit?: number, currentIterationCount?: number): Parent | null;
    static getParent<Child extends HTMLElement, Parent extends HTMLElement>(childElement: Child, iterationLimit?: number, currentIterationCount?: number): Parent | null;
    static isInViewport<Element extends HTMLElement>(element: Element): boolean;
    static scrollToElement<Element extends HTMLElement>(element: Element, offset: number, callback?: (() => void) | null): void;
    static extractTextFromNodes(nodes: VirtualNode[]): string;
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
    dataset?: Record<string, string>;
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
    static dashToCamelCase(string: string): string;
    static capitalize(string: string): string;
    static titleCase(string: string): string;
    static formatNumber(number: number, locale?: string, options?: Intl.NumberFormatOptions): string;
    static spaceToDashCase(string: string): string;
    static convertToUnit(string: string | number, unit?: string): string | null;
    static removeWhitespace(string: string): string;
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

declare interface Listener {
    callback: (event: Event) => void;
    options: CallbackOptions;
    splitEventName: string[];
}

declare type MediaQueryType = 'min' | 'max';

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
    private _element;
    private _listeners;
    constructor(element?: Element | Document);
    get element(): Element | Document;
    set element(value: Element | Document);
    get listeners(): Listener[];
    set listeners(value: Listener[]);
    publish<EventType extends Record<string, unknown>>(eventName: string, detail?: EventType, cancelable?: boolean): CustomEvent<EventType>;
    subscribe<DetailType = unknown>(eventName: string, callback: (event: CustomEvent<DetailType>) => void, options?: CallbackOptions): void;
    unsubscribe(eventName: string): void;
    reset(): void;
}

/**
 * ObjectAccess provides utility methods for easily accessing and manipulating objects.
 */
export declare class ObjectAccess {
    static length(object: object): number;
    static has<Type extends object>(object: Type, key: (keyof Type)[]): boolean;
    static first<Type extends Record<string, unknown>>(object: Type, amount: 1): [string, unknown] | undefined;
    static first<Type extends Record<string, unknown>>(object: Type, amount: number): [string, unknown][];
    static first<Type extends Record<string, unknown>>(object: Type): [string, unknown] | undefined;
    static last<Type extends Record<string, unknown>>(object: Type, amount: 1): [string, unknown] | undefined;
    static last<Type extends Record<string, unknown>>(object: Type, amount: number): [string, unknown][];
    static last<Type extends Record<string, unknown>>(object: Type): [string, unknown] | undefined;
    static addProperty<Obj extends object, Key extends string | number | symbol, Value>(object: Obj, keyToAdd: Key, valueToAdd: Value): Obj & Record<Key, Value>;
    /**
     * @deprecated: Will be removed in a future release. Use `ObjectAccess.omit`
     */
    static removeProperty<Type extends object, Key extends keyof Type>(object: Type, keyToRemove: Key): Omit<Type, Key>;
    static getRandomProperty<Type extends Record<string, unknown>>(object: Type): [string, unknown] | undefined;
    static deepClone<Type>(object: Type): Type;
    static pick<Type extends object, Key extends keyof Type>(object: Type, keys: Key[]): Pick<Type, Key>;
    static omit<Type extends object, Key extends keyof Type>(object: Type, keys: Key[]): Omit<Type, Key>;
    static deepMerge<Type extends object>(target: Type, source: Partial<Type>): Type;
    static mapValues<Type extends object, Value>(object: Type, callback: (value: Type[keyof Type], key: keyof Type) => Value): Record<keyof Type, Value>;
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
 * Storage provides a type-safe wrapper around `localStorage` and
 * `sessionStorage` with optional time-to-live (TTL) support.
 */
declare class Storage_2 {
    private static getStore;
    static set<Value>(key: string, value: Value, options?: StorageOptions): void;
    static get<Value>(key: string, storage?: StorageType): Value | null;
    static remove(key: string, storage?: StorageType): void;
    static clear(storage?: StorageType): void;
    static has(key: string, storage?: StorageType): boolean;
}
export { Storage_2 as Storage }

declare interface StorageOptions {
    /** Time-to-live in seconds. After expiry `get()` returns `null`. */
    ttl?: number;
    /** Which storage to use. Defaults to `'local'`. */
    storage?: StorageType;
}

declare type StorageType = 'local' | 'session';

/**
 * StringHelper provides advanced string manipulation utilities that go
 * beyond the basic formatting methods in the `Formatting` class.
 */
export declare class StringHelper {
    static slugify(string: string): string;
    static truncateMiddle(string: string, maxLen: number): string;
    static countOccurrences(string: string, search: string): number;
    static stripHtml(string: string): string;
    static template(string: string, vars: Record<string, string>): string;
    static capitalize(string: string): string;
    static titleCase(string: string): string;
}

/**
 * Utilities provides a collection of general utility functions.
 */
export declare class Utilities {
    static delay(milliseconds: number): Promise<void>;
    static debounce<Type extends (...args: unknown[]) => void>(callback: Type, delay: number): (...args: Parameters<Type>) => void;
    static isEmpty<Type>(value: Type): boolean;
    static iterate<Key extends string | number, Item>(source: Map<Key, Item> | Array<Item> | FormData | object | string, callback: (value: Item, key?: Key) => void): void;
    static getFormDataFromJson(jsonObject: Record<string, unknown>, parentKey?: string): FormData;
    static throttle<Type extends (...args: unknown[]) => void>(callback: Type, milliseconds: number): Type;
    static memoize<Type extends (...args: unknown[]) => unknown>(callback: Type): Type;
    static pipe<Type>(...callbacks: Array<(arg: Type) => Type>): (arg: Type) => Type;
    static compose<Type>(...callbacks: Array<(arg: Type) => Type>): (arg: Type) => Type;
    static getRandomNumber(minimumValue: number, maximumValue: number): number;
    /**
     * @deprecated: Will be removed in a future release. Use Validation.isEven instead
     */
    static numberIsEven(number: number): boolean;
    /**
     * @deprecated: Will be removed in a future release. Use Validation.isOdd instead
     */
    static numberIsOdd(number: number): boolean;
    static calculatePxFromRem(rem: number | string): number;
    static clamp(value: number, min: number, max: number): number;
    static createClamper(min: number, max: number): (value: number) => number;
    static getNextSmallerHeadingType(headingType: string): HeadingType;
    static generateRandomText(length: number, options?: RandomTextOptions): string;
    /**
     * @deprecated: Will be removed in a future release. Use Validation.isValidEmail instead
     */
    static isValidEmail(email: string): boolean;
}

/**
 * Validation provides common validation helpers beyond `Utilities.isValidEmail`.
 */
export declare class Validation {
    static isValidEmail(email: string): boolean;
    static isUrl(string: string): boolean;
    static isPhoneNumber(string: string): boolean;
    static isNumeric(string: string): boolean;
    static isBetween(number: number, min: number, max: number): boolean;
    static isEven(number: number): boolean;
    static isOdd(number: number): boolean;
    static isIban(string: string): boolean;
}

/**
 * ViewportAccess provides a collection of function to detect the current viewport
 */
export declare class ViewportAccess {
    static breakpoints: Record<Breakpoint, number>;
    static getMediaQuery(breakpoint: Breakpoint, type?: MediaQueryType): MediaQueryList;
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
    static isAbove(breakpoint: Breakpoint): boolean;
    static isBelow(breakpoint: Breakpoint): boolean;
}

declare interface VirtualNode {
    children?: string | VirtualNode[];
}

export { }
