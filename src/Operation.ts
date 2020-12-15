import {
  SelectionNode,
  Kind,
  OperationDefinitionNode,
  SelectionSetNode,
  print,
} from "graphql";

import {
  argumentOf,
  nameNodeOf,
  valueNodeOf,
  selectionOf,
  selectionSetOf,
  operationOf,
} from "./AST";

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

export class Operation<T extends Array<Field<any, any, any>>> {
  constructor(
    public readonly name: string,
    public readonly operation: "query", // @todo support `mutation` and `subscription`
    // public readonly directives: Directive[]
    // public readonly variableDefinitions: Variable[]
    public readonly selectionSet: SelectionSet<T>
  ) {}

  toString() {
    return print(this.ast);
  }

  get ast(): OperationDefinitionNode {
    return operationOf(
      this.operation,
      this.name,
      [
        /* @todo this.variables */
      ],
      this.selectionSet.ast,
      [
        /* @todo this.directives */
      ]
    );
  }
}

// type Selection = Field | Fragment | InlineFragment
// type Selection<Name extends string, Arguments extends Argument<string, any>[], Value = unknown> = Field<Name, Arguments, Value>

export class SelectionSet<T extends Array<Field<any, any, any>>> {
  constructor(
    public readonly selections: T // @todo support `Fragment` and `InlineFragment`
  ) {}

  get ast() {
    return selectionSetOf(this.selections.map((s) => s.ast));
  }
}

export class Field<
  Name extends string,
  Arguments extends Argument<string, any>[] | never = never,
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

class Argument<Name extends string, Value = unknown> {
  constructor(public readonly name: Name, public readonly value: Value) {}

  get ast() {
    return argumentOf({
      name: this.name,
      value: valueNodeOf(this.value),
    });
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
