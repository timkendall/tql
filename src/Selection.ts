import type { GraphQLSchema } from "graphql/type";
import type { TypedQueryDocumentNode } from "graphql/utilities";
import { OperationTypeNode, print } from "graphql/language";

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

export class Selection<
  Schema extends Record<string, any>,
  RootType extends string /* @todo keyof Schema*/,
  T extends Array<AST.Selection>
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
  toQuery(options: {
    queryName?: string;
    useVariables?: boolean;
    dropNullInputValues?: boolean;
  }): TypedQueryDocumentNode<
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
      op,
      this.schema,
      selectionSet
    );

    const operationDefinition = operation(
      op,
      options.queryName ?? "Anonymous",
      selectionSet,
      variableDefinitions
    );

    return document([operationDefinition]) as TypedQueryDocumentNode<
      Result<Schema, Schema[RootType], AST.SelectionSet<T>>,
      Variables<Schema, Schema[RootType], AST.SelectionSet<T>>
    >;
  }

  // @todo toRequest (converts to node-fetch API compatible `Request` object)

  toString() {
    return print(this.toSelectionSet());
  }
}