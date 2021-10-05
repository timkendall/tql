import { UnionToIntersection, Simplify, ConditionalPick } from "type-fest";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  buildRootSelector,
  buildRootDocumentSelector,
  $,
  Result,
  Variables,
  ObjectType,
} from "../src";

test("Starwars", () => {
  enum Episode {
    NEWHOPE = "NEWHOPE",
    EMPIRE = "EMPIRE",
    JEDI = "JEDI",
  }

  interface Character {
    __typename: "Droid" | "Human"; // ?
    id: string;
    name: string;
    friends: Array<Character | null> | null;
    friendsConnection(variables: {
      first?: number;
      after?: string;
    }): FriendsConnection;
    appearsIn: Array<Episode | null>;
  }

  interface Droid extends Character {
    __typename: "Droid";
    primaryFunction: string | null;
  }

  interface Human extends Character {
    __typename: "Human";
    homePlanet: string | null;
    mass: number | null;
    starships: Array<Starship | null> | null;
  }

  enum LengthUnit {
    METER = "METER",
    FOOT = "FOOT",
  }

  interface Starship {
    __typename: "Starship";
    id: string;
    name: string;
    length(variables: { unit: LengthUnit }): number | null;
    coordinates: Array<Array<number>> | null;
  }

  interface FriendsConnection {
    totalCount: number | null;
    edges: Array<FriendsEdge | null> | null;
    friends: Array<Character | null> | null;
    pageInfo: PageInfo;
  }

  interface FriendsEdge {
    cursor: string;
    node: Character | null;
  }

  interface PageInfo {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
  }

  interface Review {
    stars: number;
    commentary: string | null;
  }

  type SearchResult = Human | Droid | Starship;

  interface Query {
    hero(variables: { episode?: Episode }): Character;
    reviews(variables: { episode: Episode }): Array<Review | null> | null;
    search(variables: { text?: string }): Array<SearchResult | null> | null;
    character(variables: { id: string }): Character | null;
    human(variables: { id: string }): Human | null;
    droid(variables: { id: string }): Droid | null;
    starship(variables: { id: string }): Starship | null;
  }

  // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
  // https://stackoverflow.com/questions/58584071/how-to-filter-union-of-object-type-by-property-in-typescript
  type OfUnion<T extends { __typename: string }> = {
    [P in T["__typename"]]: Extract<T, { __typename: P }>;
  };
  type SearchResultTypes = OfUnion<SearchResult>;
  type StarshipMember = Extract<SearchResult, { __typename: "Starship" }>;

  type TypeMap = {
    SearchResult: SearchResult;
    Character: Character;
    Human: Human;
    Droid: Droid;
    Starship: Starship;
  };

  const client = new ApolloClient({ cache: new InMemoryCache() });

  // const query = buildRootSelector<Query>('query', {/* schema */} as any)
  // //.withName('Example');
  const query = buildRootDocumentSelector<Query, TypeMap>("query", {
    /* schema; eventually our own `Schema` representation? */
  } as any);

  // type Data = Result<Query, typeof example['selectionSet']>
  // // @question have `Variable` type look at Operation['variableDefinitions'] directly for brevity?
  // type Vars = Variables<Query, typeof example['selectionSet']>

  const example = query((t) => [
    t.reviews({ episode: $("reviewEpisode") }, (t) => [
      t.stars(),
      t.commentary(),
    ]),

    t.human({ id: "1002" }, (t) => [
      t.__typename(),
      t.id(),
      t.name(),
      t.appearsIn(),
      t.homePlanet(),

      // @note Deprecated field should be properly picked-up by VSCode!
      t.mass(),

      t.friends((t) => [
        t.__typename(),
        t.id(),
        t.name(),
        t.appearsIn(),

        t.on("Human", (t) => [t.__typename(), t.homePlanet()]),
        t.on("Droid", (t) => [t.__typename(), t.primaryFunction()]),
      ]),

      t.starships((t) => [t.id(), t.name()]),
    ]),

    t.character({ id: "foo" }, (t) => [
      t.id(),
      t.friends((t) => [
        t.__typename(),
        t.id(),

        t.on("Droid", (t) => [t.primaryFunction()]),
        t.on("Human", (t) => [t.homePlanet()]),
      ]),
    ]),

    t.search({ text: "" }, (t) => [
      t.__typename(),

      t.id(),
      t.name(),

      // Possible TS issue? https://github.com/microsoft/TypeScript/issues/33591
      t.on("Droid", (t) => [t.primaryFunction()]),
      t.on("Human", (t) => [t.homePlanet()]),
    ]),
  ]);

  const result = client.query({
    query: example,
    variables: { episode: Episode.EMPIRE },
  });

  result.then(({ data }) => {
    data.reviews?.map((review) => review?.stars);

    // @todo need to update `Result` to correctly derive fields from `InlineFragment`s
    data.search?.map((result) => result?.name);
    data.character?.friends?.map((result) => result?.id);
  });
});
