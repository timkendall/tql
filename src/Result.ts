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

// @note `Result` takes a root `Type` (TS) and `SelectionSet` (GQL) and recursively walks the
// array of `Selection` nodes's (i.e `Field`, `InlineFragment`, or `FragmentSpread` nodes)
export type Result<
  Type,
  Selected extends SelectionSet<Array<Selection>>
> = Type extends Array<infer T> | ReadonlyArray<infer T>
  ? T extends Primitive
    ? // @note Return scalar array
      ReadonlyArray<T>
    : // @note Wrap complex object in array
      ReadonlyArray<Result<T, Selected>>
  : {
      readonly [Selection in Selected["selections"][number] as Selection extends Field<
        infer N,
        any,
        any
      >
        ? N
        : never]: Selection extends Field<infer Name, infer Args, infer Sel>
        ? Type[Selection["name"]["value"]] extends Primitive
          ? Type[Selection["name"]["value"]]
          : Sel extends SelectionSet<any>
          ? Result<Type[Selection["name"]["value"]], Sel>
          : never
        : never;
    };
