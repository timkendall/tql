import { ISelector } from "./Selector";

// export const operation = <S extends ISelector<any>>(
//   type: "query" | "mutation" | "subscription",
//   selector: S
// ) => <T extends Array<Selection>>(
//   name: string,
//   select: (t: S) => T
// ): Operation<SelectionSet<T>> =>
//   new Operation(name, type, new SelectionSet(select(selector)));

// ```
// // or new Query({ ... })
// const operation = query({
//   name: 'Example',
//   variables: {
//     id: t.string,
//   },
//   selection: (t, v) => [
//     t.user({ id: v.id }, t => [
//       t.id,
//       t.name,
//       t.friends(t => [
//         t.id,
//         t.firstName,
//       ])
//     ])
//   ]
//   extensions: []
// })
// ```

export interface QueryConfig<TQuery> {
  name?: string;
  variables?: Record<string, unknown /* @todo */>;
  selection: ISelector<TQuery>;
  // extensions?: Array<Extension>
}

export class Query<Q> {
  // ast?: DocumentNode or OperationDefinitionNode

  constructor(config: QueryConfig<Q>) {}

  // toString()
}
