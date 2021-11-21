# TQL

**tql** is a TypeScript GraphQL query builder.

- **Codegen once** - regenerate your GraphQL API client only when your schema changes.
- **Fully type-safe** - take advantage of the full power of TypeScript's advanced type-system.
- **Backendless** - integrate with any existing GraphQL client.

## [Try it Out](https://repl.it/@timkendall/TQL-Starwars)

Try out our pre-compiled Star Wars GraphQL client on [Repl.it](https://repl.it/)!

## Installation

`npm install @timkendall/tql`

* **TypeScript 4.1+** is required for [Recursive Conditional Type](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types) support

## Usage

1. []()
1. []


## Usage

You will need to compile a type-safe client one time before using. Do this with the provided CLI:

`yarn --silent tql <schema> > api.ts`.


```typescript
import { SDK, $ } from '@timkendall/tql'
import { request } from 'graphql-request'
import { useQuery } from '@apollo/client'

// if pre-compiled (a little painful but best other than that!)
// import { $, query } from './starwars'

// using custom ES module loader... (requires changes to prod config unless Node starts supporting native HTTP URL modules like Deno)
// import { SDK } from 'https://api.macromon.app/' // configured middleware
// import { SDK } from 'https://get.tql.io/?api=api.macromon.app' // hosted proxy

// @note you will need to have configured the TypeScript compiler plugin
// for this to work. The compiler plugin is simply a convienience method
// for initiating codegen (run once per compiler processes; no source* code is emitted).
//
// For production applications we generally recommend pre-compiling your
// sdk and publishing/importing it from a package registry.
const { query } = new SDK<'./starwars.graphql'>({/* custom serde */})
// const { query } = createSDK<'./starwars.graphql'>()

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

    t.friends((t) => [
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

const { data } = request('https://graphql.org/swapi-graphql/', QUERY, { id: '1011' })

// or

const { data } = useQuery(QUERY, { variables: { id: '1011' }})

```

## Inspiration

I was inspired by the features and DSL's of [graphql-nexus](https://github.com/graphql-nexus/schema), [graphql_ppx](https://github.com/mhallin/graphql_ppx), [gqless](https://github.com/gqless/gqless), and [caliban](https://github.com/ghostdogpr/caliban).

## License

MIT
