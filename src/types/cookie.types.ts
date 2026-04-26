export interface CookieOptions {
  /** Expiry: number of days from now, or an exact `Date`. */
  expires?: number | Date;
  /** Cookie path. Defaults to `'/'`. */
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}
