import { expectAssignable } from "tsd";
import freeze from "deep-freeze";
import { O } from "ts-toolbelt";

import { selectionSet, field, Result } from "../src";

interface Schema {
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ID: string;

  Query: Query;
  User: User;
}

interface Query {
  __typename: "Query";
  viewer: User;
}

interface User {
  __typename: "User";
  id: string;
  firstName: string;
  age: number | null;
  pronouns: string[];
}

const selection = selectionSet([
  field(
    "viewer",
    undefined,
    selectionSet([
      field("id"),
      field("firstName"),
      field("age"),
      field("pronouns"),
    ])
  ),
]);

type Test = Result<Schema, Query, typeof selection>;

expectAssignable<Test>(
  freeze({ viewer: { id: "foo", firstName: "Tim", age: 69, pronouns: [] } })
);
expectAssignable<Test>(
  freeze({
    viewer: { id: "foo", firstName: "Tim", age: null, pronouns: ["xenon"] },
  })
);
