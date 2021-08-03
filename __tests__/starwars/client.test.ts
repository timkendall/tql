import { Executor } from "../../src";
import { Episode, Starwars } from "./starwars.sdk";

describe("Starwars SDK Client", () => {
  const starwars = new Starwars(new Executor({ uri: "http://localhost:8080" }));

  it.skip("returns type-safe results", async () => {
    const reviews = await starwars.query.reviews(
      { episode: Episode.EMPIRE },
      (t) => [t.stars(), t.commentary()]
    );

    expect(reviews?.map((t) => t)).toBeInstanceOf(Array);
  });
});
