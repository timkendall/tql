import {
  Primitive,
  NamedType,
  SelectionSet,
  Selection,
  Field,
  InlineFragment,
  Argument,
  Variable,
} from "./Operation";

import { Simplify, LiteralUnion, Merge } from "type-fest";
import { Exact, PickProperties } from "ts-essentials";

type FilterFragments<
  T extends Array<Field<any, any, any> | InlineFragment<any, any>>
> = Array<
  T[number] extends infer U
    ? U extends Field<any, any, any>
      ? T[number]
      : never
    : never
>;

//['value'] extends infer U ? U extends Variable<infer N> ? N : never : never /* @note disgusting but use the Variable name */
type VariableName<T extends Argument<any, any>> = T extends Argument<
  string,
  infer V
>
  ? V extends Variable<infer Name>
    ? Name
    : never
  : never;

// walk SelectionSet extracting variables
// Lookup type of variable/argument using Type map
// export type VariablesOf<
//   Type,
//   TSelectionSet extends SelectionSet<Array<Selection>>
// > = {
//   [Key in FilterFragments<
//     TSelectionSet["selections"]
//   >[number]["name"]]: TSelectionSet["selections"][number] extends infer U
//     ? U extends Field<Key, infer Args, infer SS>
//       ? {
//         [K in Args[number]['name'] as VariableName<Args[number]>]:
//             Args[number]['value'] extends infer U
//               ? U extends Variable<string>
//                 ? Type[Key] extends  ((...args: any[]) => Primitive)
//                   ? Parameters<Type[Key]>[0][K] // @todo infer
//                   : never
//                 : never
//               : never
//           } // @todo recurse into
//       : never
//     : never
// }

type ScalarResolver = (...args: any[]) => Primitive;
// type ComplexResolver =  (...args: any[]) => ResolverMap
// type ResolverMap = Record<string, ScalarResolver | ComplexResolver>
type ResolverMap = Record<string, (...args: any[]) => ResolverMap | Primitive>;

// //
type VariableType<
  Parent extends Record<any, any>,
  Field extends string,
  Arg extends string
> = Parent[Field] extends (variables: any) => any
  ? Parameters<Parent[Field]>[0] extends infer U // get the `variables`  arg
    ? U extends Record<any, infer V>
      ? U[Arg]
      : never //Parameters<Parent[Field]>[0][Arg]
    : never
  : never;

type MapReturnType<
  Parent extends Record<any, any>,
  Field extends string
> = Parent[Field] extends (...args: any[]) => any
  ? ReturnType<Parent[Field]>
  : never;

// @step1 Get all fields (1-level deep) that have arguments
export type VariablesOf<
  Type extends object /* type is really a map of resolvers w/inline variable defs */,
  S extends SelectionSet<Array<Selection>>
> = S["selections"][number] extends infer U
  ? U extends Field<infer Key, Array<Argument<infer N, infer V>>, infer SS>
    ? V extends Variable<infer VName>
      ? {
          [_ in VName]: VariableType<
            Type,
            Key,
            VName
          > /* @question why does this turn into a union? */;
        }
      : undefined extends SS
      ? never
      : VariablesOf<MapReturnType<Type, Key> /*Type*/, SS> // @todo recurse...
    : never
  : never;

// export type VariablesOf<
//   Type extends object /* type is really a map of resolvers w/inline variable defs */,
//   S extends SelectionSet<Array<Selection>>
// > = S['selections'][number] extends infer U
//     ? U extends Field<infer Key, infer Args, infer SS>
//       ? {
//           [A in Args[number]['name'] as VariableName<Args[number]>]: Args[number]['value'] extends infer U
//             ? U extends Variable<infer N>
//               ? VariableType<Type, Key, A>
//               : never
//             : never
//         }
//       : never
//     : never

//{ [K in VName]: VariableType<Type, Key, N> }

export type Result<
  Type,
  TSelectionSet extends SelectionSet<Array<Selection>>
> = Type extends Array<infer T> | ReadonlyArray<infer T>
  ? T extends Primitive
    ? // @note Return scalar array
      ReadonlyArray<T>
    : // @note Wrap complex object in array
      ReadonlyArray<Result<T, TSelectionSet>>
  : {
      readonly // @note Build out object from non-fragment field selections
      [Key in FilterFragments<
        TSelectionSet["selections"]
      >[number]["name"]]: Type[Key] extends Primitive
        ? Type[Key]
        : TSelectionSet["selections"][number] extends infer U
        ? U extends Field<Key, any, infer Selections>
          ? null extends Type[Key]
            ? Result<NonNullable<Type[Key]>, Selections> | null
            : Result<Type[Key], Selections>
          : never
        : never;
    } &
      (TSelectionSet["selections"][number] extends infer U
        ? U extends InlineFragment<infer TypeCondition, infer SelectionSet>
          ? TypeCondition extends NamedType<string, infer Type>
            ? null extends Type
              ? Result<NonNullable<Type>, SelectionSet> | null
              : Result<Type, SelectionSet>
            : {}
          : {}
        : {}); // @note need to use empty objects to not nuke the left side of our intersection type (&)

// https://flut1.medium.com/deep-flatten-typescript-types-with-finite-recursion-cb79233d93ca
// https://levelup.gitconnected.com/flattening-in-typescript-515d7bc0fe15
// https://stackoverflow.com/questions/51435783/pick-and-flatten-a-type-signature-in-typescript
// https://github.com/microsoft/TypeScript/issues/31192

type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K;
}[keyof T];

type ValuesOf<T> = T[keyof T];
type ObjectValuesOf<T extends Object> = Exclude<
  Exclude<Extract<ValuesOf<T>, object>, never>,
  Array<any>
>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type DFBase<T, Recursor> = Pick<T, NonObjectKeysOf<T>> &
  UnionToIntersection<Recursor>;

export type DeepFlatten<T> = T extends any
  ? DFBase<T, DF2<ObjectValuesOf<T>>>
  : never;
type DF2<T> = T extends any ? DFBase<T, DF3<ObjectValuesOf<T>>> : never;
type DF3<T> = T extends any ? DFBase<T, DF4<ObjectValuesOf<T>>> : never;
type DF4<T> = T extends any ? DFBase<T, DF5<ObjectValuesOf<T>>> : never;
type DF5<T> = T extends any ? DFBase<T, DF6<ObjectValuesOf<T>>> : never;
type DF6<T> = T extends any ? DFBase<T, DF7<ObjectValuesOf<T>>> : never;
type DF7<T> = T extends any ? DFBase<T, DF8<ObjectValuesOf<T>>> : never;
type DF8<T> = T extends any ? DFBase<T, DF9<ObjectValuesOf<T>>> : never;
type DF9<T> = T extends any ? DFBase<T, ObjectValuesOf<T>> : never;
