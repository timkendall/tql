import { buildSchema } from "graphql";

const typeDefs = `
schema {
  query: query_root
  mutation: mutation_root
  subscription: subscription_root
}

type query_root {
  foo: String
}

type mutation_root {
  bar: Boolean
}

type subscription_root {
  baz: Int
}
`;

const schema = buildSchema(typeDefs);

console.log(schema.getQueryType()?.name);
console.log(schema.getMutationType()?.name);
console.log(schema.getSubscriptionType()?.name);
