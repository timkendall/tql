import { query } from "./github.api";

export const viewer = query("Viewer", (t) => [
  t.viewer((t) => [
    t.name(),
    t.twitterUsername(),
    t.status((t) => [t.emoji(), t.expiresAt()]),

    t.repositories({ first: 3 }, (t) => [
      t.pageInfo((t) => [
        t.endCursor(),
        t.startCursor(),
        t.hasNextPage(),
        t.hasPreviousPage(),
      ]),

      t.nodes((t) => [t.__typename(), t.id(), t.name(), t.createdAt()]),

      t.edges((t) => [t.cursor(), t.node((t) => [t.id()])]),
    ]),
  ]),
]);
