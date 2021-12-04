# Inline Fragments

- Use the provided `on(type: string)` selector on abstract (interface or union) types
- Convert any selection to an inline fragment with `Selection.toInlineFragment`
- Spread any selection into another ("virtual" fragments)

## Using the `on` selector

```typescript
import { query } from './sdk'

const QUERY = query(t => [
  t.search({ text: 'hans' }, t => [
    t.__typename(),

    t.on("Human", (t) => <const>[
      t.homePlanet()
    ]),
  ])
])
```

## Converting a selection with `toInlineFragment`

```typescript
import { character, query } from './sdk'

const FRAGMENT = character(t => [
  t.id(),
]).toInlineFragment()

const QUERY = query(t => [
  t.character({ id: '1001' }, t => [
    FRAGMENT,
  ])
])
```

## Spreading a selection


```typescript
import { character, query } from './sdk'

const CHARACTER_SELECTION = character(t => [
  t.id(),
])

const QUERY = query(t => [
  t.character({ id: '1001' }, t => [
    ...CHARACTER_SELECTION,
  ])
])
```