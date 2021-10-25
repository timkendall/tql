import { expectType } from "tsd";
import freeze from "deep-freeze";

import { selectionSet, field, Result } from "../src";

interface Query {
  hello: string;
}

const selection = selectionSet([field("hello")]);

type Test = Result<Query, typeof selection>;

expectType<Test>(freeze({ hello: "foo" }));
