import { buildSchema, OperationTypeNode } from "graphql";

import {
  namedType,
  nonNull,
  field,
  argument,
  variable,
  selectionSet,
  variableDefinition,
} from "../AST";
import { Selection } from "../Selection";
import { buildVariableDefinitions } from "../Variables";

describe("Variables", () => {
  it("builds variable definitions", () => {
    const schema = buildSchema(
      `
      type Query {
        hello(name: String!): String!
      }
    `,
      { noLocation: true }
    );

    const selection = new Selection(schema, "Query", [
      field("hello", [argument("name", variable("name"))]),
    ]);

    // @note we need a way to get the input type at runtime
    const variableDefinitions = buildVariableDefinitions(
      schema,
      OperationTypeNode.QUERY,
      selectionSet(selection)
    );

    expect(variableDefinitions).toEqual([
      variableDefinition(variable("name"), nonNull(namedType("String"))),
    ]);
  });

  it("infers nested variable definitions", () => {
    const schema = buildSchema(
      `
      type Query {
        viewer: User!
      }

      type User {
        id: ID!
        friends(limit: Int!): [User!]
      }
    `,
      { noLocation: true }
    );

    const selection = new Selection(schema, "Query", [
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

    const variableDefinitions = buildVariableDefinitions(
      schema,
      OperationTypeNode.QUERY,
      selectionSet(selection)
    );

    expect(variableDefinitions).toEqual([
      variableDefinition(variable("friendsLimit"), nonNull(namedType("Int"))),
    ]);
  });
});
