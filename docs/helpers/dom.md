# Dom

A comprehensive suite of DOM utilities for querying, class/style management, element creation, traversal, and geometry.

**Source:** `src/helper/dom.helper.ts`

---

## Import

```typescript
import { Dom } from '@lucaspl3tti/ts-helpers';
```

---

## Methods Overview

### Querying

| Method | Returns | Description |
| --- | --- | --- |
| [`isNode`](#isnode) | `boolean` | Check if a value is a valid DOM node |
| [`get`](#get) | `Element \| null` | Query a single element by selector |
| [`getSingleElements`](#getsingleelements) | `{ [key]: Element \| null }` | Query multiple named elements |
| [`getAll`](#getall) | `Element[]` | Query all matching elements |

### Class management

| Method | Returns | Description |
| --- | --- | --- |
| [`addClass`](#addclass) | `void` | Add one or more CSS classes |
| [`removeClass`](#removeclass) | `void` | Remove one or more CSS classes |
| [`hasClass`](#hasclass) | `boolean` | Check if an element has a class |
| [`toggleClass`](#toggleclass) | `void` | Toggle one or more CSS classes |

### Style management

| Method | Returns | Description |
| --- | --- | --- |
| [`setStyle`](#setstyle) | `void` | Set an inline style property |
| [`removeStyle`](#removestyle) | `void` | Clear an inline style property |

### Element creation & visibility

| Method | Returns | Description |
| --- | --- | --- |
| [`createElement`](#createelement) | `Element` | Create a DOM element with options |
| [`hideElement`](#hideelement) | `void` | Hide an element |
| [`showElement`](#showelement) | `void` | Show an element |
| [`extractTextFromNodes`](#extracttextfromnodes) | `string` | Recursively extract text from node trees |

### Events

| Method | Returns | Description |
| --- | --- | --- |
| [`listenTo`](#listento) | `() => void` | Add a typed event listener, returns cleanup |

### Traversal

| Method | Returns | Description |
| --- | --- | --- |
| [`findParent`](#findparent) | `Parent \| null` | Find a parent matching a class/id selector |
| [`getParent`](#getparent) | `Parent \| null` | Get a parent N levels up |

### Viewport & scrolling

| Method | Returns | Description |
| --- | --- | --- |
| [`isInViewport`](#isinviewport) | `boolean` | Check if an element is fully visible |
| [`scrollToElement`](#scrolltoelement) | `void` | Smooth-scroll to an element |

### Geometry

| Method | Returns | Description |
| --- | --- | --- |
| [`getRect`](#getrect) | `DOMRect` | Get the bounding rect of an element |
| [`getRects`](#getrects) | `DOMRect[]` | Get bounding rects of multiple elements |
| [`rectsOverlap`](#rectsoverlap) | `boolean` | Check if two rects overlap |
| [`isOverlapping`](#isoverlapping) | `boolean` | Check if two elements overlap |
| [`isPointerInside`](#ispointerinside) | `boolean` | Check if the mouse pointer is over an element |

---

## Methods

### `isNode`

Returns `true` if the value is a valid DOM `Node` instance.

```typescript
static isNode<Element extends HTMLElement | Document>(
  element: Element | null,
): boolean
```

**Example**

```typescript
Dom.isNode(document.body); // true
Dom.isNode(null);          // false
```

---

### `get`

Queries a single element from a parent using a CSS selector. Throws if the parent is not a node or the element is not found (when `strict` is `true`).

```typescript
static get<Parent extends HTMLElement | Document, Element extends HTMLElement>(
  parent: Parent,
  selector: string,
  strict?: boolean,
): Element | null
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `parent` | `Parent` | — | Root element to search within |
| `selector` | `string` | — | CSS selector |
| `strict` | `boolean` | `true` | Throw errors on missing parent or element |

**Example**

```typescript
const btn = Dom.get<Document, HTMLButtonElement>(document, '#submit-btn');
const header = Dom.get(document.body, '.header', false); // returns null if missing
```

---

### `getSingleElements`

Queries multiple elements at once from a parent, using a map of name → selector. Returns a corresponding map of name → element.

```typescript
static getSingleElements<Parent extends HTMLElement | Document, Element extends HTMLElement>(
  parent: Parent,
  selectors: { [key: string]: string },
  strict?: boolean,
): { [key: string]: Element | null }
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `parent` | `Parent` | — | Root element |
| `selectors` | `{ [key: string]: string }` | — | Map of name → CSS selector |
| `strict` | `boolean` | `true` | Throw errors on missing elements |

**Example**

```typescript
const { header, footer } = Dom.getSingleElements(document, {
  header: '.site-header',
  footer: '.site-footer',
});
```

---

### `getAll`

Returns all elements matching a selector within a parent as an array. Throws if none are found and `strict` is `true`.

```typescript
static getAll<Parent extends HTMLElement | Document, Element extends HTMLElement>(
  parent: Parent,
  selector: string,
  strict?: boolean,
): Element[]
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `parent` | `Parent` | — | Root element |
| `selector` | `string` | — | CSS selector |
| `strict` | `boolean` | `true` | Throw if no elements found |

**Example**

```typescript
const items = Dom.getAll<Document, HTMLLIElement>(document, 'ul > li');
```

---

### `addClass`

Adds one or more CSS classes to an element.

```typescript
static addClass<Element extends HTMLElement>(
  element: Element,
  classes: string | string[],
): void
```

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | `Element` | Target element |
| `classes` | `string \| string[]` | Class name(s) to add |

**Example**

```typescript
Dom.addClass(el, 'active');
Dom.addClass(el, ['visible', 'highlighted']);
```

---

### `removeClass`

Removes one or more CSS classes from an element.

```typescript
static removeClass<Element extends HTMLElement>(
  element: Element,
  classes: string | string[],
): void
```

**Example**

```typescript
Dom.removeClass(el, 'active');
Dom.removeClass(el, ['visible', 'highlighted']);
```

---

### `hasClass`

Returns `true` if the element has the given CSS class.

```typescript
static hasClass<Element extends HTMLElement>(
  element: Element,
  className: string,
): boolean
```

**Example**

```typescript
Dom.hasClass(el, 'active'); // true or false
```

---

### `toggleClass`

Toggles one or more CSS classes on an element.

```typescript
static toggleClass<Element extends HTMLElement>(
  element: Element,
  classes: string | string[],
): void
```

**Example**

```typescript
Dom.toggleClass(el, 'open');
Dom.toggleClass(el, ['expanded', 'visible']);
```

---

### `listenTo`

Adds a typed event listener to an element, document, or window.

```typescript
static listenTo<
  Element extends HTMLElement | Document | Window,
  EventName extends keyof HTMLElementEventMap,
>(
  target: Element,
  event: EventName,
  callback: (eventDetails: HTMLElementEventMap[EventName]) => void,
): void
```

| Parameter | Type | Description |
| --- | --- | --- |
| `target` | `Element \| Document \| Window` | Event target |
| `event` | `EventName` | Event name (typed against `HTMLElementEventMap`) |
| `callback` | `(event) => void` | Listener function |

**Example**

```typescript
Dom.listenTo(document, 'click', (e) => {
  console.log(e.target);
});
```

---

### `setStyle`

Sets an inline CSS style property on an element. Does nothing if `value` is falsy.

```typescript
static setStyle<
  Element extends HTMLElement,
  StyleProperty extends keyof CSSStyleDeclaration,
>(
  element: Element,
  property: StyleProperty,
  value: CSSStyleDeclaration[StyleProperty],
): void
```

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | `Element` | Target element |
| `property` | `StyleProperty` | CSS property name (camelCase key of `CSSStyleDeclaration`) |
| `value` | `CSSStyleDeclaration[StyleProperty]` | Value to set |

**Example**

```typescript
Dom.setStyle(el, 'display', 'flex');
Dom.setStyle(el, 'backgroundColor', '#ff0000');
```

---

### `removeStyle`

Clears an inline CSS style property by setting it to an empty string.

```typescript
static removeStyle<
  Element extends HTMLElement,
  StyleProperty extends keyof CSSStyleDeclaration,
>(
  element: Element,
  property: StyleProperty,
): void
```

**Example**

```typescript
Dom.removeStyle(el, 'display');
```

---

### `createElement`

Creates a new DOM element with optional configuration and appends it to a parent.

```typescript
static createElement<Parent extends HTMLElement, Element extends HTMLElement>(
  type: keyof HTMLElementTagNameMap,
  options?: ElementCreateOptions,
  appendTo?: Parent | null,
): Element
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `keyof HTMLElementTagNameMap` | — | Tag name (e.g. `'div'`, `'button'`) |
| `options` | `ElementCreateOptions` | `{}` | Element configuration |
| `appendTo` | `Parent \| null` | `null` | Parent to append the new element to |

See [`ElementCreateOptions`](../types.md#elementcreateoptions) for all available options.

**Example**

```typescript
const btn = Dom.createElement<HTMLDivElement, HTMLButtonElement>('button', {
  id: 'my-btn',
  classes: ['btn', 'btn-primary'],
  text: 'Click me',
  dataset: { action: 'submit' },
}, document.body);
```

---

### `hideElement`

Hides an element by setting `display: none` (default) or by adding a CSS class.

```typescript
static hideElement<Element extends HTMLElement>(
  element: Element,
  hiddenClass?: string,
): void
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `element` | `Element` | — | Element to hide |
| `hiddenClass` | `string` | `''` | If provided, adds this class instead of setting inline style |

**Example**

```typescript
Dom.hideElement(el);             // sets display: none
Dom.hideElement(el, 'is-hidden'); // adds 'is-hidden' class
```

---

### `showElement`

Shows an element by setting an inline `display` style or by adding a class.

```typescript
static showElement<Element extends HTMLElement>(
  element: Element,
  showClass?: string,
  displayStyle?: CSSStyleDeclaration['display'],
): void
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `element` | `Element` | — | Element to show |
| `showClass` | `string` | `''` | If provided, adds this class instead of setting inline style |
| `displayStyle` | `string` | `'block'` | Display value to use when not using a class |

**Example**

```typescript
Dom.showElement(el);                          // display: block
Dom.showElement(el, '', 'flex');              // display: flex
Dom.showElement(el, 'is-visible');            // adds 'is-visible' class
```

---

### `extractTextFromNodes`

Recursively extracts text content from a virtual node tree (e.g. JSX/VDOM-style nodes with `children` property).

```typescript
static extractTextFromNodes(nodes: any[]): string
```

| Parameter | Type | Description |
| --- | --- | --- |
| `nodes` | `any[]` | Array of node objects with optional `children` |

**Example**

```typescript
Dom.extractTextFromNodes([
  { children: 'Hello ' },
  { children: [{ children: 'World' }] },
]);
// 'Hello World'
```

---

### `findParent`

Traverses up the DOM from `childElement` looking for a parent matching a class (`.foo`) or id (`#foo`) selector. Returns the matching parent or `null` if the `iterationLimit` is reached.

```typescript
static findParent<Child extends HTMLElement, Parent extends HTMLElement>(
  childElement: Child,
  searchedSelector: string,
  iterationLimit?: number,
  currentIterationCount?: number,
): Parent | null
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `childElement` | `Child` | — | Starting element |
| `searchedSelector` | `string` | — | `.className` or `#idName` |
| `iterationLimit` | `number` | `5` | Max levels to traverse upward |
| `currentIterationCount` | `number` | `0` | Internal recursion counter |

**Example**

```typescript
const card = Dom.findParent(button, '.card');
const modal = Dom.findParent(closeBtn, '#main-modal', 10);
```

---

### `getParent`

Traverses up exactly `iterationLimit` levels and returns the ancestor element at that level.

```typescript
static getParent<Child extends HTMLElement, Parent extends HTMLElement>(
  childElement: Child,
  iterationLimit?: number,
  currentIterationCount?: number,
): Parent | null
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `childElement` | `Child` | — | Starting element |
| `iterationLimit` | `number` | `5` | How many levels to go up |
| `currentIterationCount` | `number` | `0` | Internal recursion counter |

**Example**

```typescript
const grandparent = Dom.getParent(el, 2);
```

---

### `isInViewport`

Returns `true` if the element is fully visible within the current viewport.

```typescript
static isInViewport<Element extends HTMLElement>(element: Element): boolean
```

**Example**

```typescript
if (Dom.isInViewport(section)) {
  section.classList.add('animate');
}
```

---

### `scrollToElement`

Smoothly scrolls the page to bring the element into view, with an optional pixel offset.

```typescript
static scrollToElement<Element extends HTMLElement>(
  element: Element,
  offset: number,
  callback?: (() => void) | null,
): void
```

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | `Element` | Target element to scroll to |
| `offset` | `number` | Pixel amount subtracted from the scroll position |
| `callback` | `() => void` | Optional function called after scroll is triggered |

**Example**

```typescript
Dom.scrollToElement(section, 80, () => {
  console.log('scrolled');
});
```

---

### `getRect`

Returns the `DOMRect` bounding box of an element.

```typescript
static getRect<Element extends HTMLElement>(element: Element): DOMRect
```

**Example**

```typescript
const rect = Dom.getRect(el);
console.log(rect.top, rect.width);
```

---

### `getRects`

Returns an array of `DOMRect` bounding boxes for multiple elements.

```typescript
static getRects<Element extends HTMLElement>(...elements: Element[]): DOMRect[]
```

**Example**

```typescript
const [rectA, rectB] = Dom.getRects(elA, elB);
```

---

### `rectsOverlap`

Returns `true` if two `DOMRect` values overlap. Optional per-rect pixel offsets adjust the comparison.

```typescript
static rectsOverlap(
  rectA: DOMRect,
  rectB: DOMRect,
  offsetA?: number,
  offsetB?: number,
): boolean
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `rectA` | `DOMRect` | — | First rectangle |
| `rectB` | `DOMRect` | — | Second rectangle |
| `offsetA` | `number` | `0` | Vertical offset applied to rect A |
| `offsetB` | `number` | `0` | Vertical offset applied to rect B |

**Example**

```typescript
const overlap = Dom.rectsOverlap(Dom.getRect(elA), Dom.getRect(elB));
```

---

### `isOverlapping`

Convenience wrapper around `getRect` + `rectsOverlap`. Returns `true` if two elements overlap.

```typescript
static isOverlapping(elementA: HTMLElement, elementB: HTMLElement): boolean
```

**Example**

```typescript
if (Dom.isOverlapping(tooltip, trigger)) {
  tooltip.style.top = '-10px';
}
```

---

### `isPointerInside`

Returns `true` if the mouse pointer is currently hovering over the element. Uses the CSS `:hover` pseudo-class via `element.matches()`.

```typescript
static isPointerInside<Element extends HTMLElement>(element: Element): boolean
```

**Example**

```typescript
document.addEventListener('mousemove', () => {
  if (Dom.isPointerInside(menu)) {
    console.log('pointer is inside menu');
  }
});
```
