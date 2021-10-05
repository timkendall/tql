import { buildSchema, print } from "graphql";
import { ResultOf, VariablesOf } from "@graphql-typed-document-node/core";

import {
  field,
  selectionSet,
  SelectionSet,
  argument,
  Variable,
  Selection,
} from "../AST";
import { $, Variables } from "../Variables";
import { Result } from "../Result";
import {
  ObjectType,
  Selector,
  selectable,
  Selected,
  buildSelector,
  buildRootSelector,
  buildRootDocumentSelector,
} from "../Selector";

describe("Selector", () => {
  describe("dynamic", () => {
    test("selectable", () => {
      interface Query {
        foo: string;
        bar: number;
        baz: {
          id: string;
          count(variables: { number: number }): number;
        };
      }

      const { foo, bar, baz } = selectable<Query>();

      expect(foo()).toEqual(field("foo"));
      expect(bar()).toEqual(field("bar"));
      expect(baz((t) => [t.id(), t.count({ number: 69 })])).toEqual(
        field(
          "baz",
          undefined,
          selectionSet([field("id"), field("count", [argument("number", 69)])])
        )
      );
    });

    test("buildSelector", () => {
      interface Query extends ObjectType {
        foo: string;
        bar: number;
        baz: {
          id: string;
        };
      }

      // code-gen would replace this with static `SelectionMap`'s vs. calls to `selectable`
      const query = buildSelector<Query>("Query");
      const selection = query((t) => [
        t.foo(),
        t.bar(),
        t.baz((t) => [t.id()]),
      ]);

      const ss = selection.toSelectionSet();
      const inline = selection.toFragment();
      const named = selection.toFragment("QueryFragment");

      type Raw = Result<Query, SelectionSet<typeof selection>>;
      type SS = Result<Query, typeof ss>;
      // @todo
      // type Inline = InlineFragmentResult<Query, typeof inline>;
      // type Named = Result<Query, typeof named['selectionSet']>;

      const string = selection.toString();

      expect(string).toMatchInlineSnapshot(`
        "{
          foo
          bar
          baz {
            id
          }
        }"
      `);
    });

    test("buildRootSelector", () => {
      interface Query extends ObjectType {
        hello(variables: { name: string }): string;
      }

      const schema = buildSchema(
        `
        type Query {
          hello(name: String!): String!
        }
      `,
        { noLocation: true }
      );

      const query = buildRootSelector<Query>("query", schema);
      const test = query((t) => [t.hello({ name: $("helloName") })]).withName(
        "Test"
      );

      type Re = Result<Query, typeof test["selectionSet"]>;
      type Vars = Variables<Query, typeof test["selectionSet"]>;

      expect(print(test)).toMatchInlineSnapshot(`
        "query Test($helloName: String!) {
          hello(name: $helloName)
        }"
      `);
    });

    it("buildRootDocumentSelector", () => {
      interface Query extends ObjectType {
        hello(variables: { name: string }): string;
      }

      const schema = buildSchema(
        `
        type Query {
          hello(name: String!): String!
        }
      `,
        { noLocation: true }
      );

      const query = buildRootDocumentSelector<Query>("query", schema);
      const test = query((t) => [t.hello({ name: $("helloName") })]); //.withName("Test")

      type Variables = VariablesOf<typeof test>;
      type Result = ResultOf<typeof test>;

      expect(test).toMatchInlineSnapshot(`
        Object {
          "definitions": Array [
            Object {
              "directives": Array [],
              "kind": "OperationDefinition",
              "name": Object {
                "kind": "Name",
                "value": "",
              },
              "operation": "query",
              "selectionSet": Object {
                "kind": "SelectionSet",
                "selections": Array [
                  Object {
                    "alias": undefined,
                    "arguments": Array [
                      Object {
                        "kind": "Argument",
                        "name": Object {
                          "kind": "Name",
                          "value": "name",
                        },
                        "value": Object {
                          "kind": "Variable",
                          "name": Object {
                            "kind": "Name",
                            "value": "helloName",
                          },
                        },
                      },
                    ],
                    "directives": Array [],
                    "kind": "Field",
                    "name": Object {
                      "kind": "Name",
                      "value": "hello",
                    },
                    "selectionSet": undefined,
                  },
                ],
              },
              "variableDefinitions": Array [
                Object {
                  "kind": "VariableDefinition",
                  "type": Object {
                    "kind": "NonNullType",
                    "loc": undefined,
                    "type": Object {
                      "kind": "NamedType",
                      "loc": undefined,
                      "name": Object {
                        "kind": "Name",
                        "loc": undefined,
                        "value": "String",
                      },
                    },
                  },
                  "variable": Object {
                    "kind": "Variable",
                    "name": Object {
                      "kind": "Name",
                      "value": "helloName",
                    },
                  },
                },
              ],
              "withName": [Function],
            },
          ],
          "kind": "Document",
        }
      `);
    });
  });

  describe("static", () => {
    it("agrees with type definitions", () => {
      interface Query {
        foo: string;
        bar: number;
        baz: {
          id: string;
          count(variables: { number: number }): number;
        };
      }

      const BazSelector: Selector<Query["baz"]> = {
        id: () => field("id"),
        on: (type: string, select: (selector: any) => any) => [],
        count: (variables: { number: number | Variable<"number"> }) =>
          field("count", [argument("number", variables.number)]),
      };

      const QuerySelector: Selector<Query> = {
        foo: () => field("foo"),
        bar: () => field("bar"),
        baz: <T extends Array<Selection>>(
          select: (selector: typeof BazSelector) => T
        ) =>
          field("baz", undefined as never, selectionSet(select(BazSelector))),
      };

      const baz = <T extends Array<Selection>>(
        select: (selector: typeof BazSelector) => T
      ) => new Selected("Baz", select(BazSelector));

      const query = <T extends Array<Selection>>(
        select: (selector: typeof QuerySelector) => T
      ) => new Selected("Query", select(QuerySelector));

      expect(QuerySelector.foo()).toEqual(field("foo"));

      const selection = query((t) => [
        t.foo(),
        t.bar(),
        t.baz((t) => [t.id(), t.count({ number: 69 })]),
      ]);

      type R = Result<Query, ReturnType<typeof selection["toSelectionSet"]>>;
      type V = Variables<Query, ReturnType<typeof selection["toSelectionSet"]>>;

      expect(print(selection.toFragment())).toMatchInlineSnapshot(`
        "... on Query {
          foo
          bar
          baz {
            id
            count(number: 69)
          }
        }"
      `);
      expect(print(selection.toFragment("MyFragment"))).toMatchInlineSnapshot(`
        "fragment MyFragment on Query {
          foo
          bar
          baz {
            id
            count(number: 69)
          }
        }"
      `);
      expect(print(selection.toSelectionSet())).toMatchInlineSnapshot(`
        "{
          foo
          bar
          baz {
            id
            count(number: 69)
          }
        }"
      `);
    });
  });
});
