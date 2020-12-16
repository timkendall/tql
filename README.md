# TS-GQL

**⚠️ this is pre-production software at this point, see current limitations below.**

`ts-gql` is a fully TypeScript-native GraphQL operation writer; **codegen only when you schema changes**, **works with any GraphQL client**, **fully type-safe**.

**Current limitations:**

- No `mutation` or `subscription` operation type support yet
- No nullability or list support yet
- No abstract type support yet
- No custom scalar support yet (e.g no `Date` objects), limited to JS built-ins.
- No variable support yet
- No field alias support yet
- No directive support yet
- No fragment support yet

## Installation

`npm install @timkendall/ts-gql` or `yarn add @timkendall/ts-gql` (TypeScript 4.1+ is required for [Recursive Conditional Type](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types) support)

## Usage

You will need to compile a type-safe client one time before using. Do this with the provided CLI; `ts-gql <schema>`.

```typescript
import { query, execute } from '@timkendall/ts-gql'

const operation = query('Example', t => [
  t.viewer(t => [
    t.id(),
    t.name(),
  ])
])

const { data, errors } = await execute("https://graphql.org/swapi-graphql/", query);

data?.viewer?.id
```

## Inspiration

Heavily inspired by [graphql-nexus](https://github.com/graphql-nexus/schema), [gqless](https://github.com/gqless/gqless), and [graphql_ppx](https://github.com/mhallin/graphql_ppx)!

## License

MIT