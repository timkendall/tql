import { execute, parse } from "graphql";

import { documentOf, Result } from "../src";
import { StarWarsSchema } from "./starwars.schema";
import { query, Episode, IQuery } from "./starwars.api";

describe("starwars schema", () => {
  describe("query", () => {
    it("renders a valid query", async () => {
      const operation = query("Example", (t) => [
        t.reviews({ episode: Episode.EMPIRE }, (t) => [
          t.stars(),
          t.commentary(),
        ]),

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

      // @note Example result type!
      type ExampleQuery = Result<IQuery, typeof operation["selectionSet"]>;

      const result = await execute({
        schema: StarWarsSchema,
        document: documentOf([operation.ast]),
      });

      expect(() => parse(operation.toString())).not.toThrow();
      expect(result.errors).toBeUndefined();
      expect(operation.toString()).toMatchInlineSnapshot(`
        "query Example {
          reviews(episode: EMPIRE) {
            stars
            commentary
          }
          human(id: \\"1002\\") {
            __typename
            id
            name
            appearsIn
            homePlanet
            mass
            friends {
              __typename
              id
              name
              appearsIn
              ... on Human {
                homePlanet
              }
              ... on Droid {
                primaryFunction
              }
            }
            starships {
              id
              name
            }
          }
        }"
      `);
      expect(result.data).toMatchInlineSnapshot(`
        Object {
          "human": Object {
            "__typename": "Human",
            "appearsIn": Array [
              "NEWHOPE",
              "EMPIRE",
              "JEDI",
            ],
            "friends": Array [
              Object {
                "__typename": "Human",
                "appearsIn": Array [
                  "NEWHOPE",
                  "EMPIRE",
                  "JEDI",
                ],
                "homePlanet": "Tatooine",
                "id": "1000",
                "name": "Luke Skywalker",
              },
              Object {
                "__typename": "Human",
                "appearsIn": Array [
                  "NEWHOPE",
                  "EMPIRE",
                  "JEDI",
                ],
                "homePlanet": "Alderaan",
                "id": "1003",
                "name": "Leia Organa",
              },
              Object {
                "__typename": "Droid",
                "appearsIn": Array [
                  "NEWHOPE",
                  "EMPIRE",
                  "JEDI",
                ],
                "id": "2001",
                "name": "R2-D2",
                "primaryFunction": "Astromech",
              },
            ],
            "homePlanet": null,
            "id": "1002",
            "mass": 80,
            "name": "Han Solo",
            "starships": Array [
              Object {
                "id": "3000",
                "name": "Millenium Falcon",
              },
              Object {
                "id": "3003",
                "name": "Imperial shuttle",
              },
            ],
          },
          "reviews": Array [],
        }
      `);
    });
  });
});
