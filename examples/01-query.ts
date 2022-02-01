import type { SelectionSet } from '../src'

import { query, ISchema, IQuery, Result } from './generated'

const ExampleQuery = query(t => [
  t.droid({ id: '001' }, t => [
    t.__typename(),
    t.id(),
    t.name(),
    t.primaryFunction(),
  ])
])

const result = {} as Result<ISchema, IQuery, SelectionSet<typeof ExampleQuery>>

result.droid?.id
result.droid?.name
result.droid?.primaryFunction