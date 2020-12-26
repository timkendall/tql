import fetch from "node-fetch";
import { ExecutionResult } from "graphql";

import { SelectionSet, Operation, Result } from "./Operation";

// @todo Make typesafe
export class Client<Query, Mutation = never, Subscription = never> {
  constructor(
    protected readonly executor: Executor,
    public readonly query: any,
    public readonly mutate?: any,
    public readonly subscribe?: any
  ) {}
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
  execute<RootType, TOperation extends Operation<SelectionSet<any>>>(
    operation: TOperation
  ): Promise<ExecutionResult<Result<RootType, TOperation["selectionSet"]>>>;
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
