import { print } from "graphql/language";
import type { GraphQLSchema, TypedQueryDocumentNode } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

import {
  Field,
  Fragment,
  Selection,
  SelectionSet,
  Argument,
  Primitive,
  Variable,
  field,
  FragmentDefinition,
  InlineFragment,
  fragmentDefinition,
  inlineFragment,
  NamedType,
  namedType,
  argument,
  selectionSet,
  operation,
  Operation,
  document,
} from "./AST";

import { Result } from "./Result";
import { Variables, buildVariableDefinitions } from "./Variables";

/*
  APIModel is a interface defining how a GraphQL API should
  be represented in TypeScript (wether written by hand or code-generated).
*/
export interface APIModel {
  [field: string]:
    | Primitive
    | APIModel
    | ((variables: Record<string, any>) => Primitive | APIModel);
}
/*
  `Selector<T>` is a utility type that derives a convineicne
  object used to build type-safe selections on a pre-defined API.

  Example API:

  interface User {
    id: string;
    friends(variables: { limit: number }): User[];
  }

  interface Food {
    id: string;
    avgCals(variables: { timeframe: string }): number;
  }

  interface Query {
    viewer: User;
    hello(variables: { name: bigint; pronoun?: string }): string;
    user(variables: { id: string }): User;
    foods(variables: { limit?: number; after?: string }): Food[]; // @todo Array<infer T>
  }
*/
type _Variables<T> = { [K in keyof T]: T[K] | Variable<any> };
// @todo how do we get a union of:
// Argument<'a', string | Variable<string>> |  Argument<'b', number | Variable<string>
// vs. Argument<'a' | 'b', string | number | Variables<string>>
// @todo support arrays
type Arguments<T extends _Variables<any>> = keyof T extends string
  ? Argument<keyof T, T[keyof T]>
  : never;

// Type extends Array<infer T> | ReadonlyArray<infer T>
// @todo add `on` inline fragment selectors for interface/unions

export type TypeMap = { [name: string]: { __typename: string } };

type Inner<T extends Array<any>> = T extends Array<infer U> ? U : never;
// @todo Pass an entire type-map so we can resolve abstract types?
// ex.Selectors<{ Query, Mutation User }>
export type Selector<T, Map extends TypeMap> = {
  [F in keyof T]: T[F] extends infer U
    ? U extends (variables: infer Vars) => infer Type // parameterized fields
      ? Type extends Primitive | Array<Primitive> | ReadonlyArray<Primitive>
        ? (
            variables: _Variables<Vars>
          ) => Field<
            F extends string ? F : never,
            Arguments<_Variables<Vars>>[]
          > // dumb
        : <S extends Array<Selection>>(
            variables: _Variables<Vars>,
            select: (
              selector: Selector<
                Type extends Array<infer Inner> ? NonNullable<Inner> : Type,
                Map
              >
            ) => S
          ) => Field<
            F extends string ? F : never,
            never /* @todo add arguments */,
            SelectionSet<S>
          >
      : U extends infer Type // non-paramaterized fields
      ? Type extends Primitive | Array<Primitive> | ReadonlyArray<Primitive>
        ? () => Field<F extends string ? F : never>
        : <S extends Array<Selection>>(
            select: (
              selector: Selector<
                Type extends Array<infer Inner> ? NonNullable<Inner> : Type,
                Map
              >
            ) => S
          ) => Field<F extends string ? F : never, never, SelectionSet<S>>
      : never
    : never;
} &
  // Example of statically rendered:
  // on: <T extends Array<Selection>, F extends "Human" | "Droid">(
  //   type: F,
  //   select: (
  //     t: F extends "Human"
  //       ? HumanSelector
  //       : F extends "Droid"
  //       ? DroidSelector
  //       : never
  //   ) => T
  // ) => InlineFragment<NamedType<F, any>, SelectionSet<T>>;
  //
  // @note Don't need to account for Array types since we unwrap those
  // in subsequent iterations and don't allow an Array root type to be
  // passed to this type.
  (T extends { __typename: string }
    ? {
        on: <
          S extends Array<Selection>,
          F extends T["__typename"] /* distributed */
        >(
          type: F,
          select: (selector: Selector<Map[F], Map>) => S
        ) => InlineFragment<NamedType<F>, SelectionSet<S>>;
      }
    : {});

/*
  `Selected` provides a convienciene runtime representation of
  a collection of `Selection`'s on some type.

  Example:
  const fields = user(t => [ t.id() ]) // Selected

  query(t => [
    t.viewer(t => [
      ...fields,
      // or
      fields.toFragment(),
      // or
      fields.toFragment('UserFragment'),
    ])
  ])
*/

