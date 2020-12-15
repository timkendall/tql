import {
  Kind,
  NameNode,
  ValueNode,
  ArgumentNode,
  DirectiveNode,
  SelectionNode,
  VariableDefinitionNode,
  SelectionSetNode,
  OperationTypeNode,
  OperationDefinitionNode,
  DefinitionNode,
  DocumentNode,
} from "graphql";

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

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

// type Selection = Field | Fragment | InlineFragment
// @todo Support union
// type Selection<Name extends string, Arguments extends Argument<string, any>[], Value = unknown> = Field<Name, Arguments, Value>

export type SelectionSet = Array<Field<any, any, any>>;

class Argument<Name extends string, Value = unknown> {
  constructor(public readonly name: Name, public readonly value: Value) {}

  get ast() {
    return argumentOf({
      name: this.name,
      value: valueNodeOf(this.value),
    });
  }
}

export class Field<
  Name extends string,
  Arguments extends Argument<string, any>[] | never = never,
  // @question, how do translate this do an object value for TypeScript?
  SelectionSetOrValue extends
    | Primitive
    | Field<any, any, any>[]
    | undefined = undefined
> {
  constructor(
    public readonly name: Name,
    public readonly args?: Arguments,
    public readonly selectionSet?: SelectionSetOrValue
  ) {}

  get ast(): SelectionNode {
    return {
      kind: Kind.FIELD, // @todo (`Fragment` and `InlineFragment`)
      name: nameNodeOf(this.name),
      // arguments: args, // @todo
      // directives, // @todo
      selectionSet: Array.isArray(this.selectionSet)
        ? selectionSetOf(
            (this.selectionSet as Array<Field<any, any, any>>).map((s) => s.ast)
          )
        : undefined,
    };
  }
}

export type Result<Selection extends Array<Field<any, any, any>>> = {
  [Key in Selection[number]["name"]]: Selection[number] extends infer U
    ? U extends Field<Key, infer Args, infer ValueOrSelection>
      ? ValueOrSelection extends Primitive
        ? ValueOrSelection
        : ValueOrSelection extends Array<Field<any, any, any>>
        ? Result<ValueOrSelection>
        : never
      : never
    : never;
};

export const selectionOf = (
  fieldName: string,
  args: ArgumentNode[] = [],
  directives: DirectiveNode[] = [],
  selectionSet?: SelectionSetNode
): SelectionNode => ({
  kind: Kind.FIELD, // @todo `Fragment` and `InlineFragment`
  name: nameNodeOf(fieldName),
  arguments: args,
  directives,
  selectionSet,
});

export const selectionSetOf = (
  selections: SelectionNode[]
): SelectionSetNode => ({
  kind: Kind.SELECTION_SET,
  selections,
});

export const operationOf = (
  operation: OperationTypeNode,
  name: string,
  variables: ReadonlyArray<VariableDefinitionNode>,
  selectionSet: SelectionSetNode,
  directives: DirectiveNode[] = []
): OperationDefinitionNode => ({
  kind: Kind.OPERATION_DEFINITION,
  operation,
  name: nameNodeOf(name),
  variableDefinitions: variables,
  selectionSet,
  directives,
});

export const documentOf = (
  nodes: ReadonlyArray<DefinitionNode>
): DocumentNode => ({
  kind: Kind.DOCUMENT,
  definitions: nodes,
});
