import {
  Primitive,
  NamedType,
  SelectionSet,
  Selection,
  Field,
  InlineFragment,
} from "./AST";

type FilterFragments<T extends ReadonlyArray<any>> = Array<
  T[number] extends infer U
    ? U extends Field<any, any, any>
      ? T[number]
      : never
    : never
>;

type MapReturnType<
  Parent extends Record<any, any>,
  Field extends string
> = Parent[Field] extends (...args: any[]) => any
  ? ReturnType<Parent[Field]>
  : Parent[Field];

export type Result<
  Type,
  TSelectionSet extends SelectionSet<ReadonlyArray<Selection>>
> = Type extends Array<infer T> | ReadonlyArray<infer T>
  ? T extends Primitive
    ? // @note Return scalar array
      ReadonlyArray<T>
    : // @note Wrap complex object in array
      ReadonlyArray<Result<T, TSelectionSet>>
  : {
      readonly // @note Build out object from non-fragment field selections
      [Key in FilterFragments<
        TSelectionSet["selections"]
      >[number]["name"]["value"]]: Type[Key] extends Primitive
        ? MapReturnType<Type, Key>
        : TSelectionSet["selections"][number] extends infer U
        ? U extends Field<Key, any, infer Selections>
          ? null extends MapReturnType<Type, Key>
            ? Selections extends SelectionSet<any>
              ? Result<NonNullable<MapReturnType<Type, Key>>, Selections> | null
              : never
            : Selections extends SelectionSet<any>
            ? Result<MapReturnType<Type, Key>, Selections>
            : MapReturnType<Type, Key>
          : never
        : never;
    }; /*&
      (TSelectionSet["selections"][number] extends infer U
        ? U extends InlineFragment<infer TypeCondition, infer SelectionSet>
          ? TypeCondition extends NamedType<string, infer Type>
            ? null extends Type
              ? Result<NonNullable<Type>, SelectionSet> | null
              : Result<Type, SelectionSet>
            : {}
          : {}
        : {}); // @note need to use empty objects to not nuke the left side of our intersection type (&)*/
