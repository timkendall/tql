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
} from "./AST";

interface Query {
  character: Character;
}

interface Character {
  __typename: string;
  id: string;
  name: string;
}

interface Hero extends Character {
  __typename: "Hero";
  heroics: string[];
}

interface Villian extends Character {
  __typename: "Villian";
  villany: number[];
}

type fragmentedSelection = SelectionSet<
  [
    Field<
      "character",
      never,
      // @question how do map this to
      SelectionSet<
        [
          Field<"__typename">,
          Field<"id">,
          Field<"name">,

          InlineFragment<
            NamedType<"Hero", Hero>,
            SelectionSet<[Field<"__typename">, Field<"heroics">]>
          >,

          InlineFragment<
            NamedType<"Villian", Villian>,
            SelectionSet<[Field<"__typename">, Field<"villany">]>
          >
        ]
      >
    >
  ]
>;

type TResult = Result<Query, fragmentedSelection>;

const isHero = (object: Record<string, any>): object is Partial<Hero> => {
  return object.__typename === "Hero";
};

const isVillian = (object: Record<string, any>): object is Partial<Villian> => {
  return object.__typename === "Villian";
};

// const result = {} as TResult;

// // common fields
// result.character.id;
// result.character.name;
// result.character.__typename;

// // type-guards
// if (isHero(result.character)) {
//   result.character.__typename;
//   result.character.heroics;
// }

// if (isVillian(result.character)) {
//   result.character.__typename;
//   result.character.villany;
// }

// For each `Selection` in `SelectionSet<infer Selections>`
// A. Map to scalar field if Selection is Field<any, never>
// B. Map to object field if Selection is Field<any, SelectionSet<any>
// C. Breakout to union object if Selection is InlineFragment<any, SelectionSet<any>>
// How do we do the last one?

type FilterFragments<
  T extends Array<Field<any, any, any> | InlineFragment<any, any>>
> = Array<
  T[number] extends infer U
    ? U extends Field<any, any, any>
      ? T[number]
      : never
    : never
>;

// @note sorta does what we want...
export type Result<
  Type,
  TSelectionSet extends SelectionSet<Array<Selection>> // @todo take an `Operation` type instead (for correctness)
> = Type extends Array<infer T>
  ? T extends Primitive
    ? // @note Return scalar array
      Array<T>
    : // @note Wrap complex object in array
      Array<Result<T, TSelectionSet>>
  : {
      // @note Build out object from non-fragment field selections
      [Key in FilterFragments<
        TSelectionSet["selections"]
      >[number]["name"]]: Type[Key] extends Primitive
        ? Type[Key]
        : TSelectionSet["selections"][number] extends infer U
        ? U extends Field<Key, any, infer Selections>
          ? Result<Type[Key], Selections>
          : never
        : never;
      // @note Should result in ({common} & {specific1}) | ({common} & {specific2})?
    } &
      (TSelectionSet["selections"][number] extends infer U
        ? U extends InlineFragment<infer TypeCondition, infer SelectionSet>
          ? TypeCondition extends NamedType<any, infer Type>
            ? Result<Type, SelectionSet>
            : {}
          : {}
        : {}); // @note need to use empty objects to not nuke the left side of our intersection type (&)

export class Operation<TSelectionSet extends SelectionSet<any>> {
  constructor(
    public readonly name: string,
    // @todo support `mutation` and `subscription` operations
    public readonly operation: "query",
    // public readonly directives: Directive[]
    // public readonly variableDefinitions: Variable[]
    public readonly selectionSet: TSelectionSet
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

export class SelectionSet<T extends Array<Selection>> {
  constructor(public readonly selections: T) {}

  get ast(): SelectionSetNode {
    return selectionSetOf(this.selections.map((s) => s.ast));
  }
}

export type Selection = Field<any, any, any> | InlineFragment<any, any>;

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
      typeCondition: this.typeCondition.ast,
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
      args: this.args?.map((arg) => arg.ast),
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
