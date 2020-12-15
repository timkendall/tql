import { SelectionNode } from "graphql";

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

// @note Convenience type
export type SelectionSet = Array<Field<any, any, any>>;

// @note a "branded" type to enforce compile-time types
export type Field<
  Name extends string | symbol | number,
  Type = unknown,
  Selections extends SelectionSet = never
> = Type & { name: Name; node: SelectionNode; selections?: Selections };

// @note Convert an array of Fields (i.e a SelectionSet) to an interface type
export type Result<
  // Selection extends Array<any>
  Selection extends Array<Field<any, any, any>>
> = {
  [Key in Selection[number]["name"]]: Selection[number] extends infer U
    ? U extends Field<Key, infer V, infer P>
      ? V extends boolean // why ?
        ? boolean
        : V extends Primitive
        ? V
        : Result<P>
      : never
    : never;
};

// @todo Support optional `variables` (ideally we would pull these from the static `Field` type?)
export type Selector<Type extends Record<string, any>> = {
  [K in keyof Type]: Type[K] extends Record<string, any> // Interface types get converted to builder functions that take a selector callback to select fields on the record
    ? <T>(build: (select: Selector<Type[K]>) => T) => Field<K, T>
    : // Interface scalar fields get converted to simple selector functions
      () => Field<K, Type[K]>;
};
