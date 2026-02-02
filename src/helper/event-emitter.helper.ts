import type {
  CallbackOptions,
  Listener,
} from '../interfaces/general.interface';

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
export default class NativeEventEmitter<Element extends HTMLElement> {
  public _element: Element|Document;
  public _listeners: Listener[];

  constructor(element: Element|Document = document) {
    this._element = element;
    element.$emitter = this;
    this._listeners = [];
  }

  get element(): Element|Document {
    return this._element;
  }

  set element(value: Element|Document) {
    this._element = value;
  }

  get listeners(): Listener[] {
    return this._listeners;
  }

  set listeners(value: Listener[]) {
    this._listeners = value;
  }

  publish<EventType extends Record<string, any>>(
    eventName: string,
    detail: EventType = {} as EventType,
    cancelable = false,
  ): CustomEvent<EventType> {
    const event = new CustomEvent<EventType>(eventName, {
      detail,
      cancelable,
    });

    this.element.dispatchEvent(event);

    return event;
  }

  subscribe<DetailType = unknown>(
    eventName: string,
    callback: (event: CustomEvent<DetailType>) => void,
    options: CallbackOptions = {},
  ): void {
    const emitter = this;
    const splitEventName = eventName.split('.');

    if (!splitEventName[0]) {
      return;
    }

    const scopedCallback = options.scope
      ? callback.bind(options.scope)
      : callback;

    // Support for listeners which are fired once
    const actualCallback = options.once
      ? (event: CustomEvent<DetailType>) => {
        emitter.unsubscribe(eventName);
        scopedCallback(event);
      }
      : scopedCallback;

    this.element.addEventListener(
      splitEventName[0],
      actualCallback as EventListener,
    );

    this.listeners.push({
      splitEventName,
      options,
      callback: actualCallback as EventListener,
    });
  }

  unsubscribe(eventName: string): void {
    const splitEventName = eventName.split('.');

    this.listeners = this.listeners.reduce((
      accumulator: Listener[],
      listener: Listener,
    ) => {
      const foundEvent = [...listener.splitEventName]
        .sort().toString() === splitEventName.sort().toString();

      if (foundEvent) {
        if (listener.splitEventName[0]) {
          this.element.removeEventListener(
            listener.splitEventName[0],
            listener.callback as EventListener,
          );
        }

        return accumulator;
      }

      accumulator.push(listener);
      return accumulator;
    }, []);
  }

  reset(): void {
    this.listeners.forEach((listener: Listener) => {
      if (!listener.splitEventName[0]) {
        return;
      }

      this.element.removeEventListener(
        listener.splitEventName[0],
        listener.callback as EventListener,
      );
    });
  }
}

declare global {
  interface HTMLElement {
    $emitter?: NativeEventEmitter<HTMLElement>;
  }

  // eslint-disable-next-line no-unused-vars
  interface Document {
    $emitter?: NativeEventEmitter<HTMLElement>;
  }
}
