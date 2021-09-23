import { buildSchema, print } from "graphql";
import { ResultOf, VariablesOf } from "@graphql-typed-document-node/core";

import { field, selectionSet, argument } from "../AST";
import { $ } from "../Variables";
import {
  ObjectType,
  selectable,
  buildSelector,
  buildRootSelector,
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

    it.only("builds root selectors", () => {
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
      // @todo add `query.withName('Foo')`
      const test = query((t) => [t.hello({ name: $("helloName") })]);

      type Variables = VariablesOf<typeof test>;
      type Result = ResultOf<typeof test>;

      expect(print(test)).toMatchInlineSnapshot(`
        "query ($helloName: String!) {
          hello(name: $helloName)
        }
        "
      `);
    });
  });
});
