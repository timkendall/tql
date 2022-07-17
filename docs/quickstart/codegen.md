# Codegen

Codegen currently is required to be manually once at least once before usage. We provide the code generator as a seperate module to avoid unneccesary dependencies in the runtime module.

## Usage

`npx @timkendall/tql-gen <schema> -o sdk.ts`

- `<schema>`: HTTP(s) endpoint of a GraphQL API w/ introspection enabled or local `.graphql` schema file

You can also pass headers (eg. for authentication) to your graphql API endpoint if needed:

`npx @timkendall/tql-gen http://api.example.com/graphql --headers.Authorization="Bearer 20394823423"`

or

`npx @timkendall/tql-gen http://api.example.com/graphql --headers="Authorization: Bearer 20394823423"`

In either usage patterns, you can pass multiple headers by repeated usage of `--headers`