type Element<T> = T extends Array<infer U> ? U : never;

export class Selected<U extends Array<Selection>> extends Array<Element<U>> {
  constructor(public readonly type: string, public readonly selections: U) {
    super(...((selections as unknown) as Element<U>[]) /* seems wrong*/);
  }

  toString() {
    return print(this.toSelectionSet());
  }

  toSelectionSet(): SelectionSet<U> {
    return selectionSet(this.selections);
  }

  // Name extends string
  // ? FragmentDefinition<
  //     Name,
  //     NamedType<this['type']>,
  //     SelectionSet<this['selections']>
  //   >
  // : InlineFragment<NamedType<this['type']>, SelectionSet<this['selections']>>
  toFragment<Name extends string | undefined>(name?: Name) {
    return name
      ? fragmentDefinition(
          name,
          namedType(this.type),
          selectionSet(this.selections)
        )
      : inlineFragment(namedType(this.type), selectionSet(this.selections));
  }
}
/*
 `selectable` is a utility function to build a dynamic selector 
  map at runtime using reflection.
*/
export const selectable = <T, M extends TypeMap>(): Selector<T, M> =>
  new Proxy(Object.create(null), {
    get(target, fieldName) /*: FieldFn*/ {
      return function fieldFn(...args: any[]) {
        if (args.length === 0) {
          return field<any, any, any>(fieldName, undefined, undefined);
        } else if (typeof args[0] === "function") {
          return field<any, any, any>(
            fieldName,
            undefined,
            selectionSet(args[0](selectable()))
          );
        } else if (typeof args[0] === "object") {
          if (typeof args[1] === "function") {
            return field<any, any, any>(
              fieldName,
              Object.entries(args[0]).map(([name, value]) =>
                argument(name, value)
              ),
              selectionSet(args[1](selectable()))
            );
          } else {
            return field<any, any, any>(
              fieldName,
              Object.entries(args[0]).map(([name, value]) =>
                argument(name, value)
              ),
              undefined
            );
          }
        }

        throw new Error(`Unable to derive field function from arguments.`);
      };
    },
  });

// @todo support  function selector<T extends Array<Selection>>(selection: T): Selected<T>

export interface ObjectType {
  [key: string]:
    | (Primitive | ObjectType)
    | ((variables: any) => Primitive | ObjectType);
}

export function buildSelector<T extends ObjectType, M extends TypeMap>(
  type: string
) {
  return function <U extends Array<Selection>>(
    select: (map: Selector<T, M>) => U
  ): Selected<U> {
    return new Selected(type, select(selectable<T, M>()));
  };
}

// in codegen selectors are statically defined with the appropriate `T` filled in for `Result` and `Variables`
// @todo do const { query, mutation, subscription } = `buildRootSelectors<Schema>(schema)`
export function buildRootSelector<T, M extends TypeMap>(
  op: "query" | "mutation" | "subscription",
  schema: GraphQLSchema
) {
  return function <U extends ReadonlyArray<Selection>>(
    select: (map: Selector<T, M>) => U
  ): Operation<typeof op, "", [], SelectionSet<U>> {
    const selection = selectionSet(select(selectable<T, M>()));

    const variableDefinitions = buildVariableDefinitions(op, schema, selection);

    const operationDefinition = operation(
      op,
      "",
      selection,
      variableDefinitions
    );

    return operationDefinition as Operation<typeof op, "", [], SelectionSet<U>>;

    // return {
    //   kind: "Document",
    //   definitions: [
    //     {
    //       ...operationDefinition,
    //       variableDefinitions,
    //     },
    //   ],
    // };
  };
}

export function buildRootDocumentSelector<T, M extends TypeMap>(
  op: "query" | "mutation" | "subscription",
  schema: GraphQLSchema
) {
  return function <U extends ReadonlyArray<Selection>>(
    select: (map: Selector<T, M>) => U
  ): TypedDocumentNode<
    Result<T, SelectionSet<U>>,
    Variables<T, SelectionSet<U>>
  > {
    const selection = selectionSet(select(selectable<T, M>()));

    const variableDefinitions = buildVariableDefinitions(op, schema, selection);

    const operationDefinition = operation(
      op,
      "",
      selection,
      variableDefinitions
    );

    return document([operationDefinition]) as TypedDocumentNode<
      Result<T, SelectionSet<U>>,
      Variables<T, SelectionSet<U>>
    >;
  };
}
