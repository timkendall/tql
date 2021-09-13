# TQL

> Note: this is **pre-production software** at this point, see the **[current limitations](./CURRENT_LIMITATIONS.md)**.

**tql** is a TypeScript GraphQL query builder.

- **Codegen once** - regenerate your GraphQL API client only when your schema changes.
- **Fully type-safe** - take advantage of the full power of TypeScript's advanced type-system.
- **Backendless** - integrate with any existing GraphQL client.

## [Try it Out](https://repl.it/@timkendall/TQL-Starwars)

Try out our pre-compiled Star Wars GraphQL client on [Repl.it](https://repl.it/)! 

<img src=".github/assets/react.ts.png" width="500" />

## Installation

`npm install @timkendall/tql` or `yarn add @timkendall/tql` 

* **TypeScript 4.1+** is required for [Recursive Conditional Type](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types) support


## Usage

1. [(Recommended) Usage w/Pre-compiled Selectors]()
1. [`Selector` API]()
1. [Example Client Usage]()
    1. [`@apollo/client`]()
    1. [`urql`]()
    1. [`graphql-request`]()
1. [(Optional) Compile-time APQ]()
1. [Generating GraphQL SDKs]()
    1. [CLI]()
    1. [GitHub Action]()


### (Recommended) Usage w/Pre-compiled Selectors

The recommended way to use this library is to pre-compile your query builder API (vs. using the lower-level/dynamic `Selector` API). We have found this to generally provide the optimal developer experience. It also has runtime performance and type-saftey benefits (as types are not duplicated).

You will need to compile a type-safe client one time before using. Do this with the provided CLI:
`yarn --silent tql <schema SDL or GraphQL HTTP API endpoint> > example.api.ts`.

Here is what the Starwars GraphQL API looks like:

```typescript
import { query } from './example.api'

const operation = query("Example", (t) => [
  t.reviews({ episode: Episode.EMPIRE }, (t) => [
    t.stars(),
    t.commentary(),
  ]),

  t.human({ id: "1002" }, (t) => [
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
]);
```

### `Selector` API

We export a lower level `Selector` API that can be used without any code-generation step while still preserving type-saftey if desired. It makes use of runtime [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects so there is likely a performance impact (though I have not benchmarked this).

Example:

```typescript
import { Selector } from '@timkendall/tql'

interface Query {
  user(id: string): {
    id: string
  }
}

const selector = new Selector<Query>((t) => [
  t.user({ id: "foo" }, (t) => [t.id()]),
]);

const query = print(selector.toSelectionSet().ast);

/*
{
  foo
  bar
  baz {
    id
  }
}
*/
```

#### `selector`

Alternatively a `selector` function is exported to offer a more functional API.

```typescript
import { selector } from '@timkendall/tql'

interface Query {
  foo: string;
  bar: number;
  baz: {
    id: string;
  };
}

const { foo, bar, baz } = selector<Query>();

const selection = [foo(), bar(), baz((t) => [t.id()])];

type ExampleResult = Result<Query, SelectionSet<typeof selection>>;

const query = print(new SelectionSet(selection).ast);

/*
{
  foo
  bar
  baz {
    id
  }
}
*/
```


## Inspiration

I was inspired by the features and DSL's of [graphql-nexus](https://github.com/graphql-nexus/schema), [graphql_ppx](https://github.com/mhallin/graphql_ppx), [gqless](https://github.com/gqless/gqless), and [caliban](https://github.com/ghostdogpr/caliban).

## License

MIT
