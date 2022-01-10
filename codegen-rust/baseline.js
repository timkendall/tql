const fs = require('fs')
const graphql = require('graphql')

const schemaPath = process.argv[2]
const schema = fs.readFileSync(schemaPath, 'utf-8')

const ast = graphql.parse(schema)

ast.definitions.forEach(def => {
  if (def.kind === 'ObjectTypeDefinition') {
    console.log(def.name.value)
  }
})