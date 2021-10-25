# Design

This document details the high-level design of the library inlcuding compile-time and runtime components. We do our best to adhere to the following design goals:

- **Minimal DSL** - Provide the most minimal DSL that still enables ergonomic type-safe query building.
- **0-Cost Runtime** - Erase any runtime cost of query construction.
- **Pluggable Backends** - This library is not concerned with how an operation is executed.

- [1. Selector Compilation](1-selector-compilation)
- [2. Typed AST Generation](2-typed-ast-generation)
- [3. `Result` and `Variables` Types](3-result-and-variables-types)

## 1. Selector Compilation

Selectors are simply objects that mirror your API types.

Example:

```graphql
type User {
  id: ID!
  firstName: String!
  lastName: String
}
```

```typescript
const UserSelector = {
  id: () => field('id'),
  firstName: () => field('firstName'),
  lastName: () => field('lastName')
}

const user = (select: <T extends Array<Selection>(selector: typeof UserSelector) => T) => SelectionSet<T>
```

## 2. Typed AST Generation

We extend each of the AST nodes defined in [`graphql/language/ast`](https://github.com/graphql/graphql-js/blob/main/src/language/ast.ts) to accept type parameters so that our `Result` and `Variable` types can work their magic.

Example:

```typescript
import type { FieldNode } from 'graphql/language/ast'

export interface Field<
  Name extends string,
  Arguments extends Array<Argument<string, any>> | undefined = undefined,
  SS extends SelectionSet<any> | undefined = undefined
> extends FieldNode {
  name: { kind: "Name"; value: Name };
  arguments?: Arguments;
  selectionSet?: SS;
}
```

## 3. `Result` and `Variables` Types

We provide the `Result` and `Variables` utility types that can be used to derive the associated result and variable types of an operation defined with tql.

Example:

```typescript
import type { Result, Variables } from '@timkendall/tql'

import { query } from './generated/sdk'

const VIEWER_QUERY = query(t => [
  t.viewer(t => [
    t.id(),
    t.firstName(),
    t.lastName(),
  ])
])

type ViewerResult = Result<typeof VIEWER_QUERY> // { id: string, firstName: string, lastName: string | null }
type ViewerVariables = Variables<typeof VIEWER_QUERY> // {}
```
