import { TypedQueryDocumentNode, print } from "graphql";
// import { IterableElement } from 'type-fest'

import {
  Field,
  Fragment,
  Selection,
  SelectionSet,
  Argument,
  Primitive,
  Variable,
  field,
  argument,
  selectionSet,
} from "./AST";

import { Result } from "./Result";
import { Variables as VariablesOf } from "./Variables";

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
  `SelectionMap<T>` is a utility type that derives a convineicne
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
type Variables<T> = { [K in keyof T]: T[K] | Variable<string> };
// @todo how do we get a union of:
// Argument<'a', string | Variable<string>> |  Argument<'b', number | Variable<string>
// vs. Argument<'a' | 'b', string | number | Variables<string>>
// @todo support arrays
type Arguments<T extends Variables<any>> = keyof T extends string
  ? Argument<keyof T, T[keyof T]>
  : never;
export type SelectionMap<T> = {
  [F in keyof T]: T[F] extends infer U
    ? U extends (variables: infer Vars) => infer Type // parameterized fields
      ? Type extends Primitive
        ? (
            variables: Variables<Vars>
          ) => Field<F extends string ? F : never, Arguments<Variables<Vars>>[]> // dumb
        : <S extends Array<Selection>>(
            variables: Variables<Vars>,
            select: (selector: SelectionMap<Type>) => S
          ) => Field<
            F extends string ? F : never,
            never /* @todo add arguments */,
            SelectionSet<S>
          >
      : U extends infer Type // non-paramaterized fields
      ? Type extends Primitive
        ? () => Field<F extends string ? F : never>
        : <S extends Array<Selection>>(
            select: (selector: SelectionMap<Type>) => S
          ) => Field<F extends string ? F : never, never, SelectionSet<S>>
      : never
    : never;
};
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
  constructor(public readonly selections: U) {
    super(selections as Element<U> /* seems wrong*/);
  }

  toString() {
    return print(selectionSet(this.selections));
  }

  toFragment(name?: string) {
    // @todo return InlineFragment or NamedFragment
    throw new Error("Not implemented.");
  }

  toDocument() {
    // @todo return object conforming to `TypeDocumentNode` interface
    throw new Error("Not implemented.");
  }
}
/*
 `selectable` is a utility function to build a dynamic selector 
  map at runtime using reflection.
*/
export const selectable = <T>(): SelectionMap<T> =>
  new Proxy(Object.create(null), {
    get(target, fieldName) /*: FieldFn*/ {
      return function fieldFn(...args: any[]) {
        if (args.length === 0) {
          return field<any, any, any>(fieldName);
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
              )
            );
          }
        }

        throw new Error(`Unable to derive field function from arguments.`);
      };
    },
  });

// @todo support  function selector<T extends Array<Selection>>(selection: T): Selected<T>

export function buildSelector<T>() {
  return function <U extends Array<Selection>>(
    select: (map: SelectionMap<T>) => U
  ): Selected<U> {
    return new Selected(select(selectable<T>()));
  };
}

export function buildRootSelector<T>(
  operation: "query" | "mutation" | "subscription"
) {
  return function <U extends Array<Selection>>(
    select: (map: SelectionMap<T>) => U
  ): TypedQueryDocumentNode<
    Result<T, SelectionSet<U>>,
    VariablesOf<T, SelectionSet<U>>
  > {
    // @todo documentOf(operationOf(...))
    return {
      kind: "Document",
      definitions: [
        {
          kind: "OperationDefinition",
          operation,
          variableDefinitions: [
            /* @todo `discoverVariables` */
          ],
          selectionSet: {
            kind: "SelectionSet",
            selections: [...select(selectable<T>())],
          },
        },
      ],
    };
  };
}
