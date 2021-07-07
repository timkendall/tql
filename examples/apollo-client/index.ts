import { ApolloClient, InMemoryCache } from "@apollo/client";

import { Result } from "../../src";
import {
  query,
  IQuery,
  LengthUnit,
  Episode,
  isDroid,
  isHuman,
} from "../../__tests__/starwars/starwars.sdk";

const client = new ApolloClient({ cache: new InMemoryCache() });

const example = query("Apollo Example", (t) => [
  t.character({ id: "foo" }, (t) => [
    t.id(),
    t.friends((t) => [
      t.__typename(),
      t.id(),

      t.on("Droid", (t) => [t.primaryFunction()]),
      t.on("Human", (t) => [t.homePlanet()]),
    ]),
  ]),

  t.search({ text: "" }, (t) => [
    t.__typename(),

    t.on("Droid", (t) => [t.primaryFunction()]),
    t.on("Human", (t) => [t.homePlanet()]),
  ]),

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

  // Ugh abstract types are giving us issues when used in collections...
  const friends = result.data.character?.friends ?? [];
  const search = result.data.search!;

  for (const friend of search) {
    if (friend.__typename === "Human") {
      console.log(`Friend is a Human from "${friend.homePlanet}"!`);
    }

    if (friend.typename === "Droid") {
      console.log(`Friend is a Droid for "${friend.primaryFunction}"!`);
    }
  }
});
