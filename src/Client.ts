import fetch from "node-fetch";
import { ExecutionResult } from "graphql";

import { Field, SelectionSet, Operation, Result } from "./Operation";

export class Client {
  // @todo
}

export const execute = <T extends Array<Field<any, any, any>>>(
  endpoint: string,
  operation: Operation<T>
  /* @todo variables?: Variables */
): Promise<ExecutionResult<Result<T>>> =>
  fetch(endpoint, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operationName: operation.name,
      // variables,
      query: operation.toString(),
    }),
  }).then((res) => res.json()) as Promise<ExecutionResult<Result<T>>>;

// @todo we lose out type-saftey going through this (need to fix the `Selector` type param)
//
// @note Hardcoded references work fine...
//
// const buildQuery = <T extends Array<Field<any, any, any>>>(
//   name: string,
//   select: (t: typeof Query) => T
// ): Operation<T> => {
//   return new Operation(name, 'query', new SelectionSet(select(Query)))
// };
//
export const makeBuildQuery = <U extends Selector>(root: U) => <
  T extends Array<Field<any, any, any>>
>(
  name: string,
  select: (t: Selector) => T
): Operation<T> => {
  return new Operation<T>(name, "query", new SelectionSet<T>(select(root)));
};

// type SelectorCallback<T extends Array<Field<any, any, any>>> =
//   (select: (t: Selector<T>) => T) => Field<any, any, any>
//   | (() => Field<any, any, any>)

// export interface Selector<T extends Array<Field<any, any, any>>> {
//   // [K: string]:
//   //   <T extends Array<Field<any, any, any>>>(select: (t: Selector) => T) => Field<any, any, any>
//   [field: string]: SelectorCallback<T>
// }

// export interface Selector<T extends Array<Field<any, any, any>>> {
//   [K: string]:
//     ((select: (t: Selector<T>) => T) => Field<any, any, any>) | (() => Field<any,any,any>)
// }

export interface Selector {
  [K: string]:
    | (() => Field<any, any, any>)
    | (<T extends Array<Field<any, any, any>>>(
        select: (t: Selector) => T
      ) => Field<any, any, any>);
}
