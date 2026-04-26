export interface CallbackOptions<Scope = unknown> {
  scope?: Scope;
  once?: boolean;
}

export interface Listener {
  callback: (event: Event) => void;
  options: CallbackOptions;
  splitEventName: string[];
}
