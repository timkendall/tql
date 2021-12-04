# Variables

Variables definitions can be created with the `$` helper.

```typescript
import { query, $ } from './sdk'

const QUERY = query(t => [
  t.character({ id: $('characterId') }, t => [
    t.id()
  ])
])
```