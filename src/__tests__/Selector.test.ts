import { print } from "graphql";

import { selector, Selector } from "../Selector";
import { SelectionSet } from "../Operation";
import { Result } from "../Result";

describe("Selector", () => {
  describe("type-saftey", () => {
    it("supports selecting against an interface", () => {
      interface Query {
        foo: string;
        bar: number;
        baz: {
          id: string;
        };
      }

      const { foo, bar, baz } = selector<Query>();

      const selection = [foo(), bar(), baz((t) => [t.id()])];
      type ExampleResult = Result<Query, SelectionSet<typeof selection>>;

      const query = print(new SelectionSet(selection).ast);

      expect(query).toMatchInlineSnapshot(`
        "{
          foo
          bar
          baz {
            id
          }
        }"
      `);
    });
  });

  describe("class API", () => {
    it("supports arbitrarily deep seletions", () => {
      const selector = new Selector<any>((t) => [
        t.user({ id: "foo" }, (t) => [t.id()]),
      ]);

      const query = print(selector.toSelectionSet().ast);

      expect(query).toMatchInlineSnapshot(`
        "{
          user(id: \\"foo\\") {
            id
          }
        }"
      `);
    });
  });

  describe("function API", () => {
    it("supports arbitrarily deep selections", () => {
      const { authors, user } = selector<any>();

      const selection = [
        authors((t) => [t.name(), t.address((t) => [t.country()])]),

        user({ id: "foo" }, (t) => [t.foo((t) => [t.bar((t) => [t.baz()])])]),
      ];

      const query = print(new SelectionSet(selection).ast);

      expect(query).toMatchInlineSnapshot(`
        "{
          authors {
            name
            address {
              country
            }
          }
          user(id: \\"foo\\") {
            foo {
              bar {
                baz
              }
            }
          }
        }"
      `);
    });
  });
});
