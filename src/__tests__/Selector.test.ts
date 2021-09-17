import { print } from "graphql";

import { selectable, buildSelector } from "../Selector";
import { Field, Argument, SelectionSet } from "../Operation";
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

      expect(foo()).toEqual(new Field("foo"));
      expect(bar()).toEqual(new Field("bar"));
      expect(baz((t) => [t.id(), t.count({ number: 69 })])).toEqual(
        new Field(
          "baz",
          undefined,
          new SelectionSet([
            new Field("id"),
            new Field("count", [new Argument("number", 69)]),
          ])
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

      // const copied = [...selection]
      // const copied: typeof selection['selections'] = [...selection]
      // const selection = [foo(), bar(), baz((t) => [t.id()])];

      type ExampleResult = Result<
        Query,
        SelectionSet<typeof selection["selections"]>
      >;

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
