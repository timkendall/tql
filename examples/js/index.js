const { selector, operation } = require('../../dist')

// build a Selector object
const Query = selector()
// build an Operation builder
const query = operation('query', Query)
// build an example "query" operation
const example = query("example", (t) => [
  t.foo(),
  t.bar(),
  t.baz({ id: 'foo' }, (t) => [
    t.id()
  ]),
]);

console.log(example.toString())