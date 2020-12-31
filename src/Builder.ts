import {
  Argument,
  Field,
  Selection,
  SelectionSet,
  Operation,
  Result,
} from "./Operation";

export interface IQuery {
  /*foo: number, bar: string, */ [field: string]: any;
}

// generic query function
export const query = <T extends Array<Selection>>(
  name: string,
  select: (t: typeof Selector) => T
): Operation<SelectionSet<T>> =>
  new Operation(name, "query", new SelectionSet(select(Selector)));

// () => Field<string, never, any>
// (variables: Record<string, any>) => Field<string, Argument<string, any>[], any>
// (select: (selector: ISelector) => Array<Selection>) => Field<string, never, SelectionSet<T>>
// (variables: Record<string, any>, select: (selector: ISelector) => Array<Selection>) => Field<string, Argument<string, any>[], SelectionSet<T>>

export const Selector: ISelector<any> = new Proxy(Object.create(null), {
  get(target, field) {
    return target.hasOwnProperty(field)
      ? (target as any)[field]
      : target._field(field as string); // @todo implement dynamic selector function
  },
});

export function field<F extends string>(): Field<F>;

export function field<F extends string, A extends Array<Argument<any, any>>>(
  variables: Record<string, any>
): Field<F, A>;

export function field<F extends string, S extends Array<Selection>>(
  select: (selector: ISelector<any>) => S
): Field<F, never, SelectionSet<S>>;

export function field<
  F extends string,
  A extends Array<Argument<any, any>> = never,
  S extends Array<Selection> = never
>(
  variables: Record<string, any>,
  select: (selector: ISelector<any>) => S
): Field<F, A, SelectionSet<S>>;

export function field(): Field<any, any, any> {
  // @todo implementation!
  return new Field<any, any, any>("todo");
}

type FieldFn = typeof field;

// @note a generic selector interface
export type ISelector<T> = {
  // @todo Can we infer `F` from `field`?
  [F in keyof T]: FieldFn;
};

// export interface ISelector {
//   // @todo Can we infer `F` from `field`?
//   // [field: string]: <
//   //   F extends string,
//   //   A extends Array<Argument<any,any>> = never,
//   // >() => Field<F, A, never>

//   [field: string]: FieldFn
// }

const foo = query("example", (t) => [
  t.foo(),
  t.bar(),
  // t.baz<'baz', Array<Selection>>(t => [
  //   t.id<'id'>()
  // ]),
]);

interface Tester {
  foo: string;
  bar: number;
  baz: {
    id: string;
  };
}

type genericR = Result<Tester, typeof foo["selectionSet"]>;
