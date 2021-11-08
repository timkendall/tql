import { Simplify } from "type-fest";
import { O, L, Test } from "ts-toolbelt";

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
// /*Merge<Type extends Record<string, any> ? { __typename: Type['__typename'] } : {},*/
//
// @note We are essentially executing an operation at compile-type to derive the shape of the result.
// This means we need the following pieces of data available to our type:
//  Schema, FragmentDefinitions, Operations, Root Type*
//
//
// Alternative implementation:
//  - Parent extends Primitive ? Parent
//  - Parent extends Array<infer T> ? Array<Result<_, T, _>>
//  - { [Field in Fields<SelectionSet>[n] as NameOf<Field>]: Result<Schema, Parent[NameOf<Field>], SelectionOf<Field>> & SpreadFragments<Schema, SelectionSet>}

export type Result<
  Schema extends Record<string, any>,
  Parent,
  Selected extends SelectionSet<ReadonlyArray<Selection>> | undefined
> = Parent extends Array<infer T>
  ? ReadonlyArray<Result<Schema, T, Selected>>
  : Parent extends Record<string, any>
  ? Selected extends SelectionSet<ReadonlyArray<Selection>>
    ? HasInlineFragment<Selected> extends Test.Pass
      ? {
          readonly // @todo cleanup mapped typed field name mapping
          [F in Selected["selections"][number] as F extends Field<
            infer Name,
            any,
            any
          >
            ? Name
            : never]: F extends Field<infer Name, any, infer SS>
            ? Result<Schema, Parent[Name], SS>
            : never;
        } & SpreadFragments<Schema, InlineFragments<Selected>>
      : {
          readonly // @todo cleanup mapped typed field name mapping
          [F in Selected["selections"][number] as F extends Field<
            infer Name,
            any,
            any
          >
            ? Name
            : never]: F extends Field<infer Name, any, infer SS>
            ? Result<Schema, Parent[Name], SS>
            : never;
        }
    : never
  : Parent;

export type SpreadFragment<
  Schema extends Record<string, any>,
  T extends InlineFragment<any, any>
> = T extends InlineFragment<NamedType<infer Typename>, infer SS>
  ? Merge<{ __typename: Typename }, Result<Schema, Schema[Typename], SS>>
  : never;

export type SpreadFragments<
  Schema extends Record<string, any>,
  Selected extends SelectionSet<ReadonlyArray<Selection>>
> = Selected["selections"][number] extends infer Selection
  ? Selection extends InlineFragment<any, any>
    ? SpreadFragment<Schema, Selection>
    : never
  : never;

type Fields<T extends ReadonlyArray<Selection>> = Array<
  T[number] extends infer U
    ? U extends Field<any, any, any>
      ? T[number]
      : never
    : never
>;

type InlineFragments<T extends SelectionSet<ReadonlyArray<Selection>>> =
  SelectionSet<
    ReadonlyArray<
      T["selections"][number] extends infer U
        ? U extends InlineFragment<any, any>
          ? T["selections"][number]
          : never
        : never
    >
  >;

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
