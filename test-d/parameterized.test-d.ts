import { expectType } from "tsd";
import freeze from "deep-freeze";

import { selectionSet, field, Result } from "../src";

interface Schema {
  Query: Query;
}

interface Query {
  __typename: "Query";
  hello(variables: { name: string }): string;
}

const selection = selectionSet([field("__typename"), field("hello")]);

type Test = Result<Schema, Query, typeof selection>;

expectType<Test>(freeze({ __typename: "Query", hello: "foo" }));
