import { TypedDocumentNode } from "@graphql-typed-document-node/core"; // only needed before graphql < 16
import { Concat } from "typescript-tuple";

import {
  Primitive,
  SelectionSet,
  Selection,
  Field,
  Variable,
  Operation,
} from "./Operation";
import { ISelector, selector } from "./Selector";

interface User {
  id: string;
  friends(limit: number): User[];
}

interface Food {
  id: string;
  avgCals(timeframe: string): number;
}

interface Query {
  viewer: User;
  hello(name: bigint, pronoun?: string): string;
  user(id: string): User;
  foods(limit?: number, after?: string): Food[]; // @todo Array<infer T>
}

type ResolverArgs<T> = T extends (...args: any[]) => any ? Parameters<T> : [];

export type Experimental<T> = {
  [F in keyof T]: T[F] extends infer U
    ? U extends (...args: infer Vars) => infer Type // parameterized fields
      ? Type extends Primitive
        ? (
            ...args: Vars
          ) => Field<F extends string ? F : never /*, @todo add arguments */> // dumb
        : <S extends Array<Selection>>(
            ...args: Concat<Vars, [select: (selector: Experimental<Type>) => S]> // @todo add variables
          ) => // select: (selector: Experimental<Type>) => S
          Field<
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
Query.viewer((t) => [t.id()]);
Query.hello(BigInt(""), "Mr.");
Query.user("name", (t) => [t.id()]);
Query.foods(undefined, undefined, (t) => []);

// // examples: $('id'), $('id!')
// export const $ = (literals: TemplateStringsArray, ...placeholders: string[]) => {
//   return new Variable<typeof literals[0]>(literals[0])
// }

export const $ = <T extends string>(name: T) => {
  return new Variable(name);
};

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
