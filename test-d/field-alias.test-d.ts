import { expectAssignable } from "tsd";
import freeze from "deep-freeze";
import { selectionSet, Result, field } from "../src";

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
  userById: User | null;
}

interface User {
  __typename: "User";
  id: string;
  firstName: string;
  age: number | null;
}

const selection = selectionSet([
  field("userById", undefined, selectionSet([
    field("firstName").as("name")
  ]))
])

type Test = Result<Schema, Query, typeof selection>;

expectAssignable<Test>(
  freeze({
    userById: {
      name: "test"
    }
  })
)

expectAssignable<Test>(
  freeze({
    userById: null
  })
)

