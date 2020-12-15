import { Field, Operation, SelectionSet } from "./Operation";
import { Selector, makeBuildQuery, execute } from "./Client";

// @note Hardcoded `Selector` objects matching a schema
// @todo Support dynamic creation with ex. `Selector<User>`?
// @todo Generate all of these from a static GraphQL schema!

const buildQuery = <T extends Array<Field<any, any, any>>>(
  name: string,
  select: (t: typeof Query) => T
): Operation<T> => {
  return new Operation(name, "query", new SelectionSet(select(Query)));
};

const Query = {
  // @Restrict `Field`'s to what exists on the `User` type!
  viewer: <T extends Array<Field<"id" | "age" | "account", any, any>>>(
    select: (t: typeof User) => T
  ) => new Field("viewer", [], select(User)),
};

type Foo = typeof Query;

const User = {
  id: () => new Field<"id", [], string>("id"),
  age: () => new Field<"age", [], number>("age"),
  account: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Account) => T
  ) => new Field("account", [], select(Account)),
};

type UserS = typeof User;

const Account = {
  id: () => new Field<"id", [], string>("id"),
  balance: () => new Field<"balance", [], number>("balance"),
};

type SelectorAccount = typeof Account;

// @end todo

// @note fragments for "free"!
const fragment = [
  User.id(),
  User.age() /*new Field<'shit',[], string>('shit')*/,
];

// const buildQuery = makeBuildQuery(Query)

const query = buildQuery("Example", (t) => [
  t.viewer((t) => [t.id(), t.age(), t.account((t) => [t.balance()])]),
]);

// unsafe!
(async () => {
  const { data, errors } = await execute("https://example.com", query);

  data?.viewer.id;
  data?.viewer.age;
  data?.viewer.account.balance;

  console.log(query.toString());
})();
