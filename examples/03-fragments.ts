import type { SelectionSet } from '../src'

import { query, LengthUnit, ISchema, IQuery, Result } from './generated'

// @important TypeScript will be unable to infer our result type unless
// the `<const>` assertion is provided on the selection that includes fragments!
const ExampleQuery = query(t => [
  // example union selection
  t.search({ text: 'Foo'}, t => <const>[
    t.__typename(),
    
    t.on('Droid', t => [
      t.primaryFunction(),
    ]),

    t.on('Human', t => [
      t.homePlanet(),
    ]),

    t.on('Starship', t => [
      t.length({ unit: LengthUnit.CUBIT })
    ])
  ]),

  // example interface selection
  t.character({ id: '001'}, t => [
    t.__typename(),
    t.id(),

    t.friends(t => <const>[
      t.__typename(),

      t.on('Droid', t => [
        t.primaryFunction()
      ]),

      t.on('Human', t => [
        t.homePlanet(),
      ]),
    ])
  ])
])

const result = {} as Result<ISchema, IQuery, SelectionSet<typeof ExampleQuery>>

// infered properly as `"Droid" | "Human" | "Starship" | undefined`
result.search?.[0].__typename

// exhaustive branches are computed properly
if (result.search?.[0].__typename === 'Droid') {
  // `__typename` is narrowed properly to `"Droid"`
  result.search[0].__typename
  result.search[0].primaryFunction
} else if (result.search?.[0].__typename === 'Human') {
  // `__typename` is narrowed properly to `"Human"`
  result.search[0].__typename
  result.search[0].homePlanet
} else {
  // `__typename` is narrowed properly to `"Starship" | undefined`
  result.search?.[0].__typename
  result.search?.[0].length
}



// infered properly as `"Droid" | "Human" | undefined`
result.character?.__typename
result.character?.id

// exhaustive branches are computed properly
if (result.character?.__typename === 'Droid') {
   // `__typename` is narrowed properly to `"Droid"`
  result.character.__typename
}

// nested inference works as well
if (result.character?.friends?.[0].__typename === 'Droid') {
  result.character.friends[0].primaryFunction
} else {
  result.character?.friends?.[0].homePlanet
}