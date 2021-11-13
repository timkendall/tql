import { expectAssignable } from "tsd";
import { L } from "ts-toolbelt";

import {
  SelectionSet,
  selectionSet,
  field,
  Field,
  namedType,
  inlineFragment,
  InlineFragment,
  MergeSelectionSets,
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

type filtered = L.Filter<typeof s["selections"], InlineFragment<any, any>>;

// working
type TFragment1 = SpreadFragment<Schema, typeof fragment1, SelectionSet<[]>>;
type TFragment2 = SpreadFragment<Schema, typeof fragment2, SelectionSet<[]>>;

expectAssignable<TFragment1>({ __typename: "Employee", firstName: "John" });
expectAssignable<TFragment2>({
  __typename: "Admin",
  badass: true,
  badgeNumber: 69,
});

const data = {} as SpreadFragments<Schema, typeof s>;

if (data.__typename === "Admin") {
  data.badass;
  data.badgeNumber;
} else {
  data.firstName;
}

type merged = MergeSelectionSets<
  SelectionSet<[Field<"id">]>,
  SelectionSet<[Field<"name">]>
>;
type merged2 = L.Concat<[Field<"id">], [Field<"name">]>;

const m = [field("id"), field("name")] as merged2;
