import fs from "fs-extra";
import { buildClientSchema, getIntrospectionQuery, printSchema } from "graphql";
import fetch from "node-fetch";
import path from "path";
import Yargs from "yargs/yargs";

import { render } from "./render";

run().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

async function run() {
  const argv = Yargs(process.argv.slice(2))
    .usage(
      "$0 <schema>",
      "Generate a fluent TypeScript client for your GraphQL API.",
    )
    .positional("schema", {
      type: "string",
      describe: "ex. https://graphql.org/swapi-graphql/",
    })
    .options({
      headers: { type: "array" },
      output: { type: "string", describe: "Path of output file (typescript)" },
    })
    .alias("o", "output")
    .demandOption(["schema"])
    .help("help").argv;

  const schemaPath = argv.schema;

  const schema = schemaPath.startsWith("http")
    ? await remoteSchema(schemaPath, {
      headers: normalizeHeaders(argv.headers),
    })
    : await localSchema(schemaPath);

  const renderedSchema = render(schema);

  if (argv.output) {
    const outputPath = path.resolve(argv.output);
    console.log("Writing to: ", outputPath);
    fs.writeFile(outputPath, renderedSchema);
  } else {
    process.stdout.write(renderedSchema);
  }
}

function normalizeHeaders(headers: any): Record<string, string> {
  if (typeof headers === "string") {
    return normalizeHeaders([headers]);
  }
  if (Array.isArray(headers)) {
    const entries = headers
      .map(headerArg => {
        if (typeof headerArg !== "string") {
          console.warn(`Invalid header ignored: ${headerArg}`);
          return null;
        }
        const parts = headerArg.split(":");
        if (parts.length !== 2) {
          console.warn(`Invalid header ignored: ${headerArg}`);
          return null;
        }
        return parts.map(it => it.trim());
      })
      .filter(Boolean) as [string, string][];
    return Object.fromEntries(entries);
  }
  if (typeof headers === "object") {
    const entries = Object
      .entries(headers)
      .map(([key, value]) => {
        if (typeof value !== "string") {
          console.warn(`Invalid header ignored: ${key}`);
          return null;
        }
        return [key, value];
      })
      .filter(Boolean) as [string, string][];
    return Object.fromEntries(entries);
  }
  return {};
}

async function localSchema(path: string) {
  const typeDefs = await fs.readFile(path, "utf-8");
  return typeDefs;
}

async function remoteSchema(url: string, options: {
  headers: Record<string, string>;
}) {
  const { data, errors } = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
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
