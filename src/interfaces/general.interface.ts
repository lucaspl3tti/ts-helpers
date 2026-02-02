export interface CallbackOptions<Scope = unknown> {
  scope?: Scope;
  once?: boolean;
}

export interface ElementCreateOptions {
  id?: string;
  classes?: string | string[];
  text?: string;
  html?: string;
  dataset?: object;
  [key: string]: any;
}

export interface JsonObject {
  [key: string]: any;
}

export interface Listener {
  callback: (event: Event) => void;
  options: CallbackOptions;
  splitEventName: string[];
}

export interface ScrollToAnchorOptions {
  targetSelector: string;
  offset?: number;
  callback?: (() => void);
}

export interface RandomTextOptions {
  minUppercase?: number;
  minLowercase?: number;
  minNumbers?: number;
}

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'fhd' | 'qhd' | 'uhd';
export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
