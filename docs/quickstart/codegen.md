# Codegen

Codegen currently is required to be manually once at least once before usage. We provide the code generator as a seperate module to avoid unneccesary dependencies in the runtime module.

## Usage

`npx @timkendall/tql-gen <schema> > sdk.ts`

- `<schema>`: HTTP(s) endpoint of a GraphQL API w/ introspection enabled or local `.graphql` schema file