import { ApolloClient, InMemoryCache } from "@apollo/client";

import { Result } from "../../src";
import {
  query,
  IQuery,
  LengthUnit,
  Episode,
} from "../../__tests__/starwars/starwars.sdk";

const client = new ApolloClient({ cache: new InMemoryCache() });

const example = query("Apollo Example", (t) => [
  t.character({ id: "foo" }, (t) => [t.id(), t.friends((t) => [t.id()])]),

  t.starship({ id: "foo" }, (t) => [
    t.id(),
    t.name(),
    t.length({ unit: LengthUnit.FOOT }),
    t.coordinates(),
  ]),

  t.reviews({ episode: Episode.JEDI }, (t) => [t.commentary()]),
]);

const apolloQuery = client.query<
  Result<IQuery, typeof example["selectionSet"]>
>({ query: example.toDocument() });

apolloQuery.then((result) => {
  console.log(result.data.starship?.name);
});
