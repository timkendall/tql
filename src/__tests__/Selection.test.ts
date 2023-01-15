import { Selection } from "../Selection";
import { buildSchema } from "graphql";
import { argument, field, selectionSet } from "../AST";

describe("Selection", () => {
  it.todo("is an Array of Selection AST objects");
  it.todo("converts to a SelectionSet AST object");
  it.todo("converts to an InlineFragment AST object");
  it.todo("converts to a NamedFragment AST object");

  it("converts to a string", () => {
    const schema = buildSchema(
      `
      type Query {
        currentUser: User!
      }

      type Mutation {
        createUser(user: UserInput!): User!
      }

      type User {
        id: ID!
        name: String!
        friends(limit: Int!): [User!]
      }

      input UserInput {
        name: String!
      }
    `,
      { noLocation: true }
    );

    const selection = new Selection(schema, "Mutation", [
      field(
        "createUser",
        [
          argument("user", {
            name: "John Doe",
          }),
        ],
        selectionSet([field("id")])
      ),
    ]);

    expect(
      selection.toString({
        queryName: "createUser",
      })
    ).toMatchInlineSnapshot(`
      "mutation createUser {
        createUser(user: {name: \\"John Doe\\"}) {
          id
        }
      }"
    `);

    expect(selection.toString()).toMatchInlineSnapshot(`
      "mutation Anonymous {
        createUser(user: {name: \\"John Doe\\"}) {
          id
        }
      }"
    `);
  });
});
