import Benny from "benny";
import gotql from "gotql";

// @todo benchmark against https://github.com/hasura/awesome-fluent-graphql
import { query } from "../starwars.api";

Benny.suite(
  "Query Building",

  Benny.add("string", () => {
    const foo = `{
      droid(id: "foo") {
        __typename
        name
        primaryFunction
      }
    }`;
  }),

  Benny.add("gotql", () => {
    const foo = gotql.parser(
      {
        variables: {
          id: {
            type: "string!",
            value: "foo",
          },
        },
        operation: {
          name: "droid",
          args: {
            id: "$id",
          },
          fields: ["__typename", "name", "primaryFunction"],
        },
      },
      "query" as any
    );
  }),

  Benny.add("tql (precompiled)", () => {
    const foo = query("Benchmark", (t) => [
      t.droid({ id: "foo" }, (t) => [
        t.__typename(),
        t.name(),
        t.primaryFunction(),
      ]),
    ]).toString();
  }),

  Benny.cycle(),
  Benny.complete()
);
