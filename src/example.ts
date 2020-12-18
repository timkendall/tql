import {
  Argument,
  Value,
  Field,
  Operation,
  SelectionSet,
  Variable,
} from "./Operation";
import { execute } from "./Client";

// @note Hardcoded `Selector` objects matching a schema
// @todo Support dynamic creation with ex. `Selector<User>`?
// @todo Generate all of these from a static GraphQL schema!

const buildQuery = <T extends Array<Field<any, any, any>>>(
  name: string,
  select: (t: typeof Query) => T
): Operation<T> =>
  new Operation(name, "query", new SelectionSet(select(Query)));

interface IQuery {
  viewer: IUser;
  accounts: IAccount[];
}

interface IUser {
  id: string;
  age: number;
  account: IAccount;
}

interface IAccount {
  id: string;
  balance: number | null;
}

const Query = {
  // @Restrict `Field`'s to what exists on the `User` type!
  viewer: <T extends Array<Field<"id" | "age" | "account", any, any>>>(
    select: (t: typeof User) => T
  ) => new Field("viewer", [], select(User)),

  accounts: <T extends Array<Field<"id" | "balance", any, any>>>(
    variables: { id: Value },
    select: (t: typeof Account) => T
  ) =>
    new Field<"accounts", [Argument<"id">], T>(
      "accounts",
      [new Argument("id", variables.id)],
      select(Account)
    ),
};

const User = {
  id: () => new Field<"id">("id"),
  age: () => new Field<"age">("age"),
  account: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Account) => T
  ) => new Field("account", [], select(Account)),
};

const Account = {
  id: () => new Field<"id">("id"),
  balance: () => new Field<"balance">("balance"),
};

// @end todo

(async () => {
  // @note fragments for "free"!
  const fragment = [
    User.id(),
    User.age() /*new Field<'shit',[], string>('shit')*/,
    User.account((t) => [t.id()]),
  ];

  // const buildQuery = makeBuildQuery(Query)
  const query = buildQuery("Example", (t) => [
    t.viewer((t) => fragment),
    t.accounts({ id: new Variable("accountId") }, (t) => [t.balance()]),
  ]);

  console.log(query.toString());

  const { data, errors } = await execute<
    IQuery,
    typeof query.selectionSet.selections
  >("https://example.com", query);

  data?.viewer.id;
  data?.viewer.age;
  data?.viewer.account.id;

  data?.accounts![0].balance;
})();
