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
  FragmentSpreadNode,
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
> extends NonNullTypeNode {
  type: Type;
}

export const nonNull = <Type extends NamedType<string, any> | ListType<any>>(
  type: Type
): NonNullType<Type> => ({
  kind: Kind.NON_NULL_TYPE,
  type,
});

export interface ListType<
  Type extends NamedType<string, any> | NonNullType<any>
> extends ListTypeNode {
  type: Type;
}

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

export interface SelectionSet<T extends ReadonlyArray<Selection>>
  extends SelectionSetNode {
  selections: T;
}

export const selectionSet = <T extends ReadonlyArray<Selection>>(
  selections: T
): SelectionSet<T> => ({
  kind: Kind.SELECTION_SET,
  selections,
});

export interface Field<
  Name extends string,
  Arguments extends Array<Argument<string, any>> | undefined = undefined,
  SS extends SelectionSet<any> | undefined = undefined
> extends FieldNode {
  name: { kind: "Name"; value: Name };
  arguments?: Arguments;
  selectionSet?: SS;
}

export const field = <
  Name extends string,
  Arguments extends Array<Argument<string, any>> | undefined = undefined,
  SS extends SelectionSet<any> | undefined = undefined
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
  selectionSet: selectionSet,
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

export interface FragmentSpread<Name extends string>
  extends FragmentSpreadNode {
  readonly name: { kind: "Name"; value: Name };
  // readonly directives?: ReadonlyArray<DirectiveNode>;
}

export type Selection =
  | Field<any, any, any>
  | InlineFragment<any, any>
  | FragmentSpread<any>;

export type Fragment = InlineFragment<any, any>; /*| NamedFragment */

export interface Operation<
  Op extends "query" | "mutation" | "subscription",
  Name extends string,
  VariableDefinitions extends Array<VariableDefinition<any, any>> | never,
  SS extends SelectionSet<any>
> extends OperationDefinitionNode {
  operation: Op;
  name: { kind: "Name"; value: Name };
  variableDefinitions: VariableDefinitions;
  selectionSet: SS;

  withName<NewName extends string>(
    name: NewName
  ): Operation<Op, NewName, VariableDefinitions, SS>;
}

export const operation = <
  Op extends "query" | "mutation" | "subscription",
  Name extends string | never,
  VariableDefinitions extends Array<VariableDefinition<any, any>> | never,
  SS extends SelectionSet<any>
>(
  op: Op,
  name: Name,
  selectionSet: SS,
  variableDefinitions: VariableDefinitions
): Operation<Op, Name, VariableDefinitions, SS> => ({
  kind: "OperationDefinition",
  name: { kind: "Name", value: name },
  operation: op,
  variableDefinitions,
  selectionSet,
  directives: [
    /* @todo */
  ],

  withName<NewName extends string>(name: NewName) {
    return {
      ...this,
      name: { kind: "Name", value: name },
    };
  },
});

export type Definition = Operation<any, any, any, any>; // | Fragment

export interface Document<T extends ReadonlyArray<Definition>>
  extends DocumentNode {
  definitions: T;
}

export const document = <T extends ReadonlyArray<Definition>>(
  definitions: T
): DocumentNode => ({
  kind: Kind.DOCUMENT,
  definitions,
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
