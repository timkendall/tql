import { buildSchema } from "graphql";

import {
  namedType,
  nonNull,
  field,
  argument,
  variable,
  selectionSet,
  SelectionSet,
  variableDefinition,
  operation,
} from "../AST";
import { Selected } from "../Selector";
import {
  ArgumentTypeMap,
  buildVariableDefinitions,
  Variables,
} from "../Variables";

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

  it("builds variable definitions", () => {
    const selection = new Selected([
      field("hello", [argument("name", variable("name"))]),
    ]);

    /*
      We could go full-bore and define a partial
      type-safe API for schema definitions (we would codegen this):

      const Query = object((t) => ({
        hello: t.field({
          type: t.string(),
          args: { name: t.nonNull(t.string()) }
        })
      }))
    */
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

    // @note we need a way to get the input type at runtime
    const variableDefinitions = buildVariableDefinitions(
      schema,
      operation(selectionSet(selection))
    );

    expect(variableDefinitions).toEqual([
      variableDefinition(variable("name"), nonNull(namedType("String"))),
    ]);
  });

  it.skip("infers nested variable definitions", () => {
    const selection = new Selected([
      field(
        "viewer",
        undefined,
        selectionSet([
          field(
            "friends",
            [argument("limit", variable("friendsLimit"))],
            selectionSet([field("id")])
          ),
        ])
      ),
    ]);

    interface Query {
      viewer: User;
    }

    interface User {
      id: string;
      friends(variables: { limit?: number }): User[];
    }

    // const variables: Variables<Query, SelectionSet<typeof selection>> = {
    //   friendsLimit: 5,
    // };
  });
});
