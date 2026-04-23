import { describe, it, expect, vi } from 'vitest';
import NativeEventEmitter from '../src/helper/event-emitter.helper';

describe('NativeEventEmitter', () => {
  describe('constructor', () => {
    it('uses document as default element', () => {
      const emitter = new NativeEventEmitter();
      expect(emitter.element).toBe(document);
    });

    it('uses provided element', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      expect(emitter.element).toBe(el);
    });

    it('initializes with empty listeners array', () => {
      const emitter = new NativeEventEmitter();
      expect(emitter.listeners).toEqual([]);
    });

    it('sets $emitter on the element', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      expect(el.$emitter).toBe(emitter);
    });
  });

  describe('element getter/setter', () => {
    it('allows updating the element', () => {
      const emitter = new NativeEventEmitter();
      const el = document.createElement('div');
      emitter.element = el;
      expect(emitter.element).toBe(el);
    });
  });

  describe('listeners getter/setter', () => {
    it('allows replacing the listeners array', () => {
      const emitter = new NativeEventEmitter();
      emitter.subscribe('event-a', vi.fn());
      expect(emitter.listeners).toHaveLength(1);
      emitter.listeners = [];
      expect(emitter.listeners).toHaveLength(0);
    });
  });

  describe('publish', () => {
    it('dispatches a custom event', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const handler = vi.fn();
      el.addEventListener('my-event', handler);
      emitter.publish('my-event');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('includes detail data in the event', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      let received: any;
      el.addEventListener('data-event', (e: Event) => {
        received = (e as CustomEvent).detail;
      });
      emitter.publish('data-event', { value: 42 });
      expect(received).toEqual({ value: 42 });
    });

    it('returns the dispatched CustomEvent', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const event = emitter.publish('test-event');
      expect(event).toBeInstanceOf(CustomEvent);
    });

    it('defaults cancelable to false', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const event = emitter.publish('test-event');
      expect(event.cancelable).toBe(false);
    });

    it('respects cancelable option when set to true', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const event = emitter.publish('test-event', {}, true);
      expect(event.cancelable).toBe(true);
    });
  });

  describe('subscribe', () => {
    it('registers a listener and calls it when event is published', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const handler = vi.fn();
      emitter.subscribe('my-event', handler);
      emitter.publish('my-event');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('adds the listener to the listeners array', () => {
      const emitter = new NativeEventEmitter();
      emitter.subscribe('my-event', vi.fn());
      expect(emitter.listeners).toHaveLength(1);
    });

    it('supports once option — fires only once', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const handler = vi.fn();
      emitter.subscribe('my-event', handler, { once: true });
      emitter.publish('my-event');
      emitter.publish('my-event');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does nothing for empty event name', () => {
      const emitter = new NativeEventEmitter();
      expect(() => emitter.subscribe('', vi.fn())).not.toThrow();
      expect(emitter.listeners).toHaveLength(0);
    });

    it('supports scope option — binds callback to given scope', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const scope = { name: 'test-scope' };
      let capturedThis: any;
      emitter.subscribe(
        'scope-event',
        function (this: any) { capturedThis = this; },
        { scope },
      );
      emitter.publish('scope-event');
      expect(capturedThis).toBe(scope);
    });

    it('stores splitEventName correctly for dotted event names', () => {
      const emitter = new NativeEventEmitter();
      emitter.subscribe('my-event.namespace', vi.fn());
      expect(emitter.listeners[0].splitEventName).toEqual(['my-event', 'namespace']);
    });
  });

  describe('unsubscribe', () => {
    it('removes the listener and stops receiving events', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const handler = vi.fn();
      emitter.subscribe('my-event', handler);
      emitter.unsubscribe('my-event');
      emitter.publish('my-event');
      expect(handler).not.toHaveBeenCalled();
    });

    it('removes listener from the listeners array', () => {
      const emitter = new NativeEventEmitter();
      emitter.subscribe('my-event', vi.fn());
      expect(emitter.listeners).toHaveLength(1);
      emitter.unsubscribe('my-event');
      expect(emitter.listeners).toHaveLength(0);
    });

    it('only removes matching listeners', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const handlerA = vi.fn();
      const handlerB = vi.fn();
      emitter.subscribe('event-a', handlerA);
      emitter.subscribe('event-b', handlerB);
      emitter.unsubscribe('event-a');
      expect(emitter.listeners).toHaveLength(1);
      emitter.publish('event-b');
      expect(handlerB).toHaveBeenCalledTimes(1);
    });

    it('matches dotted event names by sorted parts', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const handler = vi.fn();
      emitter.subscribe('my-event.namespace', handler);
      expect(emitter.listeners).toHaveLength(1);
      emitter.unsubscribe('my-event.namespace');
      expect(emitter.listeners).toHaveLength(0);
    });
  });

  describe('reset', () => {
    it('removes all listeners from the DOM element so they stop receiving events', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      const handler = vi.fn();
      emitter.subscribe('event-a', handler);
      emitter.subscribe('event-b', handler);
      emitter.reset();
      emitter.publish('event-a');
      emitter.publish('event-b');
      expect(handler).not.toHaveBeenCalled();
    });

    it('does not clear the listeners array (only removes DOM listeners)', () => {
      const el = document.createElement('div');
      const emitter = new NativeEventEmitter(el);
      emitter.subscribe('event-a', vi.fn());
      emitter.subscribe('event-b', vi.fn());
      emitter.reset();
      // reset() iterates and removes event listeners but does not splice the array
      expect(emitter.listeners).toHaveLength(2);
    });
  });
});
