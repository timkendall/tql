import {
  Kind,
  NameNode,
  TypeNode,
  NamedTypeNode,
  ListTypeNode,
  NonNullTypeNode,
  ValueNode,
  VariableNode,
  ArgumentNode,
  DirectiveNode,
  SelectionNode,
  VariableDefinitionNode,
  SelectionSetNode,
  OperationTypeNode,
  OperationDefinitionNode,
  DefinitionNode,
  DocumentNode,
  FieldNode,
} from "graphql";

export const documentOf = (
  nodes: ReadonlyArray<DefinitionNode>
): DocumentNode => ({
  kind: Kind.DOCUMENT,
  definitions: nodes,
});

export const operationOf = ({
  operation,
  name,
  variables = [],
  directives = [],
  selectionSet,
}: {
  operation: OperationTypeNode;
  name: string;
  selectionSet: SelectionSetNode;
  variables?: ReadonlyArray<VariableDefinitionNode>;
  directives?: DirectiveNode[];
}): OperationDefinitionNode => ({
  kind: Kind.OPERATION_DEFINITION,
  operation,
  name: nameNodeOf(name),
  variableDefinitions: variables,
  selectionSet,
  directives,
});

export const selectionSetOf = (
  selections: SelectionNode[]
): SelectionSetNode => ({
  kind: Kind.SELECTION_SET,
  selections,
});

export const fieldOf = ({
  name,
  args = [],
  directives = [],
  selectionSet,
}: {
  name: string;
  args?: ArgumentNode[];
  directives?: DirectiveNode[];
  selectionSet?: SelectionSetNode;
}): FieldNode => ({
  kind: Kind.FIELD,
  name: nameNodeOf(name),
  arguments: args,
  directives,
  selectionSet,
});

export const argumentOf = ({
  name,
  value,
}: {
  name: string;
  value: ValueNode;
}): ArgumentNode => ({
  kind: Kind.ARGUMENT,
  name: nameNodeOf(name),
  value,
});

export const variableOf = ({ name }: { name: string }): VariableNode => ({
  kind: Kind.VARIABLE,
  name: nameNodeOf(name),
});

export const variableDefinitionOf = ({
  variable,
  type,
  directives = [],
  defaultValue,
}: {
  variable: VariableNode;
  type: TypeNode;
  defaultValue?: ValueNode;
  directives?: DirectiveNode[];
}): VariableDefinitionNode => ({
  kind: Kind.VARIABLE_DEFINITION,
  variable,
  type,
  defaultValue,
  directives,
});

export const nonNullTypeOf = ({
  type,
}: {
  type: NamedTypeNode | ListTypeNode;
}): NonNullTypeNode => ({
  kind: Kind.NON_NULL_TYPE,
  type,
});

export const listTypeOf = ({ type }: { type: TypeNode }): ListTypeNode => ({
  kind: Kind.LIST_TYPE,
  type,
});

export const namedTypeOf = ({ name }: { name: string }): NamedTypeNode => ({
  kind: Kind.NAMED_TYPE,
  name: nameNodeOf(name),
});

export const nameNodeOf = (name: string): NameNode => ({
  kind: Kind.NAME,
  value: name,
});

export const valueNodeOf = (value: any, enums: any[] = []): ValueNode => {
  if (typeof value === "string") {
    if (enums.some((e) => Object.values(e).includes(value)))
      return { kind: Kind.ENUM, value: value };
    return { kind: Kind.STRING, value: value };
  } else if (Number.isInteger(value)) {
    return { kind: Kind.INT, value: value };
  } else if (typeof value === "number") {
    return { kind: Kind.FLOAT, value: String(value) };
  } else if (typeof value === "boolean") {
    return { kind: Kind.BOOLEAN, value: value };
  } else if (value === null) {
    return { kind: Kind.NULL };
  } else if (Array.isArray(value)) {
    return {
      kind: Kind.LIST,
      values: value.map((v) => valueNodeOf(v, enums)),
    };
  } else if (typeof value === "object") {
    return {
      kind: Kind.OBJECT,
      fields: Object.entries(value)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
          const keyValNode = valueNodeOf(value, enums);
          return {
            kind: Kind.OBJECT_FIELD,
            name: nameNodeOf(key),
            value: keyValNode,
          };
        }),
    };
  } else {
    throw new Error(`Unknown value type: ${value}`);
  }
};
