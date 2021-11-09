import { Simplify } from "type-fest";
import { A } from "ts-toolbelt";
import { expectType, expectAssignable } from "tsd";
import freeze from "deep-freeze";

import { selectionSet, field, namedType, inlineFragment, Result } from "../src";

interface Schema {
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ID: string;

  Query: Query;
  SearchResult: SearchResult;
  Author: Author;
  Book: Book;
}

interface Query {
  __typename: "Query";
  search: SearchResult[];
}

interface Author {
  __typename: "Author";
  name: string;
}

interface Book {
  __typename: "Book";
  title: string;
}

type SearchResult = Author | Book;

const selection = selectionSet([
  field(
    "search",
    undefined,
    selectionSet([
      field("__typename"),

      inlineFragment(
        namedType<"Author">("Author"),
        selectionSet([field("name")] as const)
      ),

      inlineFragment(
        namedType<"Book">("Book"),
        selectionSet([field("title")] as const)
      ),
    ] as const)
  ),
] as const);

type Test = Result<Schema, Query, typeof selection>;

const data = {} as Test;

if (data.search[0].__typename === "Author") {
  data.search[0].__typename;
  data.search[0];
} else if (data.search[0].__typename === "Book") {
  data.search[0].__typename;
} else {
  // expect null
  data.search[0];
}

expectAssignable<Test>({
  search: [],
});
expectAssignable<Test>({
  search: [
    {
      __typename: "Author",
      name: "John",
    },
  ],
});
expectAssignable<Test>({
  search: [
    {
      __typename: "Book",
      title: "Holy Bible",
    },
  ],
});
