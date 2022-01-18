import Yargs from "yargs";
import fs from "fs-extra";
import fetch from "node-fetch";
import { getIntrospectionQuery, buildClientSchema, printSchema } from "graphql";
import chalk from 'chalk'

import { render } from "./render";

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

    if (process.env.EXPERIMENTAL_WASM_CODEGEN === 'true') {
      const { gen } = await import('codegen-experimental')
        .catch((_) => {
          console.warn(chalk.red`EXPERIMENTAL_WASM_CODEGEN was to "true" but the module could not be loaded. Please try again with this value set to "false".` + '\n')
          process.exit(1)
        })

      console.warn(chalk.yellow`EXPERIMENTAL_WASM_CODEGEN is set to "true". WASM codegen is still a WIP and results will not be complete.` + '\n')
      process.stdout.write(gen(schema));
    } else {
      process.stdout.write(render(schema));
    }
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
