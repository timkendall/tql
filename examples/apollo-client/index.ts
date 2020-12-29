import { ApolloClient, InMemoryCache } from "@apollo/client";

import { Result } from "../../src";
import {
  query,
  IQuery,
  LengthUnit,
} from "../../__tests__/starwars/starwars.api";

const client = new ApolloClient({ cache: new InMemoryCache() });

const example = query("Apollo Example", (t) => [
  t.starship({ id: "foo" }, (t) => [
    t.id(),
    t.name(),
    t.length({ unit: LengthUnit.FOOT }),
    t.coordinates(),
  ]),
]);

const apolloQuery = client.query<
  Result<IQuery, typeof example["selectionSet"]>
>({ query: example.toDocument() });

apolloQuery.then((result) => {
  console.log(result.data.starship.length);
});
