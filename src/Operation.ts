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
  character: Character
}

interface Character {
  id: string
  name: string
}

interface Hero extends Character {
  heroics: string[]
}

interface Villian extends Character {
  villany: string[]
}

type fragmentedSelection = [
  Field<
  'character',
  never,
  SelectionSet<[
    Field<'id'>,
    Field<'name'>,

    // InlineFragment<
    //   NamedType<'Hero'>, 
    //   [
    //     Field<'heroics'>
    //   ]>,
    
    // InlineFragment<
    //   NamedType<'Villian'>, 
    //   [
    //     Field<'villany'>
    //   ]>,
  ]>>
]



// type
// type ResultField
// type ResultInlineFragment



type ResultSelectionSet<Type, Selections extends Array<Selection>> = Selections[number] extends infer U 
? U extends Field<any, any, any>
  ? never // @todo parse Field<>
  : U extends InlineFragment<any, any>
    ? never // @todo parse InlineFrgament<>
  : never
: never

type inlineFragmentTest = ResultInlineFragment<Hero, InlineFragment<NamedType<'Hero'>, [Field<'heroics'>]>>

type ResultInlineFragment<Type, T extends InlineFragment<any, any>> = 
  T extends InlineFragment<any /* @todo Type */, infer SelectionSet>
  ? never
  : never


type result = Result<Query, SelectionSet<fragmentedSelection>>


export type Result<
 // @note Has to be object or array! (right?)  
  Type,
  // @todo Use more correct `SelectionSet<Array<Selection>>` type (will require some unnesting)
  // @todo First pass, use `Array<Selection>`
  Z extends SelectionSet<any>
> = Type extends Array<infer T>
  ? T extends Primitive
    ? // @note Return scalar array
      Array<T>
    : // @note Wrap complex object in array
      Array<Result<T, Z>>
  : {
      // @note Build out complex object
      [Key in Z['selections'][number]['name']]: Type[Key] extends Primitive
        ? Type[Key]
        : Z['selections'][number] extends infer U
        ? U extends Field<Key, any, infer Selections>
          ? Result<Type[Key], Selections>
          : never
        : never;
    };

export class Operation<T extends Array<Field<any, any, any>>> {
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

export class SelectionSet<T extends Array<Field<any,any,any>>> {
  constructor(public readonly selections: T) {}

  get ast(): SelectionSetNode {
    return selectionSetOf(this.selections.map((s) => s.ast));
  }
}

export type Selection = Field<any, any, any> | InlineFragment<any, any>

export class InlineFragment<
 TypeCondition extends Type,
 SelectionSet extends Selection[] // @todo use our `SelectionSet` class (to support enitre `Selection` union)
> {
  constructor(
    public readonly typeCondition: TypeCondition,
    public readonly selectionSet: SelectionSet,
  ) {}

  get ast(): InlineFragmentNode {
    return inlineFragmentOf({
      typeCondition: this.typeCondition.ast,
      selectionSet: selectionSetOf(this.selectionSet.map((s) => s.ast)),
    })
  }
}

export class Field<
  Name extends string,
  Arguments extends Argument<string, any>[] | never = never,
  Z extends SelectionSet<any> | never = never // @todo use our `SelectionSet` class (to support enitre `Selection` union)
> {
  constructor(
    public readonly name: Name,
    public readonly args?: Arguments,
    public readonly selectionSet?: Z
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
