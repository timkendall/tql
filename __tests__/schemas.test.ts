import fs from "fs";
import path from "path";
import { parse, validate, execute, buildSchema } from "graphql";

import * as starwarsOps from "./starwars/operations";
import * as githubOps from "./github/operations";

import { StarWarsSchema } from "./starwars/starwars.schema";

describe("Schemas", () => {
  describe("Star Wars", () => {
    const typeDefs = fs
      .readFileSync(
        path.resolve(__dirname, "./starwars/starwars.schema.graphql")
      )
      .toString("utf-8");
    const schema = buildSchema(typeDefs);

    describe.each([[starwarsOps.kitchensink.name, starwarsOps.kitchensink]])(
      `%s`,
      (_operationName, operation) => {
        it("renders the expected operation", () => {
          expect(operation.toString()).toMatchSnapshot();
        });

        it("renders a parsable operation", () => {
          expect(() => parse(operation.toString())).not.toThrow();
        });

        it("renders a valid operation", () => {
          expect(validate(schema, operation.toDocument()).length).toBe(0);
        });

        it("renders an executable operation", async () => {
          await expect(
            execute({
              schema: StarWarsSchema,
              document: operation.toDocument(),
            })
          ).resolves.toMatchSnapshot();
        });
      }
    );
  });

  describe("GitHub", () => {
    const typeDefs = fs
      .readFileSync(path.resolve(__dirname, "./github/github.schema.graphql"))
      .toString("utf-8");
    const schema = buildSchema(typeDefs);

    describe.each([[githubOps.viewer.name, githubOps.viewer]])(
      `%s`,
      (_operationName, operation) => {
        it("renders the expected operation", () => {
          expect(operation.toString()).toMatchSnapshot();
        });

        it("renders a parsable operation", () => {
          expect(() => parse(operation.toString())).not.toThrow();
        });

        it("renders a valid operation", () => {
          expect(validate(schema, operation.toDocument()).length).toBe(0);
        });
      }
    );
  });
});
