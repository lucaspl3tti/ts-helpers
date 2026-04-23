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

  // ─── isNode ────────────────────────────────────────────────────────────────

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

  // ─── get ───────────────────────────────────────────────────────────────────

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

  // ─── getSingleElements ─────────────────────────────────────────────────────

  describe('getSingleElements', () => {
    it('returns a map of elements by key', () => {
      const span = document.createElement('span');
      const p = document.createElement('p');
      container.appendChild(span);
      container.appendChild(p);
      const result = Dom.getSingleElements(container, { s: 'span', p: 'p' });
      expect(result.s).toBe(span);
      expect(result.p).toBe(p);
    });

    it('returns null values in non-strict mode for missing elements', () => {
      const result = Dom.getSingleElements(container, { x: '.missing' }, false);
      expect(result.x).toBeNull();
    });
  });

  // ─── getAll ────────────────────────────────────────────────────────────────

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
  });

  // ─── addClass ──────────────────────────────────────────────────────────────

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

  // ─── removeClass ───────────────────────────────────────────────────────────

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

  // ─── hasClass ──────────────────────────────────────────────────────────────

  describe('hasClass', () => {
    it('returns true when class is present', () => {
      container.classList.add('foo');
      expect(Dom.hasClass(container, 'foo')).toBe(true);
    });

    it('returns false when class is absent', () => {
      expect(Dom.hasClass(container, 'bar')).toBe(false);
    });
  });

  // ─── toggleClass ───────────────────────────────────────────────────────────

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

  // ─── listenTo ──────────────────────────────────────────────────────────────

  describe('listenTo', () => {
    it('adds an event listener that fires on the given event', () => {
      const handler = vi.fn();
      Dom.listenTo(container, 'click', handler);
      container.dispatchEvent(new MouseEvent('click'));
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  // ─── setStyle ──────────────────────────────────────────────────────────────

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

  // ─── removeStyle ───────────────────────────────────────────────────────────

  describe('removeStyle', () => {
    it('clears a CSS property by setting it to an empty string', () => {
      container.style.setProperty('color', 'red');
      Dom.removeStyle(container, 'color');
      expect(container.style.getPropertyValue('color')).toBe('');
    });
  });

  // ─── createElement ─────────────────────────────────────────────────────────

  describe('createElement', () => {
    it('creates an element of the given tag type', () => {
      const el = Dom.createElement('span');
      expect(el.tagName).toBe('SPAN');
    });

    it('sets the id attribute', () => {
      const el = Dom.createElement('div', { id: 'my-id' });
      expect(el.id).toBe('my-id');
    });

    it('sets classes from an array', () => {
      const el = Dom.createElement('div', { classes: ['a', 'b'] });
      expect(el.classList.contains('a')).toBe(true);
      expect(el.classList.contains('b')).toBe(true);
    });

    it('sets textContent', () => {
      const el = Dom.createElement('div', { text: 'hello' });
      expect(el.textContent).toBe('hello');
    });

    it('sets innerHTML', () => {
      const el = Dom.createElement('div', { html: '<span>hi</span>' });
      expect(el.innerHTML).toBe('<span>hi</span>');
    });

    it('sets dataset attributes', () => {
      const el = Dom.createElement('div', { dataset: { foo: 'bar' } });
      expect(el.dataset.foo).toBe('bar');
    });

    it('appends the element to a parent when appendTo is provided', () => {
      Dom.createElement('span', {}, container);
      expect(container.querySelector('span')).not.toBeNull();
    });

    it('throws when type is an empty string', () => {
      expect(() => Dom.createElement('' as any)).toThrow('must not be empty');
    });

    it('sets arbitrary attributes via the default case', () => {
      const el = Dom.createElement('a', { href: 'https://example.com' } as any);
      expect(el.getAttribute('href')).toBe('https://example.com');
    });
  });

  // ─── hideElement ───────────────────────────────────────────────────────────

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

  // ─── showElement ───────────────────────────────────────────────────────────

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

  // ─── findParent ────────────────────────────────────────────────────────────

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
      const el = document.createElement('div');
      container.appendChild(el);
      expect(Dom.findParent(el, '.nonexistent', 1)).toBeNull();
    });

    it('throws for a plain tag-name selector (not . or #)', () => {
      const inner = document.createElement('div');
      container.appendChild(inner);
      expect(() => Dom.findParent(inner, 'div')).toThrow('not valid');
    });
  });

  // ─── getParent ─────────────────────────────────────────────────────────────

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

  // ─── isInViewport ──────────────────────────────────────────────────────────

  describe('isInViewport', () => {
    it('returns true in happy-dom (zero-rect element at zero-size viewport)', () => {
      const el = document.createElement('div');
      container.appendChild(el);
      // In happy-dom all rect coords are 0 and viewport dims are 0,
      // so 0>=0, 0>=0, 0<=0, 0<=0 → all viewport conditions pass → true
      expect(Dom.isInViewport(el)).toBe(true);
    });
  });

  // ─── scrollToElement ───────────────────────────────────────────────────────

  describe('scrollToElement', () => {
    it('calls window.scrollTo', () => {
      const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const el = document.createElement('div');
      container.appendChild(el);
      Dom.scrollToElement(el, 0);
      expect(scrollTo).toHaveBeenCalled();
    });

    it('invokes the optional callback once', () => {
      vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const cb = vi.fn();
      const el = document.createElement('div');
      container.appendChild(el);
      Dom.scrollToElement(el, 0, cb);
      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('does not throw when callback is null', () => {
      vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const el = document.createElement('div');
      container.appendChild(el);
      expect(() => Dom.scrollToElement(el, 0, null)).not.toThrow();
    });
  });

  // ─── extractTextFromNodes ──────────────────────────────────────────────────

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

  // ─── getRect ───────────────────────────────────────────────────────────────

  describe('getRect', () => {
    it('returns a DOMRect for the element', () => {
      const el = document.createElement('div');
      container.appendChild(el);
      const rect = Dom.getRect(el);
      expect(rect).toBeInstanceOf(DOMRect);
    });
  });

  // ─── getRects ──────────────────────────────────────────────────────────────

  describe('getRects', () => {
    it('returns an array of DOMRects, one per element', () => {
      const a = document.createElement('div');
      const b = document.createElement('div');
      container.appendChild(a);
      container.appendChild(b);
      const rects = Dom.getRects(a, b);
      expect(rects).toHaveLength(2);
      expect(rects[0]).toBeInstanceOf(DOMRect);
      expect(rects[1]).toBeInstanceOf(DOMRect);
    });
  });

  // ─── rectsOverlap ──────────────────────────────────────────────────────────

  describe('rectsOverlap', () => {
    it('returns true for two overlapping rectangles', () => {
      const a = new DOMRect(0, 0, 100, 100);
      const b = new DOMRect(50, 50, 100, 100);
      expect(Dom.rectsOverlap(a, b)).toBe(true);
    });

    it('returns false for two non-overlapping rectangles', () => {
      const a = new DOMRect(0, 0, 100, 100);
      const b = new DOMRect(200, 200, 100, 100);
      expect(Dom.rectsOverlap(a, b)).toBe(false);
    });

    it('returns false for rectangles that only touch on an edge (right==left)', () => {
      // rectA.right (100) <= rectB.left (100) → no overlap
      const a = new DOMRect(0, 0, 100, 100);
      const b = new DOMRect(100, 0, 100, 100);
      expect(Dom.rectsOverlap(a, b)).toBe(false);
    });
  });

  // ─── isOverlapping ─────────────────────────────────────────────────────────

  describe('isOverlapping', () => {
    it('returns false for two zero-size elements in happy-dom', () => {
      const a = document.createElement('div');
      const b = document.createElement('div');
      container.appendChild(a);
      container.appendChild(b);
      // In happy-dom getBoundingClientRect returns {0,0,0,0}, so
      // rectA.right(0) <= rectB.left(0) → true → no overlap → false
      expect(Dom.isOverlapping(a, b)).toBe(false);
    });
  });

  // ─── isPointerInside ───────────────────────────────────────────────────────

  describe('isPointerInside', () => {
    it('returns false when the element is not hovered', () => {
      const el = document.createElement('div');
      container.appendChild(el);
      // In happy-dom no element is `:hover` by default
      expect(Dom.isPointerInside(el)).toBe(false);
    });
  });
});
