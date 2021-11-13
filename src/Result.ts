import { L, Test } from "ts-toolbelt";

import type {
  Primitive,
  NamedType,
  SelectionSet,
  Selection,
  Field,
  InlineFragment,
  FragmentSpread,
} from "./AST";

// @note `Result` takes a root `Type` (TS) and `SelectionSet` (GQL) and recursively walks the
// array of `Selection` nodes's (i.e `Field`, `InlineFragment`, or `FragmentSpread` nodes)
//
// @note We are essentially executing an operation at compile-type to derive the shape of the result.
// This means we need the following pieces of data available to our type:
//  Schema, FragmentDefinitions, Operations, Root Type*
export type Result<
  Schema extends Record<string, any>,
  Parent,
  Selected extends SelectionSet<ReadonlyArray<Selection>> | undefined
> =
  // Lists
  Parent extends Array<infer T>
    ? ReadonlyArray<Result<Schema, T, Selected>>
    : // Objects
    Parent extends Record<string, any>
    ? Selected extends SelectionSet<ReadonlyArray<Selection>>
      ? HasInlineFragment<Selected> extends Test.Pass
        ? // @todo merge Field selections into each fragment's selection
          SpreadFragments<Schema, Selected>
        : {
            readonly // @todo cleanup mapped typed field name mapping
            [F in Selected["selections"][number] as F extends Field<
              infer Name,
              any,
              any
            >
              ? Name
              : never]: F extends Field<infer Name, any, infer SS>
              ? Result<
                  Schema,
                  /* @note support parameterized fields */ Parent[Name] extends (
                    variables: any
                  ) => infer T
                    ? T
                    : Parent[Name] /*Parent[Name]*/,
                  SS
                >
              : never;
          }
      : never
    : // Scalars
      Parent;

export type SpreadFragments<
  Schema extends Record<string, any>,
  Selected extends SelectionSet<ReadonlyArray<Selection>>
> = Selected["selections"][number] extends infer Selection
  ? Selection extends InlineFragment<any, any>
    ? SpreadFragment<
        Schema,
        Selection,
        SelectionSet<L.Filter<Selected["selections"], InlineFragment<any, any>>> // @bug are we are losing inference here since `SelectionSet<[Field<'id'>]>` works?
      >
    : never
  : never;

export type SpreadFragment<
  Schema extends Record<string, any>,
  Fragment extends InlineFragment<any, any>,
  CommonSelection extends SelectionSet<ReadonlyArray<Field<any, any, any>>>
> = Fragment extends InlineFragment<
  NamedType<infer Typename>,
  infer SelectionSet
>
  ? Merge<
      { __typename: Typename }, // @todo figure out how to merge in the common selection
      Result<
        Schema,
        Schema[Typename],
        // @bug `CommonSelection` this should give us just the generic selection on the specific type
        MergeSelectionSets<SelectionSet, CommonSelection> // @todo OR merge the common selection into the fragments //MergeSelectionSets<SelectionSet, CommonSelection>
      >
    >
  : never;

export type MergeSelectionSets<
  A extends SelectionSet<ReadonlyArray<Selection>>,
  B extends SelectionSet<ReadonlyArray<Selection>>
> = SelectionSet<L.Concat<A["selections"], B["selections"]>>;

type HasInlineFragment<T extends SelectionSet<any> | undefined> =
  T extends SelectionSet<infer Selections>
    ? L.Includes<Selections, InlineFragment<any, any>>
    : never;

// SelectionSet<Selection<Field | InlineFragment | FragmentSpread>>
type NameOf<T extends Field<any, any, any>> = T extends Field<
  infer Name,
  any,
  any
>
  ? Name
  : never;

type SelectionOf<T extends Field<any, any, any>> = T extends Field<
  any,
  any,
  infer SelectionSet
>
  ? SelectionSet
  : never;

type Merge<M, N> = Omit<M, keyof N> & N;
