import fetch from "node-fetch";
import { ExecutionResult } from "graphql";

import { SelectionSet, Operation, Result } from "./Operation";

export interface Client {
  readonly query: Record<string, unknown>;
  readonly mutate?: Record<string, unknown>;
  readonly subscribe?: Record<string, unknown>;
}

export interface ExecutorConfig {
  uri: string;
  httpHeaders?: Record<string, string> | (() => Record<string, string>);
  fetch?: typeof fetch;
}

export class Executor {
  constructor(public readonly config: ExecutorConfig) {}

  execute<RootType, TOperation extends Operation<SelectionSet<any>>>(
    operation: TOperation
  ): Promise<ExecutionResult<Result<RootType, TOperation["selectionSet"]>>> {
    const _fetch = this.config.fetch ?? fetch;
    const headers =
      typeof this.config.httpHeaders === "function"
        ? this.config.httpHeaders()
        : this.config.httpHeaders;

    return _fetch(this.config.uri, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        operationName: operation.name,
        // variables,
        query: operation.toString(),
      }),
    }).then((res) => res.json()) as Promise<
      ExecutionResult<Result<RootType, TOperation["selectionSet"]>>
    >;
  }
}

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
