import { TypedDocumentNode } from "@graphql-typed-document-node/core"; // only needed before graphql < 16
import { Concat } from "typescript-tuple";

import {
  Primitive,
  SelectionSet,
  Selection,
  Field,
  Variable,
  Operation,
  Argument,
} from "./Operation";
import { ISelector, selector } from "./Selector";

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

type Variables<T> = { [K in keyof T]: T[K] | Variable<string> };
// @todo how do we get a union of:
// Argument<'a', string | Variable<string>> |  Argument<'b', number | Variable<string>
// vs. Argument<'a' | 'b', string | number | Variables<string>>
type Arguments<T extends Variables<any>> = keyof T extends string
  ? Argument<keyof T, T[keyof T]>
  : never;

export const $ = <T extends string>(name: T) => {
  return new Variable(name);
};
// // examples: $('id'), $('id!')
// export const $ = (literals: TemplateStringsArray, ...placeholders: string[]) => {
//   return new Variable<typeof literals[0]>(literals[0])
// }

export type Experimental<T> = {
  [F in keyof T]: T[F] extends infer U
    ? U extends (variables: infer Vars) => infer Type // parameterized fields
      ? Type extends Primitive
        ? (
            variables: Variables<Vars>
          ) => Field<F extends string ? F : never, Arguments<Variables<Vars>>[]> // dumb
        : <S extends Array<Selection>>(
            variables: Variables<Vars>,
            select: (selector: Experimental<Type>) => S
          ) => Field<
            F extends string ? F : never,
            never /* @todo add arguments */,
            SelectionSet<S>
          >
      : U extends infer Type // non-paramaterized fields
      ? Type extends Primitive
        ? () => Field<F extends string ? F : never>
        : <S extends Array<Selection>>(
            select: (selector: Experimental<Type>) => S
          ) => Field<F extends string ? F : never, never, SelectionSet<S>>
      : never
    : never;
};

type Test = Experimental<Query>;

const Query = {} as Test;
const selection = [
  Query.viewer((t) => [t.id()]),
  Query.hello({ name: BigInt(""), pronoun: "Mr." }),
  Query.user({ id: "name" }, (t) => [t.id()]),
  Query.foods({ limit: $("foodLimit") }, (t) => []),
];

// type MyVars = VariablesOf<Query, SelectionSet<typeof selection>>

// type VariableType<
//   Parent extends Record<any, any>,
//   Field extends string,
//   Arg extends string
// > = Parent[Field] extends (variables: any) => any
//   ? Parameters<Parent[Field]>[0] extends infer U // get the `variables`  arg
//     ? U extends Record<any, infer V>
//       ? U[Arg]
//       : never //Parameters<Parent[Field]>[0][Arg]
//     : never
//   : never;

// type MapReturnType<
//   Parent extends Record<any, any>,
//   Field extends string
// > = Parent[Field] extends (...args: any[]) => any
//   ? ReturnType<Parent[Field]>
//   : never;
// export type VariablesOf<
//   Type extends object /* type is really a map of resolvers w/inline variable defs */,
//   S extends SelectionSet<Array<Selection>>
// > = S["selections"][number] extends infer U
//   ? U extends Field<infer Key, Array<Argument<infer N, infer V>>, infer SS>
//     ? V extends Variable<infer VName>
//       ? {
//           [_ in VName]: VariableType<
//             Type,
//             Key,
//             VName
//           > /* @question why does this turn into a union? */;
//         }
//       : undefined extends SS
//       ? never
//       : VariablesOf<MapReturnType<Type, Key> /*Type*/, SS> // @todo recurse...
//     : never
//   : never;

export function query<T extends Array<Selection>>(
  selections: T
): Operation<SelectionSet<T>>;
export function query<T>(
  select: (selector: ISelector<T>) => Array<Selection>
): Operation<SelectionSet<Array<Selection>>> {
  if (Array.isArray(arguments[0])) {
    return new Operation("", "query", new SelectionSet(arguments[0]));
  } else {
    return new Operation("", "query", new SelectionSet(select(selector())));
  }
}

// query<T, S extends Array<Selection>>(select: (selector: T) => S): TypeDocumentNode<Result<S>, Variables<S>>
// { definitions: ReadonlyArray<ExecutableDefinitionNode> }
