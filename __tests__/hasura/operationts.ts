import { query, bookmarks_select_column } from "./hasura.sdk";

export const bookmarks = query("Bookmarks", (t) => [
  t.bookmarks({ limit: 10 }, (t) => [
    t.id(),
    t.name(),

    t.children_aggregate(
      { distinct_on: bookmarks_select_column.createdUtc },
      (t) => [
        t.aggregate((t) => [t.min((t) => [t.id()]), t.max((t) => [t.id()])]),
        t.nodes((t) => [t.id(), t.createdUtc()]),
      ]
    ),
  ]),

  // @note Possible `graphql-js` bug when passing an `ID!` of `0` (evaluates to false)
  t.playlist_items_by_pk({ id: 1 }, (t) => [
    t.__typename(),
    t.id(),
    t.position(),
  ]),
]);
