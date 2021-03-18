import fetch from "node-fetch";
import { ExecutionResult } from "graphql";

import { SelectionSet, Operation, Result } from "./Operation";

export interface Client {
  readonly query: Record<string, unknown>;
  readonly mutate?: Record<string, unknown>;
  readonly subscribe?: Record<string, unknown>;
}

export class Executor {
  constructor(public readonly endpoint: string) {}

  execute<RootType, TOperation extends Operation<SelectionSet<any>>>(
    operation: TOperation
  ): Promise<ExecutionResult<Result<RootType, TOperation["selectionSet"]>>> {
    return httpExecute<RootType, TOperation>(this.endpoint, operation);
  }
}

// @bug TypeScript 4.2+ error when implementing this interface with HTTPExecutor
// https://github.com/microsoft/TypeScript/issues/34933
// export interface Executor {
//   execute<RootType, TOperation extends Operation<SelectionSet<any>>>(
//     operation: TOperation
//   ): Promise<ExecutionResult<Result<RootType, TOperation["selectionSet"]>>>;
// }

export const httpExecute = <
  RootType,
  TOperation extends Operation<SelectionSet<any>>
>(
  endpoint: string,
  operation: TOperation
  /* @todo variables?: Variables */
): Promise<ExecutionResult<Result<RootType, TOperation["selectionSet"]>>> =>
  fetch(endpoint, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operationName: operation.name,
      // variables,
      query: operation.toString(),
    }),
  }).then((res) => res.json()) as Promise<
    ExecutionResult<Result<RootType, TOperation["selectionSet"]>>
  >;
