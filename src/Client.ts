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

export class ExecutionError extends Error {
  public readonly name: string;
  public readonly result?: ExecutionResult;
  public readonly transportError?: Error;

  constructor({
    name,
    result,
    transportError,
  }: {
    readonly name: string;
    readonly result?: ExecutionResult;
    readonly transportError?: Error;
  }) {
    super(
      `Failed to execute operation on "${name}". See "ExecutionError.what" for more details.`
    );

    this.result = result;
    this.transportError = transportError;
  }

  get what() {
    return this.transportError ?? this.result;
  }
}
