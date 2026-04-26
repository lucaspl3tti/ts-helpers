export interface VirtualNode {
  children?: string | VirtualNode[];
}

export interface ElementCreateOptions {
  id?: string;
  classes?: string | string[];
  text?: string;
  html?: string;
  dataset?: Record<string, string>;
  [key: string]: any;
}

export interface ScrollToAnchorOptions {
  targetSelector: string;
  offset?: number;
  callback?: (() => void);
}
