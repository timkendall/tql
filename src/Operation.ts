import {
  FieldNode,
  OperationDefinitionNode,
  SelectionSetNode,
  print,
  VariableDefinitionNode,
  VariableNode,
  ArgumentNode,
} from "graphql";

import {
  argumentOf,
  namedTypeOf,
  variableOf,
  valueNodeOf,
  fieldOf,
  selectionSetOf,
  operationOf,
  variableDefinitionOf,
  listTypeOf,
  nonNullTypeOf,
} from "./AST";

export type Result<Selection extends Array<Field<any, any, any, any>>> = {
  [Key in Selection[number]["name"]]: Selection[number] extends infer U
    ? U extends Field<Key, any, infer ValueOrSelection, infer Type>
      ? ValueOrSelection extends Primitive
        ? Type // derive nullable and array scalars here
        : ValueOrSelection extends Array<Field<any, any, any, any>>
        ? Type extends Array<any>
          ? Array<Result<ValueOrSelection>> | null
          : Result<ValueOrSelection> // Derive nullable and array objects here
        : never
      : never
    : never;
};

export class Operation<T extends Array<Field<any, any, any, any>>> {
  constructor(
    public readonly name: string,
    // @todo support `mutation` and `subscription` operations
    public readonly operation: "query",
    // public readonly directives: Directive[]
    // public readonly variableDefinitions: Variable[]
    public readonly selectionSet: SelectionSet<T>
  ) {}

  toString() {
    return print(this.ast);
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

// @todo a `Selection` is really a union of the following concrete types:
//  - Field
//  - Fragment
//  - InlineFragment

export class SelectionSet<T extends Array<Field<any, any, any>>> {
  constructor(public readonly selections: T) {}

  get ast(): SelectionSetNode {
    return selectionSetOf(this.selections.map((s) => s.ast));
  }
}

export class Field<
  Name extends string,
  Arguments extends Argument<string, any>[] | never = never,
  SelectionSetOrValue extends
    | Primitive
    | Field<any, any, any>[]
    | undefined = undefined,
  Type = unknown
> {
  constructor(
    public readonly name: Name,
    public readonly args?: Arguments,
    public readonly selectionSet?: SelectionSetOrValue
  ) {}

  get ast(): FieldNode {
    return fieldOf({
      name: this.name,
      args: this.args?.map((arg) => arg.ast),
      directives: [
        /* @todo */
      ],
      selectionSet: Array.isArray(this.selectionSet)
        ? selectionSetOf(
            (this.selectionSet as Array<Field<any, any, any>>).map((s) => s.ast)
          )
        : undefined,
    });
  }
}

export type Value = Variable<string> | Primitive;

export class Argument<Name extends string, Value = any> {
  constructor(
    public readonly name: Name,
    public readonly value: Value,
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

export class NonNullType<Type extends NamedType<string, any> | ListType<any>> {
  constructor(public readonly type: Type) {}

  get ast() {
    return nonNullTypeOf({ type: this.type.ast });
  }
}

export class ListType<Type extends NamedType<string, any>> {
  constructor(public readonly type: Type) {}

  get ast() {
    return listTypeOf({ type: this.type.ast });
  }
}

export class NamedType<Name extends string, Type = unknown> {
  constructor(public readonly name: Name) {}

  get ast() {
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
