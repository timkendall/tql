import { expectType } from "tsd";
import freeze from "deep-freeze";

import { selectionSet, field, Result } from "../src";

interface Query {
  viewer: User;
}

interface User {
  id: string;
  firstName: string;
  age: number | null;
}

const selection = selectionSet([
  field(
    "viewer",
    undefined,
    selectionSet([field("id"), field("firstName"), field("age")])
  ),
]);

type Test = Result<Query, typeof selection>;

expectType<Test>(freeze({ viewer: { id: "foo", firstName: "Tim", age: 69 } }));
expectType<Test>(
  freeze({ viewer: { id: "foo", firstName: "Tim", age: null } })
);
