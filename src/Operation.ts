import {
  FieldNode,
  OperationDefinitionNode,
  SelectionSetNode,
  print,
  VariableDefinitionNode,
  VariableNode,
  ArgumentNode,
  NonNullTypeNode,
  ListTypeNode,
  NamedTypeNode,
  InlineFragmentNode,
} from "graphql";
import SHA256 from "jssha/dist/sha256";

import {
  argumentOf,
  namedTypeOf,
  variableOf,
  valueNodeOf,
  inlineFragmentOf,
  fieldOf,
  selectionSetOf,
  operationOf,
  variableDefinitionOf,
  listTypeOf,
  nonNullTypeOf,
  documentOf,
} from "./AST";

export class Operation<TSelectionSet extends SelectionSet<any>> {
  constructor(
    public readonly name: string,
    public readonly operation: "query" | "mutation" | "subscription",
    // public readonly directives: Directive[]
    // public readonly variableDefinitions: Variable[]
    public readonly selectionSet: TSelectionSet
  ) {}

  toString() {
    return print(this.ast);
  }

  toDocument() {
    return documentOf([this.ast]);
  }

  get sha256() {
    const sha = new SHA256("SHA-256", "TEXT", { encoding: "UTF8" });
    sha.update(this.toString());
    return sha.getHash("HEX");
  }

  get ast(): OperationDefinitionNode {
    return operationOf({
      operation: this.operation,
      name: this.name,
      selectionSet: this.selectionSet.ast,
      variables: [
        /* @todo */
      ],
      directives: [
        /* @todo */
      ],
    });
  }
}

export class SelectionSet<T extends Array<Selection>> {
  constructor(public readonly selections: T) {}

  get ast(): SelectionSetNode {
    return selectionSetOf(this.selections.map((s) => s.ast));
  }
}

export type Selection = Field<any, any, any> | InlineFragment<any, any>;

export type Fragment = InlineFragment<any, any>; /*| NamedFragment */

export class InlineFragment<
  TypeCondition extends Type,
  TSelectionSet extends SelectionSet<any>
> {
  constructor(
    public readonly typeCondition: TypeCondition,
    public readonly selectionSet: TSelectionSet
  ) {}

  get ast(): InlineFragmentNode {
    return inlineFragmentOf({
      typeCondition: getBaseType(this.typeCondition).ast,
      selectionSet: this.selectionSet.ast,
    });
  }
}

export class Field<
  Name extends string,
  Arguments extends Array<Argument<string, any>> | never = never,
  TSelectionSet extends SelectionSet<any> | never = never
> {
  constructor(
    public readonly name: Name,
    public readonly args?: Arguments,
    public readonly selectionSet?: TSelectionSet
  ) {}

  get ast(): FieldNode {
    return fieldOf({
      name: this.name,
      // @note Filter out args with `undefined` values so they are not included in the operation
      args: this.args
        ?.filter((arg) => Boolean(arg.value))
        .map((arg) => arg.ast),
      directives: [
        /* @todo */
      ],
      selectionSet: this.selectionSet?.ast,
    });
  }
}

export type Value = Variable<string> | Primitive;

export class Argument<Name extends string, Value = any> {
  constructor(
    public readonly name: Name,
    public readonly value?: Value,
    // @note Janky enum support
    public readonly _enum?: any
  ) {}

  get ast(): ArgumentNode {
    return argumentOf({
      name: this.name,
      value:
        this.value instanceof Variable
          ? this.value.ast
          : valueNodeOf(this.value, this._enum ? [this._enum] : undefined),
    });
  }
}

export class Variable<Name extends string> {
  constructor(public readonly name: Name) {}

  get ast(): VariableNode {
    return variableOf({ name: this.name });
  }
}

export class VariableDefinition<V extends Variable<string>, T extends Type> {
  constructor(public readonly variable: V, public readonly type: T) {}

  get ast(): VariableDefinitionNode {
    return variableDefinitionOf({
      variable: this.variable.ast,
      type: this.type.ast,
    });
  }
}

export type Type = NamedType<string, any> | ListType<any> | NonNullType<any>;

export function getBaseType(type: Type): NamedType<any, any> {
  if (type instanceof NonNullType) {
    return getBaseType(type.type);
  } else if (type instanceof ListType) {
    return getBaseType(type.type);
  } else {
    return type;
  }
}

/**
 * Utility type for parsing the base type from a `Type`
 *
 * Example:
 * type User = NamedType<'User', { id: string}>
 *
 * type A = BaseType<User>
 * type B = BaseType<ListType<User>>
 * type C = BaseType<NonNullType<User>>
 * type D = BaseType<NonNullType<ListType<User>>>
 * type E = BaseType<NonNullType<ListType<NonNullType<User>>>>
 */
export type BaseType<T extends Type> = T extends NamedType<string, infer Type>
  ? Type
  : T extends NonNullType<infer Type>
  ? BaseType<Type>
  : T extends ListType<infer Type>
  ? BaseType<Type>
  : never;

export class NonNullType<Type extends NamedType<string, any> | ListType<any>> {
  constructor(public readonly type: Type) {}

  get ast(): NonNullTypeNode {
    return nonNullTypeOf({ type: this.type.ast });
  }
}

export class ListType<Type extends NamedType<string, any> | NonNullType<any>> {
  constructor(public readonly type: Type) {}

  get ast(): ListTypeNode {
    return listTypeOf({ type: this.type.ast });
  }
}

export class NamedType<Name extends string, Type = unknown> {
  constructor(public readonly name: Name) {}

  get ast(): NamedTypeNode {
    return namedTypeOf({ name: this.name });
  }
}

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;
