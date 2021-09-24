# TQL

> Note: this is **pre-production software** at this point, see the **[current limitations](./CURRENT_LIMITATIONS.md)**.

**tql** is a TypeScript GraphQL query builder.

- **Codegen once** - regenerate your GraphQL API client only when your schema changes.
- **Fully type-safe** - take advantage of the full power of TypeScript's advanced type-system.
- **Backendless** - integrate with any existing GraphQL client.

## [Try it Out](https://repl.it/@timkendall/TQL-Starwars)

Try out our pre-compiled Star Wars GraphQL client on [Repl.it](https://repl.it/)! 

<img src=".github/assets/react.ts.png" width="500" />

## Quickstart

1. [Installation](#Installation)
1. [Usage](#Usage)
    1. [(Recommended) Usage](#recommended-usage)
    1. [Usage w/o Code-generation](#usage-wo-code-generation)
    1. [Basics](#basics)
        1. [Operations](#operations)
        1. [Variables](#variables)
        1. [Fragments](#fragments)
            1. [Inline](#inline)
            1. [Named](#named)
        1. [Directives](#directives)
    1. [Client Examples](#client-examples)
        1. [`@apollo/client`](#apollo-client)
        1. [`urql`](#urql)
        1. [`graphql-request`](#graphql-request)
1. [Optimize with Compile-time APQs](#optimize-with-compile-time-apqs)
1. [Generating GraphQL API SDKs](#generating-graphql-api-sdks)
    1. [CLI](#cli)
    1. [GitHub Action](#github-action)
1. [Performance & Benchmarks](#performance-and-benchmarks)
1. [Inspiration](#inspiration)
1. [License](#license)


## Installation

`npm install @timkendall/tql` or `yarn add @timkendall/tql` 

* **TypeScript 4.1+** is required for [Recursive Conditional Type](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types) support


## Usage

This is our top-level API that can be used w/o any code-generation steps. We recommend that you [learn how this API is used]() by our [**recommened generated API's**]().

```typescript
import { ObjectType, buildSelector, buildRootSelector, t, $, on, Result, Variables } from '@timkendall/tql'
```

### Recommended

The recommended way to use this library is to pre-compile your query builder API when your GraphQL schema changes. We have found this to generally provide the optimal developer experience. It also has runtime performance and type-saftey benefits (as types are not duplicated).


1. `tql <sdl|endpoint> > example.api.ts`.


Example ([Starwars](https://github.com/graphql/swapi-graphql) API):

```typescript
import { query } from './example.api'

const operation = query<'Example'>((t) => [
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
]).withName('Example');
```

### w/o Code-generation

We export a lower level `Selector` API that can be used without any code-generation step while still preserving type-saftey if desired. It makes use of runtime [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects so there is likely a performance impact (though I have not benchmarked this).

Example:

```typescript
import { print } from 'graphql'
import { ObjectType, buildRootSelector, buildSelector } from '@timkendall/tql'

interface Query extends ObjectType {
  user(variables: { id: string }): {
    id: string
  }
}

interface User extends ObjectType {
  id: string
  name: string
  age: number
}

const query = buildRootSelector<Query>();
const user = buildSelector<User>()

const fields = user(t => [ t.id(), t.name(), t.age() ])
const fragment = fields.toFragment('UserFieldsFragment')

const serialized = print(query((t) => [
  t.user({ id: "foo" }, (t) => [
    t.id(),
    ...fields,
    // or inline fragment
    fields.toFragment(),
    // or named fragment
    fragment,
  ]),
]));

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

#### `selectable`

We also export a `selectable` function as a way to interact with selectors on individual objects (`buildRootSelector` and `buildSelector` use this internally).

```typescript
import { selectable, selectionSet } from '@timkendall/tql'

interface Query {
  foo: string;
  bar: number;
  baz: {
    id: string;
  };
}

const { foo, bar, baz } = selectable<Query>();

const selection = [foo(), bar(), baz((t) => [t.id()])];

type ExampleResult = Result<Query, SelectionSet<typeof selection>>;

const query = print(selectionSet(selection));

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

### Basics

`tql` is a thin wrapper over the [canoncial TypeScript GraphQL implementation](). Here we detail the convenience API's we offer for building type-safe operations in TypeScript.

#### Operations

Operations are provided via the generated (or [manually defined]()) root-level type selectors of `query`, `mutation`, and `subscription`.

```typescript
import { query, mutation, subscription } from './sdk'

const read = query((t) => [
  t.user({ id: $('userId') }, t => [
    t.id(),
    t.name(),
  ])
]) // TypedDocumentNode

const write = mutation((t) => [
  t.createUser({ input: $('input') }, t => [ t.id() ])
]) // TypedDocumentNode

const subscribe = query((t) => [
  t.onUser({ operation: 'CREATE' }, t => [ t.timestamp() ])
]) // TypedDocumentNode
```

#### Variables

Variables are automatically infered from operation defintions.

```typescript
import { query, $, Variables, Schema } from './sdk'

const example = query((t) => [
  t.user({ id: $('userId') }, t => [
    t.id(),
    t.name(),
  ])
])

const variables: Variables<Schema, typeof example> = { userId: 'foo' }
```

#### Fragments

Not yet implemented.

#### Directives

Not yet implemented.

### Client Examples

TODO

### Generation GraphQL API SDK's

The overall goal of `tql` is to support the creation of [GraphQL API SDKs]().

#### CLI

TODO

#### GitHub Action

TODO

### Performance & Benchmarks

Runtime comparisons to possible subsitutes (largely pulled from [awesome-fluent-graphql](https://github.com/hasura/awesome-fluent-graphql)).

|  Library |  Version  | CPU | Memory | Ops/second |
|---|---|---|---|---|
| `graphql-tag`  |   |   |   |   |
| `relay`  |   |   |   |   |
| [`gqty`](https://github.com/gqty-dev/gqty) (formerly [`gqless`](https://github.com/gqless/gqless)) |   |   |   |   |


## Development

The module structure is relatively flat and can be grouped into three general categories.

- Type-aware AST building 
- Selector API (i.e higer-level convenience API over the type-aware AST one)
- Dynamic and static selector builders

Primary modules:

- [`AST.ts`]() - Type-aware extensions of [graphql-js AST interfaces](https://github.com/graphql/graphql-js/blob/main/src/language/ast.ts)
- [`Selector.ts`]() - DSL for dynamically constructing type-safe selections
- [`Variables.ts`]() - Utility type for deriving variables from an operation
- [`Result.ts`]() - Utility type for deriving the result type from an operation

## Inspiration

I was inspired by the features and DSL's of [graphql-nexus](https://github.com/graphql-nexus/schema), [graphql_ppx](https://github.com/mhallin/graphql_ppx), [gqless](https://github.com/gqless/gqless), and [caliban](https://github.com/ghostdogpr/caliban).

## License

MIT
