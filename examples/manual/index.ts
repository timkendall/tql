import { selector, operation, Result } from "../../src";

interface Query {
  foo: string;
  bar: number;
  baz: {
    id: string;
  };
}

// build a Selector object
const Query = selector<Query>();
// build an Operation builder
const query = operation("query", Query);
// build an example "query" operation
const example = query("example", (t) => [
  t.foo(),
  t.bar(),
  t.baz({ id: "foo" }, (t) => [t.id()]),
]);

type ExampleResult = Result<Query, typeof example["selectionSet"]>;

console.log(example.toString());
