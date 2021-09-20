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

export const nonNull = <Type extends NamedType<string, any> | ListType<any>>(
  type: Type
): NonNullType<Type> => ({
  kind: Kind.NON_NULL_TYPE,
  type,
});

export interface ListType<
  Type extends NamedType<string, any> | NonNullType<any>
> extends ListTypeNode {}

export interface NamedType<Name extends string, Type = unknown>
  extends NamedTypeNode {}

export const namedType = <Name extends string>(
  name: string
): NamedType<Name> => ({
  kind: Kind.NAMED_TYPE,
  name: { kind: Kind.NAME, value: name },
});

export type Type = NamedType<string, any> | ListType<any> | NonNullType<any>;

export interface Variable<Name extends string> extends VariableNode {
  name: { kind: "Name"; value: Name };
}

export const variable = <Name extends string>(name: Name): Variable<Name> => ({
  kind: "Variable",
  name: {
    kind: "Name",
    value: name,
  },
});

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

export const variableDefinition = <V extends Variable<string>, T extends Type>(
  variable: V,
  type: T
): VariableDefinition<V, T> => ({
  kind: "VariableDefinition",
  variable,
  type, // TypeNode =  NamedTypeNode | ListTypeNode | NonNullTypeNode;

  // @todo
  // defaultValue?: ValueNode;
  // readonly directives?: ReadonlyArray<DirectiveNode>;
});

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
  TypeCondition extends NamedType<string, any>,
  SS extends SelectionSet<Array<Selection>>
> extends InlineFragmentNode {}

export const inlineFragment = <
  TypeCondition extends NamedType<string, any>,
  SS extends SelectionSet<Array<Selection>>
>(
  typeCondition: TypeCondition,
  selectionSet: SS
): InlineFragment<TypeCondition, SS> => ({
  kind: Kind.INLINE_FRAGMENT,
  typeCondition,
  directives: [
    /* @todo*/
  ],
  selectionSet,
});

export type Selection = Field<any, any, any> | InlineFragment<any, any>;

export type Fragment = InlineFragment<any, any>; /*| NamedFragment */

// @todo
// readonly operation: OperationTypeNode;
// readonly name?: NameNode;
// readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
// readonly directives?: ReadonlyArray<DirectiveNode>;
// readonly selectionSet: SelectionSetNode;
export interface Operation<T extends SelectionSet<any>>
  extends OperationDefinitionNode {
  selectionSet: T;
}

export const operation = <T extends SelectionSet<any>>(
  selectionSet: T
): Operation<T> => ({
  kind: "OperationDefinition",
  name: undefined, // @todo
  operation: "query", // @todo
  variableDefinitions: [], // @todo
  directives: [], // @todo
  selectionSet,
});

export const document = (
  nodes: ReadonlyArray<DefinitionNode>
): DocumentNode => ({
  kind: Kind.DOCUMENT,
  definitions: nodes,
});

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
    if (value.kind && value.kind === "Variable") {
      return value;
    } else {
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
    }
  } else {
    throw new Error(`Unknown value type: ${value}`);
  }
};
