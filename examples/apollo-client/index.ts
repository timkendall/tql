import fetch from "node-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

import { Result } from "../../src";
import {
  query,
  IQuery,
  LengthUnit,
  Episode,
} from "../../__tests__/starwars/starwars.sdk";

(async () => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:8080/graphql", fetch }),
    cache: new InMemoryCache(),
  });

  const example = query("ApolloExample", (t) => [
    t.character({ id: "foo" }, (t) => [t.id(), t.friends((t) => [t.id()])]),

    t.starship({ id: "foo" }, (t) => [
      t.id(),
      t.name(),
      t.length({ unit: LengthUnit.FOOT }),
      t.coordinates(),
    ]),

    t.reviews({ episode: Episode.JEDI }, (t) => [t.commentary()]),
  ]);

  const result = await client.query<
    Result<IQuery, typeof example["selectionSet"]>
  >({ query: example.toDocument() });

  console.log(`Found Starship "${result.data.starship?.name}"!`);
})();
