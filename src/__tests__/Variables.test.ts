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
  Selection,
  Field,
  Argument,
  Variable,
} from "../AST";
import { Selected } from "../Selector";
import { buildVariableDefinitions, Variables } from "../Variables";

describe("Variables", () => {
  it("infers variable definitions", () => {
    const selection = new Selected("Query", [
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
    const selection = new Selected("Query", [
      field("hello", [argument("name", variable("name"))]),
    ]);

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
      "query",
      schema,
      selectionSet(selection)
    );

    expect(variableDefinitions).toEqual([
      variableDefinition(variable("name"), nonNull(namedType("String"))),
    ]);
  });

  it("infers nested variable definitions", () => {
    const selection = new Selected("Query", [
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
    ]).toSelectionSet();

    interface Query {
      viewer: User;
    }

    interface User {
      id: string;
      friends(variables: { limit?: number }): User[];
    }

    const variables: Variables<Query, typeof selection> = {
      friendsLimit: 5,
    };
  });
});
