import { Field, InlineFragment, NamedType, SelectionSet, Result } from "./src";

function isFoo(arg: string): arg is "Foo" {
  return arg === "Foo";
}

function isBar(arg: string): arg is "Bar" {
  return arg === "Bar";
}

// @note `interface` selector objects are a little spicy
const Interface = {
  // @note common fields return `Field` objects
  __typename: () => new Field("__typename"),
  id: () => new Field("id"),

  // @note concrete type fields are returned by special `on` methods which return `InlineFragment`s

  // @not Possible implementation (TypeScript still can't seem to figure out `type: 'Foo'` always returns a `InlineFragment<'Foo', T>`)
  on: <T extends Array<Field<any, any, any>>, F extends "Foo" | "Bar">(
    type: F,
    select: (t: F extends "Foo" ? typeof Foo : typeof Bar) => T
  ) /*:@question unneed? InlineFragment<NamedType<F>, T> */ => {
    if (isFoo(type)) {
      return new InlineFragment<NamedType<F>, SelectionSet<T>>(
        new NamedType("Foo") as NamedType<F>,
        new SelectionSet(select(Foo as any))
      );
    } else if (isBar(type)) {
      return new InlineFragment<NamedType<F>, SelectionSet<T>>(
        new NamedType("Bar") as NamedType<F>,
        new SelectionSet(select(Bar as any))
      );
    }
  },

  // @note Easiest implementation (worst DX); explicit methods for each type
  // onFoo: <T extends Array<Field<any, any, any>>>(
  //   select: (t: typeof Foo) => T
  // ) => {
  //   return new InlineFragment<NamedType<'Foo'>, T>({} as any, select(Foo))
  // },

  // onBar: <T extends Array<Field<any, any, any>>>(
  //   select: (t: typeof Bar) => T
  // ) => {
  //   return new InlineFragment<NamedType<'Bar'>, T>({} as any, select(Bar))
  // }
};

type onT = typeof Interface["on"];

const fooSelection = Interface.on("Foo", (t) => [t.id(), t.special()]);
const barSelection = Interface.on("Bar", (t) => [t.id(), t.unspecial()]);

type fooSelectionT = typeof fooSelection;
type barSelectionT = typeof barSelection;

const Foo = {
  // Common fields declared here too?
  __typename: () => new Field("__typename"),
  id: () => new Field("id"),

  // Unique fields as well
  special: () => new Field("special"),
};

const Bar = {
  // Common fields declared here too?
  __typename: () => new Field("__typename"),
  id: () => new Field("id"),

  // Unique fields as well
  unspecial: () => new Field("unspecial"),
};
