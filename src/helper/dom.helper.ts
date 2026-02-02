import type { ElementCreateOptions } from '../interfaces/general.interface';
import Utilities from './utilities.helper';

/**
 * Dom provides utility methods for working with the DOM.
 */
export default class Dom {
  static isNode<Element extends HTMLElement|Document>(
    element: Element|null,
  ): boolean {
    return element instanceof Node;
  }

  // Query first element of given selector
  static get<Parent extends HTMLElement|Document, Element extends HTMLElement>(
    parent: Parent,
    selector: string,
    strict = true,
  ): Element|null {
    if (strict && !this.isNode(parent)) {
      throw new Error('The parent element is not a valid HTML Node!');
    }

    const element = parent.querySelector<Element>(selector);

    if (strict && !element) {
      throw new Error(`The required element "${selector}" does not exist in parent node!`);
    }

    return element;
  }

  // Get multiple elements from the DOM by their selectors
  static getSingleElements<Parent extends HTMLElement|Document, Element extends HTMLElement>(
    parent: Parent,
    selectors: { [key: string]: string },
    strict = true,
  ): { [key: string]: Element | null } {
    const elements: { [key: string]: Element|null } = {};

    Utilities.iterate(selectors, (selector, key) => {
      elements[key!] = this.get(parent, selector, strict);
    });

    return elements;
  }

  static getAll<Parent extends HTMLElement|Document, Element extends HTMLElement>(
    parent: Parent,
    selector: string,
    strict = true,
  ): Element[] {
    if (strict && !this.isNode(parent)) {
      throw new Error('The parent element is not a valid HTML Node!');
    }

    const nodeList = parent.querySelectorAll<Element>(selector);
    const elements = [...nodeList];

    if (strict && elements.length === 0) {
      throw new Error(`At least one item of "${selector}" must exist in parent node!`);
    }

    return elements;
  }

  static addClass<Element extends HTMLElement>(
    element: Element,
    classes: string|string[],
  ): void {
    if (Array.isArray(classes)) {
      element.classList.add(...classes);
    } else {
      element.classList.add(classes);
    }
  }

  static removeClass<Element extends HTMLElement>(
    element: Element,
    classes: string|string[],
  ): void {
    if (Array.isArray(classes)) {
      element.classList.remove(...classes);
    } else {
      element.classList.remove(classes);
    }
  }

  static hasClass<Element extends HTMLElement>(
    element: Element,
    className: string,
  ): boolean {
    return element.classList.contains(className);
  }

  static toggleClass<Element extends HTMLElement>(
    element: Element,
    classes: string|string[],
  ): void {
    if (Array.isArray(classes)) {
      Utilities.iterate(classes,(className) => {
        return element.classList.toggle(className);
      });
    } else {
      element.classList.toggle(classes);
    }
  }

  // eslint-disable-next-line max-len
  static listenTo<Element extends HTMLElement|Document|Window, EventName extends keyof HTMLElementEventMap>(
    target: Element,
    event: EventName,
    callback: (eventDetails: HTMLElementEventMap[EventName]) => void,
  ): void {
    target.addEventListener(
      event,
      callback as EventListener,
    );
  }

  static setStyle<Element extends HTMLElement, StyleProperty extends keyof CSSStyleDeclaration>(
    element: Element,
    property: StyleProperty,
    value: CSSStyleDeclaration[StyleProperty],
  ): void {
    if (!value) {
      return;
    }

    element.style.setProperty(property as string, value.toString());
  }

  static removeStyle<Element extends HTMLElement, StyleProperty extends keyof CSSStyleDeclaration>(
    element: Element,
    property: StyleProperty,
  ): void {
    element.style.setProperty(property as string, '');
  }

  static createElement<Parent extends HTMLElement, Element extends HTMLElement>(
    type: keyof HTMLElementTagNameMap,
    options: ElementCreateOptions = {},
    appendTo: Parent|null = null,
  ): Element {
    if (Utilities.isEmpty(type)) {
      throw new Error('Element type for new element must not be empty');
    }

    const element = document.createElement(type) as Element;

    Utilities.iterate(Object.entries(options), ([key, value]) => {
      switch (key) {
        case 'id':
          if (Utilities.isEmpty(value)) {
            break;
          }

          element.id = value;
          break;
        case 'classes':
          if (Utilities.isEmpty(value)) {
            break;
          }

          this.addClass(element, value);
          break;
        case 'text':
          if (Utilities.isEmpty(value)) {
            break;
          }

          element.textContent = value;
          break;
        case 'html':
          if (Utilities.isEmpty(value)) {
            break;
          }

          element.innerHTML = value;
          break;
        case 'dataset':
          if (Utilities.isEmpty(value)) {
            break;
          }

          Object.entries(value).forEach(([dataKey, dataValue]) => {
            if (typeof dataValue === 'string') {
              element.dataset[dataKey] = dataValue;
            }
          });
          break;
        default:
          if (!key) {
            break;
          }

          element.setAttribute(key, value as string);
          break;
      }
    });

    if (appendTo) {
      appendTo.appendChild(element);
    }

    return element;
  }

