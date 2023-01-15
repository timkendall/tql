import type { GraphQLSchema } from "graphql/type";
import { OperationTypeNode, print } from "graphql/language";
// @note v16+ of graphql-js exposes their own version of a typed DocumentNode
// See https://github.com/dotansimha/graphql-typed-document-node/issues/68
//
// import type { TypedQueryDocumentNode } from "graphql/utilities";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

import type * as AST from "./AST";
import {
  fragmentDefinition,
  inlineFragment,
  namedType,
  selectionSet,
  operation,
  document,
} from "./AST";
import { Result } from "./Result";
import { Variables, buildVariableDefinitions } from "./Variables";

type Element<T> = T extends Array<infer U> ? U : never;

interface OperationOpts {
  queryName?: string;
  useVariables?: boolean;
  dropNullInputValues?: boolean;
}

export class Selection<
  Schema extends Record<string, any>,
  RootType extends string /* @todo keyof Schema*/,
  T extends ReadonlyArray<AST.Selection>
> extends Array<Element<T>> {
  constructor(
    public readonly schema: GraphQLSchema,
    public readonly type: RootType,
    public readonly selections: T
  ) {
    super(...(selections as unknown as Element<T>[]) /* seems wrong*/);
  }

  toSelectionSet(): AST.SelectionSet<T> {
    return selectionSet(this.selections);
  }

  toFragment<Name extends string>(
    name: Name
  ): AST.FragmentDefinition<
    Name,
    AST.NamedType<this["type"]>,
    AST.SelectionSet<this["selections"]>
  > {
    return fragmentDefinition(
      name,
      namedType(this.type),
      selectionSet(this.selections)
    );
  }

  toInlineFragment(): AST.InlineFragment<
    AST.NamedType<this["type"]>,
    AST.SelectionSet<this["selections"]>
  > {
    return inlineFragment(namedType(this.type), selectionSet(this.selections));
  }

  // toOperation? toDocument?
  toQuery(options?: OperationOpts): TypedDocumentNode<
    Result<Schema, Schema[RootType], AST.SelectionSet<T>>,
    Variables<Schema, Schema[RootType], AST.SelectionSet<T>>
  > {
    // @todo statically gate?
    if (
      this.type !== "Query" &&
      this.type !== "Mutation" &&
      this.type !== "Subscription"
    ) {
      throw new Error("Cannot convert non-root type to query.");
    }

    const op = this.type.toLowerCase() as OperationTypeNode;
    const selectionSet = this.toSelectionSet();
    const variableDefinitions = buildVariableDefinitions(
      this.schema,
      op,
      selectionSet
    );

    const operationDefinition = operation(
      op,
      options?.queryName ?? "Anonymous",
      selectionSet,
      variableDefinitions
    );

    return document([operationDefinition]) as TypedDocumentNode<
      Result<Schema, Schema[RootType], AST.SelectionSet<T>>,
      Variables<Schema, Schema[RootType], AST.SelectionSet<T>>
    >;
  }

  // @todo toRequest (converts to node-fetch API compatible `Request` object)

  toString(options?: OperationOpts) {
    return print(this.toQuery(options));
  }
}

export class TypeConditionError extends Error {
  constructor(metadata: { selectedType: string; abstractType: string }) {
    super(
      `"${metadata.selectedType}" is not a valid type of abstract "${metadata.abstractType}" type.`
    );
  }
}
