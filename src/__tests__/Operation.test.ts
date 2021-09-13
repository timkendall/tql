import { Operation, SelectionSet, Field } from "../Operation";

describe("Operation", () => {
  it("derives a sha256", () => {
    const expected =
      "b058a36cc1a91b9d31412246c58e6ed0c83f9d282383dbf65fa53e77c170fb31";

    const operation = new Operation(
      "Test",
      "query",
      new SelectionSet([new Field("helloWorld")])
    );

    expect(operation.sha256).toBe(expected);
    expect(operation.sha256).toBe(expected);
  });

  it("renders to a string", () => {
    const operation = new Operation(
      "Test",
      "query",
      new SelectionSet([new Field("helloWorld")])
    );
    expect(operation.toString()).toMatchInlineSnapshot(`
      "query Test {
        helloWorld
      }"
    `);
  });

  it("renders to a DocumentNode (ast)", () => {
    const operation = new Operation(
      "Test",
      "query",
      new SelectionSet([new Field("helloWorld")])
    );
    expect(operation.toDocument()).toMatchInlineSnapshot(`
      Object {
        "definitions": Array [
          Object {
            "directives": Array [],
            "kind": "OperationDefinition",
            "name": Object {
              "kind": "Name",
              "value": "Test",
            },
            "operation": "query",
            "selectionSet": Object {
              "kind": "SelectionSet",
              "selections": Array [
                Object {
                  "arguments": Array [],
                  "directives": Array [],
                  "kind": "Field",
                  "name": Object {
                    "kind": "Name",
                    "value": "helloWorld",
                  },
                  "selectionSet": undefined,
                },
              ],
            },
            "variableDefinitions": Array [],
          },
        ],
        "kind": "Document",
      }
    `);
  });
});
