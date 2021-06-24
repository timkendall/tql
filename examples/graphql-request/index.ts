import { request, rawRequest } from "graphql-request";

import { Result } from "../../src";
import { IQuery, query } from "../../__tests__/starwars/starwars.sdk";
(async () => {
  const operation = query("Test", (t) => [
    t.character({ id: "1001" }, (t) => [t.__typename(), t.id(), t.name()]),
  ]);

  type Data = Result<IQuery, typeof operation["selectionSet"]>;

  const [result, rawResult] = await Promise.all([
    request<Data>("http://localhost:8080/graphql", operation.toDocument()),
    rawRequest<Data>("http://localhost:8080/graphql", operation.toString()),
  ]);

  console.log(`Found Character "${result.character?.name}"!`);
  console.log(`Found Character "${rawResult.data?.character?.name}" again!`);
})();
