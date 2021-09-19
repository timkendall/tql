import { field, argument, variable, selectionSet, SelectionSet } from "../AST";
import { Selected } from "../Selector";
import { Variables } from "../Variables";

describe("Variables", () => {
  it("infers variable definitions", () => {
    const selection = new Selected([
      field("hello", [argument("name", variable("name"))]),
    ]);

    interface Query {
      hello(variables: { name: string }): string;
    }

    const variables: Variables<Query, SelectionSet<typeof selection>> = {
      name: "string",
    };
  });
});
