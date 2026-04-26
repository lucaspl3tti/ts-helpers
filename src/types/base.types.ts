export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface RandomTextOptions {
  minUppercase?: number;
  minLowercase?: number;
  minNumbers?: number;
}

export type ComparableKeys<Type> = {
  [Key in keyof Type]: Type[Key] extends string | number | boolean | Date ? Key : never;
}[keyof Type];
