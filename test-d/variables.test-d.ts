import { expectType } from "tsd";

import { Variables, selectionSet, field, argument, variable } from "../src";

interface Schema {
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ID: string;

  Query: Query;
}

interface Query {
  __typename: "Query";
  hello(variables: { name: string }): string;
}

const selection = selectionSet([
  field("hello", [argument("name", variable("foo"))]),
]);

type Test = Variables<Schema, Query, typeof selection>;

expectType<Test>({
  foo: "world",
});
