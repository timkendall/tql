# Operations

## Example

```typescript
import { query } from './sdk'

const QUERY = query(t => [
  t.viewer(t => [
    t.id()
  ])
]).toOperation({ name: 'Viewer' })
```