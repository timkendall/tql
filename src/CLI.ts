import Yargs from "yargs";
import fs from "fs-extra";
import fetch from "node-fetch";
import {
  parse,
  getIntrospectionQuery,
  buildASTSchema,
  buildClientSchema,
  printSchema,
} from "graphql";

// import { Codegen } from "./Codegen";
import { render } from "./codegen";

Yargs.command(
  "$0 <schema>",
  "Generate a fluent TypeScript client for your GraphQL API.",
  (yargs) =>
    yargs
      .positional("schema", {
        describe: "ex. https://graphql.org/swapi-graphql/",
        type: "string",
        demandOption: true,
      })
      .option("client", {
        type: "string",
        requiresArg: true,
        description: "Include an implementation of the Client class.",
      })
      .option("tag", {
        type: "string",
        default: "unversioned",
        description: "Semantic versioning tag (ex. 1.0.0).",
      })
      .option("module-path", {
        type: "string",
        description: "Path to @timkendall/tql module.",
      }),
  async (argv) => {
    const schemaPath = argv.schema;

    const schema = schemaPath.startsWith("http")
      ? await remoteSchema(schemaPath)
      : await localSchema(schemaPath);

    process.stdout.write(render(schema));
  }
).argv;

async function localSchema(path: string) {
  const typeDefs = await fs.readFile(path, "utf-8");
  return typeDefs;
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

  return printSchema(buildClientSchema(data));
}
