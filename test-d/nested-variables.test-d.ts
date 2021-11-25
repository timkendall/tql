import { expectAssignable } from "tsd";
import { Variables, selectionSet, field, argument, variable } from "../src";

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
  user(variables: { id: string }): User | null;
}

interface User {
  id: string;
  friends(variables: { limit: number | undefined }): User[];
}

const selection = selectionSet([
  field("user", [argument("id", variable("id"))], selectionSet([field("id")])),
  field(
    "viewer",
    undefined,
    selectionSet([
      field(
        "friends",
        [argument("limit", variable("limit"))],
        selectionSet([field("id")])
      ),
    ])
  ),
]);

type Test = Variables<Schema, Query, typeof selection>;

expectAssignable<Test>({
  id: "abc",
  limit: 5,
});
