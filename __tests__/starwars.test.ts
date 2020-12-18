import { executeSync, parse } from "graphql";

import { documentOf } from "../src";
import { StarWarsSchema } from "./starwars.schema";
import { query, Episode } from "./starwars.api";

describe("starwars schema", () => {
  describe("query", () => {
    it("renders a valid query", () => {
      const operation = query("Example", (t) => [
        t.reviews({ episode: Episode.EMPIRE }, (t) => [
          t.stars(),
          t.commentary(),
        ]),

        t.human({ id: "1002" }, (t) => [
          t.id(),
          t.name(),
          t.appearsIn(),
          t.homePlanet(),

          // @fix TypeScript currently has issues deriving `Field` types when we have
          // two `Selector` objects with identical fields that reference each other.
          //
          // ex. type ExampleQuery = Result<IQuery, typeof operation.selectionSet.selections>
          // t.friends(t => [t.id(), t.name(), t.appearsIn()]),

          t.starships((t) => [t.id(), t.name()]),
        ]),
      ]);

      const result = executeSync({
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
            id
            name
            appearsIn
            homePlanet
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
            "appearsIn": Array [
              "NEWHOPE",
              "EMPIRE",
              "JEDI",
            ],
            "homePlanet": null,
            "id": "1002",
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
