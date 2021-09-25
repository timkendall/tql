import { buildSchema, print } from "graphql";
import { ResultOf, VariablesOf } from "@graphql-typed-document-node/core";

import { field, selectionSet, SelectionSet, argument } from "../AST";
import { $, Variables } from "../Variables";
import { Result } from "../Result";
import {
  ObjectType,
  selectable,
  buildSelector,
  buildRootSelector,
  buildRootDocumentSelector,
} from "../Selector";

describe("Selector", () => {
  describe("type-saftey", () => {
    it("builds dynamic selection maps", () => {
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

    it("supports selecting against an interface", () => {
      interface Query extends ObjectType {
        foo: string;
        bar: number;
        baz: {
          id: string;
        };
      }

      // code-gen would replace this with static `SelectionMap`'s vs. calls to `selectable`
      const query = buildSelector<Query>();
      const selection = query((t) => [
        t.foo(),
        t.bar(),
        t.baz((t) => [t.id()]),
      ]);

      type SS = Result<Query, SelectionSet<typeof selection>>;

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

    it("builds root selectors", () => {
      interface Query {
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

    it("builds root selectors", () => {
      interface Query {
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
});
