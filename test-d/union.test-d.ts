import { expectAssignable } from "tsd";

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
  search: (SearchResult | null)[] | null;
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
const first = data.search?.[0];

if (first?.__typename === "Author") {
  first.__typename;
  first.name;
} else if (first?.__typename === "Book") {
  first.__typename;
  first.title;
} else {
  // expect null or undefined
  first;
}

expectAssignable<Test>({
  search: null,
});
expectAssignable<Test>({
  search: [],
});
expectAssignable<Test>({
  search: [null],
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
expectAssignable<Test>({
  search: [
    {
      __typename: "Book",
      title: "Holy Bible",
    },
    null,
  ],
});
