import { print } from "graphql";

import {
  Field,
  Result,
  SelectionSet,
  operationOf,
  selectionSetOf,
} from "./AST";

// @notw Root-level selector function
const $select = <T extends Array<Field<any, any, any>>>(
  select: (t: typeof Query) => T
) => {
  // todo
  const selection = select(Query);

  const nodes = selection.map((s) => s.ast);

  return {
    selection,
    toString() {
      const operation = operationOf(
        "query",
        "Example",
        [],
        selectionSetOf(nodes)
      );

      return print(operation);
    },
  };
};

const Query = {
  viewer: <T extends Array<Field<"id" | "age" | "account", any, any>>>(
    select: (t: typeof User) => T
  ) => new Field("viewer", [], select(User)),
};

const User = {
  id: () => new Field<"id", [], string>("id"),
  age: () => new Field<"age", [], number>("age"),
  account: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Account) => T
  ) => new Field("account", [], select(Account)),
};

const Account = {
  id: () => new Field<"id", [], string>("id"),
  balance: () => new Field<"balance", [], number>("balance"),
};

const fragment = [
  User.id(),
  User.age() /*new Field<'shit',[], string>('shit')*/,
];

const query = $select((t) => [
  t.viewer((t) => [t.id(), t.age(), t.account((t) => [t.balance()])]),
]);

// unsafe!
type R = Result<typeof query.selection>;
const bingo = {} as R;

bingo.viewer.id;
bingo.viewer.age;
bingo.viewer.account.balance;

console.log(query.toString());
