import {
  Argument,
  Field,
  Selection,
  SelectionSet,
  Operation,
  Primitive,
} from "./Operation";

export const operation = <S extends ISelector<any>>(
  type: "query" | "mutation" | "subscription",
  selector: S
) => <T extends Array<Selection>>(
  name: string,
  select: (t: S) => T
): Operation<SelectionSet<T>> =>
  new Operation(name, type, new SelectionSet(select(selector)));

export const selector = <T>(): ISelector<T> =>
  new Proxy(Object.create(null), {
    get(target, field) /*: FieldFn*/ {
      return function fieldFn(...args: any[]) {
        if (args.length === 0) {
          return new Field<any, any, any>(field);
        } else if (typeof args[0] === "function") {
          return new Field<any, any, any>(
            field,
            undefined,
            new SelectionSet(args[0](selector()))
          );
        } else if (typeof args[0] === "object") {
          if (typeof args[1] === "function") {
            return new Field<any, any, any>(
              field,
              Object.entries(args[0]).map(
                ([name, value]) => new Argument(name, value)
              ),
              new SelectionSet(args[1](selector()))
            );
          } else {
            return new Field<any, any, any>(
              field,
              Object.entries(args[0]).map(
                ([name, value]) => new Argument(name, value)
              )
            );
          }
        }

        throw new Error(`Unable to derive field function from arguments.`);
      };
    },
  });

// @todo replace these with types ex. `type Field0<F extends string> = () => Field<F>`

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

export function field(...args: any[]): Field<any, any, any> {
  // @todo implementation!
  return new Field<any, any, any>("todo");
}

export type ISelector<T> = {
  // @todo use Paramaters<T> to support variables
  [F in keyof T]: T[F] extends Primitive
    ? (variables?: Record<string, any>) => Field<F extends string ? F : never>
    : <S extends Array<Selection>>(
        arg0: ((selector: ISelector<T[F]>) => S) | Record<string, any>,
        arg1?: ((selector: ISelector<T[F]>) => S) | never
      ) => Field<F extends string ? F : never, never, SelectionSet<S>>;
};
