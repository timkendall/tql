import Yargs from "yargs";
import fs from "fs-extra";
import fetch from "node-fetch";
import { getIntrospectionQuery, buildClientSchema, printSchema } from "graphql";

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
      ? await remoteSchema(schemaPath, {
        headers: normalizeHeaders(argv.headers)
      })
      : await localSchema(schemaPath);

    process.stdout.write(render(schema));
  }
).argv;

function normalizeHeaders(headers: any): Record<string, string> {
  if (typeof headers === "string") {
    return normalizeHeaders([headers])
  }
  if (Array.isArray(headers)) {
    const entries = headers
      .map(headerArg => {
        if (typeof headerArg !== 'string') {
          console.warn(`Invalid header ignored: ${headerArg}`)
          return null;
        }
        const parts = headerArg.split(':')
        if (parts.length !== 2) {
          console.warn(`Invalid header ignored: ${headerArg}`)
          return null;
        }
        return parts.map(it => it.trim())
      })
      .filter(Boolean) as [string, string][]
    return Object.fromEntries(entries)
  }
  if (typeof headers === "object") {
    const entries = Object
      .entries(headers)
      .map(([key, value]) => {
        if (typeof value !== 'string') {
          console.warn(`Invalid header ignored: ${key}`)
          return null;
        }
        return [key, value]
      })
      .filter(Boolean) as [string, string][]
    return Object.fromEntries(entries)
  }
  return {};
}

async function localSchema(path: string) {
  const typeDefs = await fs.readFile(path, "utf-8");
  return typeDefs;
}

async function remoteSchema(url: string, options: {
  headers: Record<string, string>
}) {
  const { data, errors } = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
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
