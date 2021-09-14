import {
  Operation,
  SelectionSet,
  Selection,
  Field,
  Argument,
  Variable,
  Primitive,
} from "../Operation";
import { Result, VariablesOf, DeepFlatten } from "../Result";
import { query } from "../Query";
import { Simplify, LiteralUnion, UnionToIntersection } from "type-fest";

describe("query", () => {
  it("derives variables", () => {
    // interface Query {
    //   hello: string
    //   viewer: {
    //     id: string,
    //     friends: { name: string }[]
    //   }
    // }

    interface Query {
      hello(variables: { name: bigint; pronoun?: string }): string;

      viewer(): {
        id(): string;
        name(): string;
        friends(variables: {
          limit: number;
        }): {
          name(): string;
          weight(variables: { unit: string }): number;
        }[];
      };

      user(variables: {
        id: string;
      }): {
        name(): string;
      };

      foods(variables: {
        limit?: number;
        after?: string;
      }): {
        id(): string;
        avgCals(variables: { timeframe: string }): number;
      };
    }

    type QS = ISmartSelector<Query>;

    const a = new Operation(
      "foo",
      "query",
      new SelectionSet([
        new Field("hello", [
          new Argument("name", new Variable("spicyUserName")),
          new Argument("pronoun", new Variable("helloPronoun")),
        ]),

        // new Field('viewer', [], new SelectionSet([
        //   new Field('id'),
        //   new Field('friends', [ new Argument('limit', new Variable('friendsLimit') ) ], new SelectionSet([
        //     new Field('name'),
        //     new Field('weight', [ new Argument('units', new Variable('weightUnits') )])
        //   ]))
        // ])),

        // new Field('foods', [ new Argument('limit', 3), new Argument('after', new Variable('foodsCursor')) ], new SelectionSet([
        //   new Field('id'),
        //   new Field('avgCals', [ new Argument('timeframe', new Variable('avgCalsTime') )])
        // ]))
      ])
    );

    // Variables<typeof a['selectionSet']>
    // Expected: { spicyUserName: bigint, friendsLimit: number }

    //const a: Operation<SelectionSet<Field<"hello", Argument<"name", Variable<"name">>[], any>[]>>
    // type R = Result<Query, typeof a['selectionSet']> @todo need to update Result to support new Type format

    type V = VariablesOf<Query, typeof a["selectionSet"]>; //Simplify<DeepFlatten
    // "spicyUserName" | "miss" | "friendsLimit" | "foodsCursor" | "avgCalsTime"
    // Simplify<UnionToIntersection<

    // type SimpleV = Simplify<DeepFlatten<VariablesOf<Query,typeof a['selectionSet']>>>

    // const variables = {} as SimpleV
    // variables.spicyUserName
  });
});

type IFieldMap = Record<string, (...args: any[]) => IFieldMap | Primitive>;

type ParamsToArgs<T> = T extends (...args: any[]) => IFieldMap | Primitive
  ? Parameters<T>[0] extends object
    ? {
        [Key in keyof Parameters<T>[0]]: Key extends string // narrowing index type..
          ? Parameters<T>[0][Key] | Variable<Key>
          : never;
      }
    : never // kinda dump but works
  : never;

type ISmartSelector<T> = {
  [F in keyof T]: T[F] extends (...args: any[]) => IFieldMap | Primitive
    ? ReturnType<T[F]> extends Primitive
      ? (variables?: ParamsToArgs<T[F]>) => Field<F extends string ? F : never>
      : ReturnType<T[F]> extends IFieldMap
      ? <S extends Array<Selection>>(
          arg0?:
            | ((selector: ISmartSelector<ReturnType<T[F]>>) => S)
            | ParamsToArgs<T[F]>
            | never,
          arg1?: ((selector: ISmartSelector<ReturnType<T[F]>>) => S) | never
        ) => Field<F extends string ? F : never, never, SelectionSet<S>>
      : never
    : T[F] extends Primitive
    ? () => Field<F extends string ? F : never>
    : never;
};
