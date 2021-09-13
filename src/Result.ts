import {
  Primitive,
  NamedType,
  SelectionSet,
  Selection,
  Field,
  InlineFragment,
} from "./Operation";

type FilterFragments<
  T extends Array<Field<any, any, any> | InlineFragment<any, any>>
> = Array<
  T[number] extends infer U
    ? U extends Field<any, any, any>
      ? T[number]
      : never
    : never
>;

export type Result<
  Type,
  TSelectionSet extends SelectionSet<Array<Selection>>
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
      >[number]["name"]]: Type[Key] extends Primitive
        ? Type[Key]
        : TSelectionSet["selections"][number] extends infer U
        ? U extends Field<Key, any, infer Selections>
          ? null extends Type[Key]
            ? Result<NonNullable<Type[Key]>, Selections> | null
            : Result<Type[Key], Selections>
          : never
        : never;
    } &
      (TSelectionSet["selections"][number] extends infer U
        ? U extends InlineFragment<infer TypeCondition, infer SelectionSet>
          ? TypeCondition extends NamedType<string, infer Type>
            ? null extends Type
              ? Result<NonNullable<Type>, SelectionSet> | null
              : Result<Type, SelectionSet>
            : {}
          : {}
        : {}); // @note need to use empty objects to not nuke the left side of our intersection type (&)
