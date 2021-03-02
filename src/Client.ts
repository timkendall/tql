import fetch from "node-fetch";
import { ExecutionResult } from "graphql";

import { SelectionSet, Operation, Result } from "./Operation";

export interface Client {
  readonly query: Record<string, unknown>;
  readonly mutate?: Record<string, unknown>;
  readonly subscribe?: Record<string, unknown>;
}

export class HTTPExecutor implements Executor {
  constructor(public readonly endpoint: string) {}

  execute<RootType, TOperation extends Operation<SelectionSet<any>>>(
    operation: TOperation
  ): Promise<ExecutionResult<Result<RootType, TOperation["selectionSet"]>>> {
    return execute<RootType, TOperation>(this.endpoint, operation);
  }
}

export interface Executor {
  execute<_A extends any, B extends Operation<SelectionSet<any>>>(
    operation: B
  ): unknown;
}

export const execute = <
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