  static hideElement<Element extends HTMLElement>(
    element: Element,
    hiddenClass = '',
  ): void {
    if (hiddenClass === '') {
      return this.setStyle(element, 'display', 'none');
    }

    element.classList.add(hiddenClass);
  }

  static showElement<Element extends HTMLElement>(
    element: Element,
    showClass = '',
    displayStyle: CSSStyleDeclaration['display'] = 'block',
  ): void {
    if (Utilities.isEmpty(showClass)) {
      return this.setStyle(element, 'display', displayStyle);
    }

    element.classList.add(showClass);
  }

  // Find parent of an element by a given selector (either id or class)
  static findParent<Child extends HTMLElement, Parent extends HTMLElement>(
    childElement: Child,
    searchedSelector: string,
    iterationLimit = 5,
    currentIterationCount = 0,
  ): Parent|null {
    if (iterationLimit <= ++currentIterationCount) {
      return null;
    }

    const { parentElement } = childElement;
    let isSearchedElement = false;

    /* eslint-disable max-len */
    if (searchedSelector.charAt(0) === '.') {
      const searchedClassName = searchedSelector.substring(1);
      isSearchedElement = parentElement?.classList.contains(searchedClassName) || false;
    } else if (searchedSelector.charAt(0) === '#') {
      const searchedIdName = searchedSelector.substring(1);
      isSearchedElement = parentElement?.id === searchedIdName;
    } else {
      throw new Error('The given selector is not valid, please check if it is an id or class selector');
    }
    /* eslint-enable max-len */

    if (isSearchedElement || !parentElement) {
      return parentElement as Parent|null;
    }

    return this.findParent(
      parentElement,
      searchedSelector,
      iterationLimit,
      currentIterationCount,
    );
  }

  // Get a parent by going up in the DOM by a given number of iterations
  static getParent<Child extends HTMLElement, Parent extends HTMLElement>(
    childElement: Child,
    iterationLimit = 5,
    currentIterationCount = 0,
  ): Parent|null {
    ++currentIterationCount;
    const { parentElement } = childElement;

    if (currentIterationCount >= iterationLimit || !parentElement) {
      return parentElement as Parent | null;
    }

    return this.getParent(parentElement, iterationLimit, currentIterationCount);
  }

  static isInViewport<Element extends HTMLElement>(element: Element): boolean {
    const rect = this.getRect(element);

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  static scrollToElement<Element extends HTMLElement>(
    element: Element,
    offset: number,
    callback?: (() => void)|null,
  ): void {
    const elementPosition = element.getBoundingClientRect();
    const scrollPosition = (elementPosition.y || elementPosition.top)
      + (document.scrollingElement || document.documentElement).scrollTop
      - offset;

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });

    if (callback && callback instanceof Function) {
      callback();
    }
  }

  static extractTextFromNodes(nodes: any[]): string {
    let text = '';

    for (const node of nodes) {
      if (typeof node.children === 'string') {
        text += node.children;
      } else if (Array.isArray(node.children)) {
        text += this.extractTextFromNodes(node.children);
      }
    }

    return text;
  }

  static getRect<Element extends HTMLElement>(element: Element): DOMRect {
    return element.getBoundingClientRect();
  }

  static getRects<Element extends HTMLElement>(...elements: Element[]): DOMRect[] {
    return elements.map((element: Element) => this.getRect(element));
  }

  static rectsOverlap(
    rectA: DOMRect,
    rectB: DOMRect,
    offsetA: number = 0,
    offsetB: number = 0,
  ): boolean {
    return !(
      rectA.right <= rectB.left ||
      rectA.left >= rectB.right ||
      rectA.bottom <= rectB.top + offsetB ||
      rectA.top + offsetA >= rectB.bottom - offsetB
    );
  }

  static isOverlapping(elementA: HTMLElement, elementB: HTMLElement): boolean {
    const rectA = this.getRect(elementA);
    const rectB = this.getRect(elementB);

    return this.rectsOverlap(rectA, rectB);
  }

  static isPointerInside<Element extends HTMLElement>(element: Element): boolean {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    return element.matches(':hover');
  }
}
