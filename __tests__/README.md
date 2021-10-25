# Integration Tests

We use the canonical [graphql/swapi-graphql](https://github.com/graphql/swapi-graphql) API as our top-level integration tests. You can configure the test suite to run against your own schema by following the instructions below. If you find a bug please [open an issue](https://github.com/timkendall/tql/issues/new)!.

## Running

`yarn test:int <schema>` (defaults to the Starwars schema defined here)