import Yargs from "yargs";
import fs from "fs-extra";
import fetch from "node-fetch";
import {
  parse,
  getIntrospectionQuery,
  buildASTSchema,
  buildClientSchema,
} from "graphql";

import { Codegen } from "./Codegen";

Yargs.command(
  "$0 <schema>",
  "Generate a fluent TypeScript client for your GraphQL API.",
  (yargs) =>
    yargs.positional("schema", {
      describe: "ex. https://graphql.org/swapi-graphql/",
      type: "string",
      demandOption: true,
    }),
  async (argv) => {
    const schemaPath = argv.schema;

    const schema = schemaPath.startsWith("http")
      ? await remoteSchema(schemaPath)
      : await localSchema(schemaPath);

    const codegen = new Codegen(schema);

    process.stdout.write(codegen.render());
  }
).argv;

async function localSchema(path: string) {
  const typeDefs = await fs.readFile(path, "utf-8");
  return buildASTSchema(parse(typeDefs));
}

async function remoteSchema(url: string) {
  const { data, errors } = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operationName: "IntrospectionQuery",
      query: getIntrospectionQuery(),
    }),
  }).then((res) => res.json());

  if (errors) {
    throw new Error("Error fetching remote schema!");
  }

  return buildClientSchema(data);
}
