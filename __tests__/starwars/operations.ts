import { query, Episode } from "./starwars.sdk";

export const kitchensink = query("Example", (t) => [
  t.search({ text: "han" }, (t) => [
    t.__typename(),

    t.on("Human", (t) => [t.id(), t.name()]),
  ]),

  t.reviews({ episode: Episode.EMPIRE }, (t) => [t.stars(), t.commentary()]),

  t.human({ id: "1002" }, (t) => [
    t.__typename(),
    t.id(),
    t.name(),
    t.appearsIn(),
    t.homePlanet(),

    // @note Deprecated field should be properly picked-up by VSCode!
    t.mass(),

    t.friends((t) => [
      t.__typename(),
      t.id(),
      t.name(),
      t.appearsIn(),

      t.on("Human", (t) => [t.homePlanet()]),
      t.on("Droid", (t) => [t.primaryFunction()]),
    ]),

    t.starships((t) => [t.id(), t.name()]),
  ]),
]);
