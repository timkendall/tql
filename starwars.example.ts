import { Executor } from "./src";
import { Starwars } from "./starwars.api";
(async () => {
  const starwars = new Starwars(new Executor({ uri: "" }));

  const character = await starwars.query.character({ id: "frf" }, (t) => [
    t.__typename(),
    t.id(),
    t.friendsConnection({ first: 3 }, (t) => [
      t.totalCount(),
      t.friends((t) => [t.id()]),
    ]),

    t.on("Droid", (t) => [t.primaryFunction()]),
  ]);

  character.data.character.__typename;
  character.data.character.id;
  character.data.character.friendsConnection.totalCount;
})();
