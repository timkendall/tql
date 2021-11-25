# TQL

> 🚧 We are getting close to `1.0` but this is still **pre-production software** at this point, see the **[current limitations](./CURRENT_LIMITATIONS.md)**.

**tql** is a TypeScript GraphQL query builder.

- **Codegen once** - regenerate your GraphQL API client only when your schema changes.
- **Fully type-safe** - take advantage of the full power of TypeScript's advanced type-system.
- **Backendless** - integrate with any existing GraphQL client.

## [Try it Out](https://codesandbox.io/s/tql-starwars-wlfg9?file=/src/index.ts&runonclick=1)

Try out our pre-compiled Star Wars GraphQL SDK on [CodeSandbox](https://codesandbox.io/s/tql-starwars-wlfg9?file=/src/index.ts&runonclick=1)!

## Installation

1. `npm install @timkendall/tql@beta`

   * **TypeScript 4.1+** is required for [Recursive Conditional Type](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types) support

2. Generate an SDK with `npx @timkendall/tql-gen <schema> > sdk.ts`


## Usage

Import selector functions to start defining queries 🎉

```typescript
import { useQuery } from '@apollo/client'

// SDK generated in previous setup
import { query, $ } from './starwars'

const QUERY = query((t) => [
  t.reviews({ episode: Episode.EMPIRE }, (t) => [
    t.stars(),
    t.commentary(),
  ]),

  t.human({ id: $('id') }, (t) => [
    t.__typename(),
    t.id(),
    t.name(),
    t.appearsIn(),
    t.homePlanet(),

    // @note Deprecated field should be properly picked-up by VSCode!
    t.mass(),

    t.friends((t) => <const>[
      t.__typename(),
      t.id(),
      t.name(),
      t.appearsIn(),

      t.on("Human", (t) => [t.homePlanet()]),
      t.on("Droid", (t) => [t.primaryFunction()]),
    ]),

    t.starships((t) => [t.id(), t.name()]),
  ]),
]).toQuery({ name: 'Example' })

// type-safe result and variables 👍
const { data } = useQuery(QUERY, { variables: { id: '1011' }})

```

## Inspiration

I was inspired by the features and DSL's of [graphql-nexus](https://github.com/graphql-nexus/schema), [graphql_ppx](https://github.com/mhallin/graphql_ppx), [gqless](https://github.com/gqless/gqless), and [caliban](https://github.com/ghostdogpr/caliban).

## License

MIT
