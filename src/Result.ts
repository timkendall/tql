import type {
  Primitive,
  NamedType,
  SelectionSet,
  Selection,
  Field,
  InlineFragment,
  FragmentSpread,
} from "./AST";

type Fields<T extends ReadonlyArray<Selection>> = Array<
  T[number] extends infer U
    ? U extends Field<any, any, any>
      ? T[number]
      : never
    : never
>;

// SelectionSet<Selection<Field | InlineFragment | FragmentSpread>>
type NameOf<T extends Field<any, any, any>> = T extends Field<
  infer Name,
  any,
  any
>
  ? Name
  : never;

// @note `Result` takes a root `Type` (TS) and `SelectionSet` (GQL) and recursively walks the
// array of `Selection` nodes's (i.e `Field`, `InlineFragment`, or `FragmentSpread` nodes)
export type Result<
  Type,
  Selected extends SelectionSet<Array<Selection>>
> = NonNullable<Type> extends Array<infer T> | ReadonlyArray<infer T>
  ? T extends Primitive
    ? // @note Return scalar array
      null extends Type
      ? ReadonlyArray<T> | null
      : ReadonlyArray<T>
    : // @note Wrap complex object in array
    null extends Type
    ? ReadonlyArray<Result<T, Selected>> | null
    : ReadonlyArray<Result<T, Selected>>
  : {
      readonly [Selection in Selected["selections"][number] as Selection extends Field<
        infer N,
        any,
        any
      >
        ? N
        : never]: Selection extends Field<any, any, undefined>
        ? Type[NameOf<Selection>]
        : Selection extends Field<any, any, infer S>
        ? S extends SelectionSet<any>
          ? Result<Type[NameOf<Selection>], S>
          : never
        : never;
    };
