import { expectAssignable } from "tsd";

import {
  selectionSet,
  field,
  argument,
  variable,
  inlineFragment,
  namedType,
  Variables,
  Result,
} from "../src";

interface Schema {
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ID: string;

  Query: Query;
  User: User;

  Unit: Unit;
}

interface Query {
  __typename: "Query";
  viewer: User;
}

enum Unit {
  FEET = "FEET",
  METERS = "METERS",
}

interface User {
  __typename: "User";
  id: string;
  // @todo modify Result's SpreadFragment's to support parameterized fields
  height(variables: { unit: Unit }): number;
}

const selection = selectionSet([
  field(
    "viewer",
    undefined,
    selectionSet([
      field("id"),

      inlineFragment(
        namedType<"User">("User"),
        selectionSet([
          field("height", [argument("unit", variable("heightUnit"))]),
        ] as const)
      ),
    ] as const)
  ),
]);

type Test = Variables<Schema, Query, typeof selection>;
type Test2 = Result<Schema, Query, typeof selection>;

expectAssignable<Test>({
  heightUnit: Unit.FEET,
});
