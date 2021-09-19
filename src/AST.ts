import {
  Kind,
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
  OperationDefinitionNode,
  DefinitionNode,
  DocumentNode,
  FieldNode,
  InlineFragmentNode,
} from "graphql/language";

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

export interface NonNullType<
  Type extends NamedType<string, any> | ListType<any>
> extends NonNullTypeNode {}

export interface ListType<
  Type extends NamedType<string, any> | NonNullType<any>
> extends ListTypeNode {}

export interface NamedType<Name extends string, Type = unknown>
  extends NamedTypeNode {}

export type Type = NamedType<string, any> | ListType<any> | NonNullType<any>;

export interface Variable<Name extends string> extends VariableNode {
  name: { kind: "Name"; value: Name };
}

export type Value = Variable<string> | Primitive;

export interface Argument<Name extends string, Value = any>
  extends ArgumentNode {}

export const argument = <Name extends string, Value = any>(
  name: Name,
  value: Value
): Argument<Name, Value> => ({
  kind: Kind.ARGUMENT,
  name: { kind: Kind.NAME, value: name },
  value: toValueNode(value),
});

export interface VariableDefinition<V extends Variable<string>, T extends Type>
  extends VariableDefinitionNode {}

export interface SelectionSet<T extends Array<Selection>>
  extends SelectionSetNode {
  selections: T;
}

export const selectionSet = <T extends Array<Selection>>(
  selections: T
): SelectionSet<T> => ({
  kind: Kind.SELECTION_SET,
  selections,
});

export interface Field<
  Name extends string,
  Arguments extends Array<Argument<string, any>> | never = never,
  SS extends SelectionSet<any> | never = never
> extends FieldNode {
  name: { kind: "Name"; value: Name };
}

export const field = <
  Name extends string,
  Arguments extends Array<Argument<string, any>> | never = never,
  SS extends SelectionSet<any> | never = never
>(
  name: Name,
  args?: Arguments,
  selectionSet?: SS
): Field<Name, Arguments, SS> => ({
  kind: "Field",
  name: { kind: "Name", value: name },
  directives: [],
  arguments: args,
  alias: undefined,
  selectionSet,
});

export interface InlineFragment<
  TypeCondition extends Type,
  TSelectionSet extends SelectionSet<any>
> extends InlineFragmentNode {}

export type Selection = Field<any, any, any> | InlineFragment<any, any>;

export type Fragment = InlineFragment<any, any>; /*| NamedFragment */

// @todo
// readonly operation: OperationTypeNode;
// readonly name?: NameNode;
// readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
// readonly directives?: ReadonlyArray<DirectiveNode>;
// readonly selectionSet: SelectionSetNode;
export interface Operation<TSelectionSet extends SelectionSet<any>>
  extends OperationDefinitionNode {}

// export const documentOf = (
//   nodes: ReadonlyArray<DefinitionNode>
// ): DocumentNode => ({
//   kind: Kind.DOCUMENT,
//   definitions: nodes,
// });

// export const operationOf = ({
//   operation,
//   name,
//   variables = [],
//   directives = [],
//   selectionSet,
// }: {
//   operation: OperationTypeNode;
//   name: string;
//   selectionSet: SelectionSetNode;
//   variables?: ReadonlyArray<VariableDefinitionNode>;
//   directives?: DirectiveNode[];
// }): OperationDefinitionNode => ({
//   kind: Kind.OPERATION_DEFINITION,
//   operation,
//   name: nameNodeOf(name),
//   variableDefinitions: variables,
//   selectionSet,
//   directives,
// });

// export const selectionSetOf = (
//   selections: SelectionNode[]
// ): SelectionSetNode => ({
//   kind: Kind.SELECTION_SET,
//   selections,
// });

// export const inlineFragmentOf = ({
//   typeCondition,
//   directives = [],
//   selectionSet,
// }: {
//   typeCondition: NamedTypeNode;
//   directives?: DirectiveNode[];
//   selectionSet: SelectionSetNode;
// }): InlineFragmentNode => ({
//   kind: Kind.INLINE_FRAGMENT,
//   typeCondition,
//   directives,
//   selectionSet,
// });

// export const fieldOf = ({
//   name,
//   args = [],
//   directives = [],
//   selectionSet,
// }: {
//   name: string;
//   args?: ArgumentNode[];
//   directives?: DirectiveNode[];
//   selectionSet?: SelectionSetNode;
// }): FieldNode => ({
//   kind: Kind.FIELD,
//   name: nameNodeOf(name),
//   arguments: args,
//   directives,
//   selectionSet,
// });

// export const argumentOf = ({
//   name,
//   value,
// }: {
//   name: string;
//   value: ValueNode;
// }): ArgumentNode => ({
//   kind: Kind.ARGUMENT,
//   name: nameNodeOf(name),
//   value,
// });

// export const variableOf = ({ name }: { name: string }): VariableNode => ({
//   kind: Kind.VARIABLE,
//   name: nameNodeOf(name),
// });

// export const variableDefinitionOf = ({
//   variable,
//   type,
//   directives = [],
//   defaultValue,
// }: {
//   variable: VariableNode;
//   type: TypeNode;
//   defaultValue?: ValueNode;
//   directives?: DirectiveNode[];
// }): VariableDefinitionNode => ({
//   kind: Kind.VARIABLE_DEFINITION,
//   variable,
//   type,
//   defaultValue,
//   directives,
// });

// export const nonNullTypeOf = ({
//   type,
// }: {
//   type: NamedTypeNode | ListTypeNode;
// }): NonNullTypeNode => ({
//   kind: Kind.NON_NULL_TYPE,
//   type,
// });

// export const listTypeOf = ({ type }: { type: TypeNode }): ListTypeNode => ({
//   kind: Kind.LIST_TYPE,
//   type,
// });

// export const namedTypeOf = ({ name }: { name: string }): NamedTypeNode => ({
//   kind: Kind.NAMED_TYPE,
//   name: nameNodeOf(name),
// });

// export const nameNodeOf = (name: string): NameNode => ({
//   kind: Kind.NAME,
//   value: name,
// });

export const toValueNode = (value: any, enums: any[] = []): ValueNode => {
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
  } else if (value === null || value === undefined) {
    return { kind: Kind.NULL };
  } else if (Array.isArray(value)) {
    return {
      kind: Kind.LIST,
      values: value.map((v) => toValueNode(v, enums)),
    };
  } else if (typeof value === "object") {
    return {
      kind: Kind.OBJECT,
      fields: Object.entries(value)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
          const keyValNode = toValueNode(value, enums);
          return {
            kind: Kind.OBJECT_FIELD,
            name: { kind: Kind.NAME, value: key },
            value: keyValNode,
          };
        }),
    };
  } else {
    throw new Error(`Unknown value type: ${value}`);
  }
};
