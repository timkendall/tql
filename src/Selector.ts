import {
  Field,
  SelectionSet,
  Selection,
  Argument,
  Primitive,
  Value,
} from "./Operation";

export type ISelector<T> = {
  // @todo use Paramaters<T> to support variables
  [F in keyof T]: T[F] extends Primitive
    ? (variables?: Record<string, any>) => Field<F extends string ? F : never>
    : <S extends Array<Selection>>(
        arg0?: ((selector: ISelector<T[F]>) => S) | Record<string, any> | never,
        arg1?: ((selector: ISelector<T[F]>) => S) | never
      ) => Field<F extends string ? F : never, never, SelectionSet<S>>;
};

export class Selector<T> {
  constructor(public readonly select: (t: ISelector<T>) => Array<Selection>) {}

  toSelectionSet() {
    return new SelectionSet(this.select(selector()));
  }
}

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
