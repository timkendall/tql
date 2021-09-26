import { field, selectionSet, SelectionSet } from "../AST";
import { Selected } from "../Selector";
import { Result } from "../Result";

describe("Result", () => {
  it("infers simple selections", () => {
    const selection = new Selected("Query", [
      field("foo"),
      field("bar"),
      field("baz"),
    ]);

    interface Query {
      foo: string;
      bar: number;
      baz: boolean;
    }

    const result: Result<Query, SelectionSet<typeof selection>> = {
      foo: "string",
      bar: 100,
      baz: true,
    };
  });

  it("infers nested selections", () => {
    const selection = new Selected("Query", [
      field(
        "viewer",
        undefined,
        selectionSet([
          field("id"),
          field(
            "friends",
            undefined,
            selectionSet([field("name"), field("age")])
          ),
        ])
      ),
    ]);

    interface Query {
      viewer: User;
    }

    interface User {
      id: string;
      name: string;
      age: number;
      friends: User[];
    }

    const result: Result<Query, SelectionSet<typeof selection>> = {
      viewer: {
        id: "string",
        friends: [
          {
            name: "bob",
            age: 69,
          },
        ],
      },
    };
  });

  it("infers spread selections", () => {
    const selection = new Selected("Query", [
      field("foo"),
      field("bar"),
      field("baz"),
    ]);

    interface Query {
      foo: string;
      bar: number;
      baz: boolean;
    }

    const copied = [...selection];

    type OriginalResult = Result<Query, SelectionSet<typeof selection>>;
    type SpreadResult = Result<Query, SelectionSet<typeof copied>>;

    const original: OriginalResult = { foo: "string", bar: 100, baz: true };
    const spread: SpreadResult = { foo: "string", bar: 100, baz: true };
  });
});
