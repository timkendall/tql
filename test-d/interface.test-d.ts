import { Simplify } from "type-fest";
import { A } from "ts-toolbelt";
import { expectType, expectAssignable } from "tsd";
import freeze from "deep-freeze";

import { selectionSet, field, namedType, inlineFragment, Result } from "../src";

interface Schema {
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ID: string;

  Query: Query;
  Node: Node;
  Employee: Employee;
  Admin: Admin;
}

interface Query {
  __typename: "Query";
  node: Node | null;
}

interface Node {
  __typename: "Employee" | "Admin";
  id: string;
}

interface Employee extends Node {
  __typename: "Employee";
  firstName: string;
}

interface Admin extends Node {
  __typename: "Admin";
  badass: boolean;
  badgeNumber: number;
}

const selection = selectionSet([
  field(
    "node",
    undefined,
    selectionSet([
      field("__typename"),
      field("id"),

      inlineFragment(
        namedType<"Employee">("Employee"),
        selectionSet([field("firstName")] as const)
      ),

      inlineFragment(
        namedType<"Admin">("Admin"),
        selectionSet([
          field("id"),
          field("badass"),
          field("badgeNumber"),
        ] as const)
      ),
    ] as const)
  ),
] as const);

type Test = Result<Schema, Query, typeof selection>;

const data = {} as Test;

if (data.node?.__typename === "Employee") {
  data.node.__typename;
  data.node.id;
  data.node.firstName;
} else if (data.node?.__typename === "Admin") {
  data.node.__typename;
  data.node.id;
  data.node.badass;
  data.node.badgeNumber;
} else {
  // expect null
  data.node;
}

expectAssignable<Test>({
  node: {
    __typename: "Employee",
    id: "123",
    firstName: "Gina",
  },
});
expectAssignable<Test>({
  node: {
    __typename: "Admin",
    id: "123",
    badass: true,
    badgeNumber: 69,
  },
});
