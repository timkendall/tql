import { expectType } from "tsd";
import freeze from "deep-freeze";

import {
  selectionSet,
  field,
  namedType,
  inlineFragment,
  SpreadFragment,
  SpreadFragments,
} from "../src";

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
  nodes: Node[];
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

const fragment1 = inlineFragment(
  namedType<"Employee">("Employee"),
  selectionSet([field("firstName")])
);

const fragment2 = inlineFragment(
  namedType<"Admin">("Admin"),
  selectionSet([field("badass"), field("badgeNumber")])
);

// need to assert const because not function return?
const s = selectionSet([field("id"), fragment1, fragment2] as const);

// working
type TFragment1 = SpreadFragment<Schema, typeof fragment1>;
type TFragment2 = SpreadFragment<Schema, typeof fragment2>;

expectType<TFragment1>(freeze({ __typename: "Employee", firstName: "John" }));
expectType<TFragment2>(
  freeze({ __typename: "Admin", badass: true, badgeNumber: 69 })
);

const data = {} as SpreadFragments<Schema, typeof s>;

if (data.__typename === "Admin") {
  data.badass;
  data.badgeNumber;
} else {
  data.firstName;
}
