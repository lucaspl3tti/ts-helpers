import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Dom from '../src/helper/dom.helper';

describe('Dom', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    vi.restoreAllMocks();
  });

  describe('isNode', () => {
    it('returns true for a valid HTMLElement', () => {
      expect(Dom.isNode(document.createElement('div'))).toBe(true);
    });

    it('returns true for the document object', () => {
      expect(Dom.isNode(document)).toBe(true);
    });

    it('returns false for null', () => {
      expect(Dom.isNode(null)).toBe(false);
    });
  });

  describe('get', () => {
    it('returns the matching element', () => {
      const span = document.createElement('span');
      container.appendChild(span);
      expect(Dom.get(container, 'span')).toBe(span);
    });

    it('throws in strict mode when parent is not a Node', () => {
      expect(() => Dom.get(null as any, 'span')).toThrow('not a valid HTML Node');
    });

    it('throws in strict mode when element not found', () => {
      expect(() => Dom.get(container, '.nonexistent')).toThrow('does not exist in parent node');
    });

    it('returns null in non-strict mode when not found', () => {
      expect(Dom.get(container, '.nonexistent', false)).toBeNull();
    });
  });

  describe('getSingleElements', () => {
    it('returns a map of elements by key', () => {
      const span = document.createElement('span');
      const paragraph = document.createElement('p');
      container.appendChild(span);
      container.appendChild(paragraph);
      const result = Dom.getSingleElements(container, { s: 'span', p: 'p' });
      expect(result.s).toBe(span);
      expect(result.p).toBe(paragraph);
    });

    it('returns null values in non-strict mode for missing elements', () => {
      const result = Dom.getSingleElements(container, { x: '.missing' }, false);
      expect(result.x).toBeNull();
    });
  });

  describe('getAll', () => {
    it('returns all matching elements', () => {
      container.innerHTML = '<span></span><span></span>';
      const result = Dom.getAll(container, 'span');
      expect(result).toHaveLength(2);
    });

    it('throws in strict mode when none found', () => {
      expect(() => Dom.getAll(container, '.none')).toThrow('At least one item of');
    });

    it('returns empty array in non-strict mode when none found', () => {
      expect(Dom.getAll(container, '.none', false)).toEqual([]);
    });

    it('throws in strict mode when parent is not a valid Node', () => {
      expect(() => Dom.getAll(null as any, 'div')).toThrow('not a valid HTML Node');
    });
  });

  describe('addClass', () => {
    it('adds a single class string', () => {
      Dom.addClass(container, 'foo');
      expect(container.classList.contains('foo')).toBe(true);
    });

    it('adds multiple classes from an array', () => {
      Dom.addClass(container, ['foo', 'bar']);
      expect(container.classList.contains('foo')).toBe(true);
      expect(container.classList.contains('bar')).toBe(true);
    });
  });

  describe('removeClass', () => {
    it('removes a single class string', () => {
      container.classList.add('foo');
      Dom.removeClass(container, 'foo');
      expect(container.classList.contains('foo')).toBe(false);
    });

    it('removes multiple classes from an array', () => {
      container.classList.add('foo', 'bar');
      Dom.removeClass(container, ['foo', 'bar']);
      expect(container.classList.contains('foo')).toBe(false);
      expect(container.classList.contains('bar')).toBe(false);
    });
  });

  describe('hasClass', () => {
    it('returns true when class is present', () => {
      container.classList.add('foo');
      expect(Dom.hasClass(container, 'foo')).toBe(true);
    });

    it('returns false when class is absent', () => {
      expect(Dom.hasClass(container, 'bar')).toBe(false);
    });
  });

  describe('toggleClass', () => {
    it('toggles a single class on', () => {
      Dom.toggleClass(container, 'foo');
      expect(container.classList.contains('foo')).toBe(true);
    });

    it('toggles a single class off', () => {
      container.classList.add('foo');
      Dom.toggleClass(container, 'foo');
      expect(container.classList.contains('foo')).toBe(false);
    });

    it('toggles multiple classes from an array', () => {
      Dom.toggleClass(container, ['foo', 'bar']);
      expect(container.classList.contains('foo')).toBe(true);
      expect(container.classList.contains('bar')).toBe(true);
    });
  });

  describe('listenTo', () => {
    it('adds an event listener that fires on the given event', () => {
      const handler = vi.fn();
      Dom.listenTo(container, 'click', handler);
      container.dispatchEvent(new MouseEvent('click'));
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('setStyle', () => {
    it('sets a CSS property on the element', () => {
      Dom.setStyle(container, 'color', 'red');
      expect(container.style.getPropertyValue('color')).toBe('red');
    });

    it('does nothing when value is an empty string (falsy)', () => {
      Dom.setStyle(container, 'color', '');
      // Property was never set, so it stays empty
      expect(container.style.getPropertyValue('color')).toBe('');
    });
  });

  describe('removeStyle', () => {
    it('clears a CSS property by setting it to an empty string', () => {
      container.style.setProperty('color', 'red');
      Dom.removeStyle(container, 'color');
      expect(container.style.getPropertyValue('color')).toBe('');
    });
  });

  describe('createElement', () => {
    it('creates an element of the given tag type', () => {
      const element = Dom.createElement('span');
      expect(element.tagName).toBe('SPAN');
    });

    it('sets the id attribute', () => {
      const element = Dom.createElement('div', { id: 'my-id' });
      expect(element.id).toBe('my-id');
    });

    it('sets classes from an array', () => {
      const element = Dom.createElement('div', { classes: ['a', 'b'] });
      expect(element.classList.contains('a')).toBe(true);
      expect(element.classList.contains('b')).toBe(true);
    });

    it('sets textContent', () => {
      const element = Dom.createElement('div', { text: 'hello' });
      expect(element.textContent).toBe('hello');
    });

    it('sets innerHTML', () => {
      const element = Dom.createElement('div', { html: '<span>hi</span>' });
      expect(element.innerHTML).toBe('<span>hi</span>');
    });

    it('sets dataset attributes', () => {
      const element = Dom.createElement('div', { dataset: { foo: 'bar' } });
      expect(element.dataset.foo).toBe('bar');
    });

    it('appends the element to a parent when appendTo is provided', () => {
      Dom.createElement('span', {}, container);
      expect(container.querySelector('span')).not.toBeNull();
    });

    it('throws when type is an empty string', () => {
      expect(() => Dom.createElement('' as any)).toThrow('must not be empty');
    });

    it('sets arbitrary attributes via the default case', () => {
      const element = Dom.createElement('a', { href: 'https://example.com' } as any);
      expect(element.getAttribute('href')).toBe('https://example.com');
    });

    it('skips setAttribute when option key is an empty string', () => {
      const element = Dom.createElement('div', { '': 'value' } as any);
      expect(element.hasAttribute('')).toBe(false);
    });

    it('ignores an empty id option', () => {
      const element = Dom.createElement('div', { id: '' });
      expect(element.id).toBe('');
    });

    it('ignores an empty classes option', () => {
      const element = Dom.createElement('div', { classes: [] });
      expect(element.classList.length).toBe(0);
    });

    it('ignores an empty text option', () => {
      const element = Dom.createElement('div', { text: '' });
      expect(element.textContent).toBe('');
    });

    it('ignores an empty html option', () => {
      const element = Dom.createElement('div', { html: '' });
      expect(element.innerHTML).toBe('');
    });

    it('ignores an empty dataset option', () => {
      const element = Dom.createElement('div', { dataset: {} });
      expect(Object.keys(element.dataset)).toHaveLength(0);
    });
  });

  describe('hideElement', () => {
    it('sets display:none when no hiddenClass is provided', () => {
      Dom.hideElement(container);
      expect(container.style.getPropertyValue('display')).toBe('none');
    });

    it('adds the hiddenClass when provided (does not set display)', () => {
      Dom.hideElement(container, 'hidden');
      expect(container.classList.contains('hidden')).toBe(true);
      // display is not touched when a class is used
      expect(container.style.getPropertyValue('display')).toBe('');
    });
  });

  describe('showElement', () => {
    it('sets display to "block" by default when no showClass is provided', () => {
      Dom.showElement(container);
      expect(container.style.getPropertyValue('display')).toBe('block');
    });

    it('sets a custom display style when provided', () => {
      Dom.showElement(container, '', 'flex');
      expect(container.style.getPropertyValue('display')).toBe('flex');
    });

    it('adds the showClass when provided (does not set display)', () => {
      Dom.showElement(container, 'visible');
      expect(container.classList.contains('visible')).toBe(true);
      // display is not touched when a class is used
      expect(container.style.getPropertyValue('display')).toBe('');
    });
  });

  describe('findParent', () => {
    it('finds an ancestor matching a class selector', () => {
      const outer = document.createElement('div');
      outer.classList.add('outer');
      const inner = document.createElement('div');
      outer.appendChild(inner);
      container.appendChild(outer);

      const result = Dom.findParent(inner, '.outer');
      expect(result).toBe(outer);
    });

    it('finds an ancestor matching an id selector', () => {
      const outer = document.createElement('div');
      outer.id = 'outer-id';
      const inner = document.createElement('div');
      outer.appendChild(inner);
      container.appendChild(outer);

      const result = Dom.findParent(inner, '#outer-id');
      expect(result).toBe(outer);
    });

    it('returns null when the iteration limit is exhausted', () => {
      // iterationLimit=1 means: ++currentIterationCount (→1) <= 1, so it
      // returns null immediately on the first call.
      const element = document.createElement('div');
      container.appendChild(element);
      expect(Dom.findParent(element, '.nonexistent', 1)).toBeNull();
    });

    it('throws for a plain tag-name selector (not . or #)', () => {
      const inner = document.createElement('div');
      container.appendChild(inner);
      expect(() => Dom.findParent(inner, 'div')).toThrow('not valid');
    });

    it('recurses through multiple ancestor levels to find a matching element', () => {
      const grandparent = document.createElement('div');
      grandparent.classList.add('target');
      const parent = document.createElement('div');
      const child = document.createElement('div');
      grandparent.appendChild(parent);
      parent.appendChild(child);
      container.appendChild(grandparent);

      const result = Dom.findParent(child, '.target');
      expect(result).toBe(grandparent);
    });
  });

  describe('getParent', () => {
    it('navigates up exactly N levels in the DOM', () => {
      const level1 = document.createElement('div');
      const level2 = document.createElement('div');
      level1.appendChild(level2);
      container.appendChild(level1);

      // From level2 up 2 levels → container
      const result = Dom.getParent(level2, 2);
      expect(result).toBe(container);
    });

    it('returns parentElement when iterationLimit is 1', () => {
      const child = document.createElement('div');
      container.appendChild(child);
      expect(Dom.getParent(child, 1)).toBe(container);
    });
  });

  describe('isInViewport', () => {
    it('returns true in happy-dom (zero-rect element at zero-size viewport)', () => {
      const element = document.createElement('div');
      container.appendChild(element);
      // In happy-dom all rect coords are 0 and viewport dims are 0,
      // so 0>=0, 0>=0, 0<=0, 0<=0 → all viewport conditions pass → true
      expect(Dom.isInViewport(element)).toBe(true);
    });
  });

  describe('scrollToElement', () => {
    it('calls window.scrollTo', () => {
      const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const element = document.createElement('div');
      container.appendChild(element);
      Dom.scrollToElement(element, 0);
      expect(scrollTo).toHaveBeenCalled();
    });

    it('invokes the optional callback once', () => {
      vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const callback = vi.fn();
      const element = document.createElement('div');
      container.appendChild(element);
      Dom.scrollToElement(element, 0, callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('does not throw when callback is null', () => {
      vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const element = document.createElement('div');
      container.appendChild(element);
      expect(() => Dom.scrollToElement(element, 0, null)).not.toThrow();
    });
  });

  describe('extractTextFromNodes', () => {
    it('concatenates string children from a flat list of virtual nodes', () => {
      const nodes = [{ children: 'hello' }, { children: ' world' }];
      expect(Dom.extractTextFromNodes(nodes)).toBe('hello world');
    });

    it('recursively extracts text from nested virtual nodes', () => {
      const nodes = [{ children: [{ children: 'nested' }] }];
      expect(Dom.extractTextFromNodes(nodes)).toBe('nested');
    });

    it('returns an empty string when nodes have no children', () => {
      const nodes = [{ children: [] }, { children: [] }];
      expect(Dom.extractTextFromNodes(nodes)).toBe('');
    });

    it('mixes flat strings and nested arrays', () => {
      const nodes = [
        { children: 'a' },
        { children: [{ children: 'b' }] },
      ];
      expect(Dom.extractTextFromNodes(nodes)).toBe('ab');
    });
  });

  describe('getRect', () => {
    it('returns a DOMRect for the element', () => {
      const element = document.createElement('div');
      container.appendChild(element);
      const rect = Dom.getRect(element);
      expect(rect).toBeInstanceOf(DOMRect);
    });
  });

  describe('getRects', () => {
    it('returns an array of DOMRects, one per element', () => {
      const elementA = document.createElement('div');
      const elementB = document.createElement('div');
      container.appendChild(elementA);
      container.appendChild(elementB);
      const rects = Dom.getRects(elementA, elementB);
      expect(rects).toHaveLength(2);
      expect(rects[0]).toBeInstanceOf(DOMRect);
      expect(rects[1]).toBeInstanceOf(DOMRect);
    });
  });

  describe('rectsOverlap', () => {
    it('returns true for two overlapping rectangles', () => {
      const elementA = new DOMRect(0, 0, 100, 100);
      const elementB = new DOMRect(50, 50, 100, 100);
      expect(Dom.rectsOverlap(elementA, elementB)).toBe(true);
    });

    it('returns false for two non-overlapping rectangles', () => {
      const elementA = new DOMRect(0, 0, 100, 100);
      const elementB = new DOMRect(200, 200, 100, 100);
      expect(Dom.rectsOverlap(elementA, elementB)).toBe(false);
    });

    it('returns false for rectangles that only touch on an edge (right==left)', () => {
      // rectA.right (100) <= rectB.left (100) → no overlap
      const elementA = new DOMRect(0, 0, 100, 100);
      const elementB = new DOMRect(100, 0, 100, 100);
      expect(Dom.rectsOverlap(elementA, elementB)).toBe(false);
    });
  });

  describe('isOverlapping', () => {
    it('returns false for two zero-size elements in happy-dom', () => {
      const elementA = document.createElement('div');
      const elementB = document.createElement('div');
      container.appendChild(elementA);
      container.appendChild(elementB);
      // In happy-dom getBoundingClientRect returns {0,0,0,0}, so
      // rectA.right(0) <= rectB.left(0) → true → no overlap → false
      expect(Dom.isOverlapping(elementA, elementB)).toBe(false);
    });
  });

  describe('isPointerInside', () => {
    it('returns false when the element is not hovered', () => {
      const element = document.createElement('div');
      container.appendChild(element);
      // In happy-dom no element is `:hover` by default
      expect(Dom.isPointerInside(element)).toBe(false);
    });
  });
});
