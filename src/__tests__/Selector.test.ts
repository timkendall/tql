import { print } from "graphql";
import {} from "type-fest";

import { selectable, buildSelector } from "../Selector";
import { field, selectionSet, argument, SelectionSet } from "../AST";
import { Result } from "../Result";

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
      interface Query {
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

      const copied = [...selection];
      // const selection2 = [foo(), bar(), baz((t) => [t.id()])];

      type ExampleResult = Result<
        Query,
        SelectionSet<typeof selection["selections"]>
      >;

      // type ExampleCopiedResult = Result<
      //   Query,
      //   SelectionSet<typeof copied>
      // >;

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
  });
});
