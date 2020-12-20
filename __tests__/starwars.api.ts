import {
  NamedType,
  Argument,
  Value,
  Field,
  InlineFragment,
  Operation,
  Selection,
  SelectionSet,
  Variable,
} from "../src";

export enum Episode {
  NEWHOPE = "NEWHOPE",
  EMPIRE = "EMPIRE",
  JEDI = "JEDI",
}

export enum LengthUnit {
  METER = "METER",
  FOOT = "FOOT",
  CUBIT = "CUBIT",
}

export interface ReviewInput {
  stars: unknown;
  commentary?: unknown;
  favorite_color?: unknown;
}

export interface ColorInput {
  red: unknown;
  green: unknown;
  blue: unknown;
}

type ISearchResult = IHuman | IDroid | IStarship;

interface SearchResultSelector {
  __typename: () => Field<"__typename">;

  on: <T extends Array<Selection>, F extends "Human" | "Droid" | "Starship">(
    type: F,
    select: (
      t: F extends "Human"
        ? HumanSelector
        : F extends "Droid"
        ? DroidSelector
        : F extends "Starship"
        ? StarshipSelector
        : never
    ) => T
  ) => InlineFragment<NamedType<F, any>, SelectionSet<T>>;
}

export const SearchResult: SearchResultSelector = {
  __typename: () => new Field("__typename"),

  on: (type, select) => {
    switch (type) {
      case "Human": {
        return new InlineFragment(
          new NamedType("Human") as any,
          new SelectionSet(select(Human as any))
        );
      }

      case "Droid": {
        return new InlineFragment(
          new NamedType("Droid") as any,
          new SelectionSet(select(Droid as any))
        );
      }

      case "Starship": {
        return new InlineFragment(
          new NamedType("Starship") as any,
          new SelectionSet(select(Starship as any))
        );
      }

      default:
        throw new Error("Unknown type!");
    }
  },
};

export interface IQuery {
  hero: ICharacter;
  reviews: IReview[];
  search: ISearchResult[];
  character: ICharacter;
  droid: IDroid;
  human: IHuman;
  starship: IStarship;
}

interface QuerySelector {
  __typename: () => Field<"__typename">;

  hero: <T extends Array<Selection>>(
    variables: { episode?: Variable<"episode"> | Episode },
    select: (t: CharacterSelector) => T
  ) => Field<
    "hero",
    [Argument<"episode", Variable<"episode"> | Episode>],
    SelectionSet<T>
  >;

  reviews: <T extends Array<Selection>>(
    variables: { episode?: Variable<"episode"> | Episode },
    select: (t: ReviewSelector) => T
  ) => Field<
    "reviews",
    [Argument<"episode", Variable<"episode"> | Episode>],
    SelectionSet<T>
  >;

  search: <T extends Array<Selection>>(
    variables: { text?: Variable<"text"> | string },
    select: (t: SearchResultSelector) => T
  ) => Field<
    "search",
    [Argument<"text", Variable<"text"> | string>],
    SelectionSet<T>
  >;

  character: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: CharacterSelector) => T
  ) => Field<
    "character",
    [Argument<"id", Variable<"id"> | string>],
    SelectionSet<T>
  >;

  droid: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: DroidSelector) => T
  ) => Field<
    "droid",
    [Argument<"id", Variable<"id"> | string>],
    SelectionSet<T>
  >;

  human: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: HumanSelector) => T
  ) => Field<
    "human",
    [Argument<"id", Variable<"id"> | string>],
    SelectionSet<T>
  >;

  starship: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: StarshipSelector) => T
  ) => Field<
    "starship",
    [Argument<"id", Variable<"id"> | string>],
    SelectionSet<T>
  >;
}

export const Query: QuerySelector = {
  __typename: () => new Field("__typename"),

  hero: (variables, select) =>
    new Field(
      "hero",
      [new Argument("episode", variables.episode, Episode)],
      new SelectionSet(select(Character))
    ),

  reviews: (variables, select) =>
    new Field(
      "reviews",
      [new Argument("episode", variables.episode, Episode)],
      new SelectionSet(select(Review))
    ),

  search: (variables, select) =>
    new Field(
      "search",
      [new Argument("text", variables.text)],
      new SelectionSet(select(SearchResult))
    ),

  character: (variables, select) =>
    new Field(
      "character",
      [new Argument("id", variables.id)],
      new SelectionSet(select(Character))
    ),

  droid: (variables, select) =>
    new Field(
      "droid",
      [new Argument("id", variables.id)],
      new SelectionSet(select(Droid))
    ),

  human: (variables, select) =>
    new Field(
      "human",
      [new Argument("id", variables.id)],
      new SelectionSet(select(Human))
    ),

  starship: (variables, select) =>
    new Field(
      "starship",
      [new Argument("id", variables.id)],
      new SelectionSet(select(Starship))
    ),
};

export interface IMutation {
  createReview: IReview;
}

interface MutationSelector {
  __typename: () => Field<"__typename">;

  createReview: <T extends Array<Selection>>(
    variables: {
      episode?: Variable<"episode"> | Episode;
      review?: Variable<"review"> | unknown;
    },
    select: (t: ReviewSelector) => T
  ) => Field<
    "createReview",
    [
      Argument<"episode", Variable<"episode"> | Episode>,
      Argument<"review", Variable<"review"> | unknown>
    ],
    SelectionSet<T>
  >;
}

export const Mutation: MutationSelector = {
  __typename: () => new Field("__typename"),

  createReview: (variables, select) =>
    new Field(
      "createReview",
      [
        new Argument("episode", variables.episode, Episode),
        new Argument("review", variables.review),
      ],
      new SelectionSet(select(Review))
    ),
};

export interface ICharacter {
  __typename: string;
  id: string;
  name: string;
  friends: ICharacter[];
  friendsConnection: IFriendsConnection;
  appearsIn: Episode[];
}

interface CharacterSelector {
  __typename: () => Field<"__typename">;

  id: () => Field<"id">;
  name: () => Field<"name">;

  friends: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  friendsConnection: <T extends Array<Selection>>(
    variables: {
      first?: Variable<"first"> | number;
      after?: Variable<"after"> | string;
    },
    select: (t: FriendsConnectionSelector) => T
  ) => Field<
    "friendsConnection",
    [
      Argument<"first", Variable<"first"> | number>,
      Argument<"after", Variable<"after"> | string>
    ],
    SelectionSet<T>
  >;

  appearsIn: () => Field<"appearsIn">;

  on: <T extends Array<Selection>, F extends "Human" | "Droid">(
    type: F,
    select: (
      t: F extends "Human"
        ? HumanSelector
        : F extends "Droid"
        ? DroidSelector
        : never
    ) => T
  ) => InlineFragment<NamedType<F, any>, SelectionSet<T>>;
}

export const Character: CharacterSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  name: () => new Field("name"),

  friends: (select) =>
    new Field(
      "friends",
      undefined as never,
      new SelectionSet(select(Character))
    ),

  friendsConnection: (variables, select) =>
    new Field(
      "friendsConnection",
      [
        new Argument("first", variables.first),
        new Argument("after", variables.after),
      ],
      new SelectionSet(select(FriendsConnection))
    ),

  appearsIn: () => new Field("appearsIn"),

  on: (type, select) => {
    switch (type) {
      case "Human": {
        return new InlineFragment(
          new NamedType("Human") as any,
          new SelectionSet(select(Human as any))
        );
      }

      case "Droid": {
        return new InlineFragment(
          new NamedType("Droid") as any,
          new SelectionSet(select(Droid as any))
        );
      }

      default:
        throw new Error("Unknown type!");
    }
  },
};

export interface IHuman extends ICharacter {
  __typename: "Human";
  homePlanet: string;
  height: number;
  mass: number;
  starships: IStarship[];
}

interface HumanSelector {
  __typename: () => Field<"__typename">;

  id: () => Field<"id">;
  name: () => Field<"name">;
  homePlanet: () => Field<"homePlanet">;
  height: (variables: { unit: unknown }) => Field<"height", [/* @todo */]>;
  mass: () => Field<"mass">;

  friends: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  friendsConnection: <T extends Array<Selection>>(
    variables: {
      first?: Variable<"first"> | number;
      after?: Variable<"after"> | string;
    },
    select: (t: FriendsConnectionSelector) => T
  ) => Field<
    "friendsConnection",
    [
      Argument<"first", Variable<"first"> | number>,
      Argument<"after", Variable<"after"> | string>
    ],
    SelectionSet<T>
  >;

  appearsIn: () => Field<"appearsIn">;

  starships: <T extends Array<Selection>>(
    select: (t: StarshipSelector) => T
  ) => Field<"starships", never, SelectionSet<T>>;
}

export const isHuman = (
  object: Record<string, any>
): object is Partial<IHuman> => {
  return object.__typename === "Human";
};

export const Human: HumanSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  name: () => new Field("name"),
  homePlanet: () => new Field("homePlanet"),
  height: (variables) => new Field("height"),

  /**
   * @deprecated Weight is a sensitive subject!
   */
  mass: () => new Field("mass"),

  friends: (select) =>
    new Field(
      "friends",
      undefined as never,
      new SelectionSet(select(Character))
    ),

  friendsConnection: (variables, select) =>
    new Field(
      "friendsConnection",
      [
        new Argument("first", variables.first),
        new Argument("after", variables.after),
      ],
      new SelectionSet(select(FriendsConnection))
    ),

  appearsIn: () => new Field("appearsIn"),

  starships: (select) =>
    new Field(
      "starships",
      undefined as never,
      new SelectionSet(select(Starship))
    ),
};

export interface IDroid extends ICharacter {
  __typename: "Droid";
  primaryFunction: string;
}

interface DroidSelector {
  __typename: () => Field<"__typename">;

  id: () => Field<"id">;
  name: () => Field<"name">;

  friends: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  friendsConnection: <T extends Array<Selection>>(
    variables: {
      first?: Variable<"first"> | number;
      after?: Variable<"after"> | string;
    },
    select: (t: FriendsConnectionSelector) => T
  ) => Field<
    "friendsConnection",
    [
      Argument<"first", Variable<"first"> | number>,
      Argument<"after", Variable<"after"> | string>
    ],
    SelectionSet<T>
  >;

  appearsIn: () => Field<"appearsIn">;
  primaryFunction: () => Field<"primaryFunction">;
}

export const isDroid = (
  object: Record<string, any>
): object is Partial<IDroid> => {
  return object.__typename === "Droid";
};

export const Droid: DroidSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  name: () => new Field("name"),

  friends: (select) =>
    new Field(
      "friends",
      undefined as never,
      new SelectionSet(select(Character))
    ),

  friendsConnection: (variables, select) =>
    new Field(
      "friendsConnection",
      [
        new Argument("first", variables.first),
        new Argument("after", variables.after),
      ],
      new SelectionSet(select(FriendsConnection))
    ),

  appearsIn: () => new Field("appearsIn"),
  primaryFunction: () => new Field("primaryFunction"),
};

export interface IFriendsConnection {
  totalCount: number;
  edges: IFriendsEdge[];
  friends: ICharacter[];
  pageInfo: IPageInfo;
}

interface FriendsConnectionSelector {
  __typename: () => Field<"__typename">;

  totalCount: () => Field<"totalCount">;

  edges: <T extends Array<Selection>>(
    select: (t: FriendsEdgeSelector) => T
  ) => Field<"edges", never, SelectionSet<T>>;

  friends: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  pageInfo: <T extends Array<Selection>>(
    select: (t: PageInfoSelector) => T
  ) => Field<"pageInfo", never, SelectionSet<T>>;
}

export const FriendsConnection: FriendsConnectionSelector = {
  __typename: () => new Field("__typename"),

  totalCount: () => new Field("totalCount"),

  edges: (select) =>
    new Field(
      "edges",
      undefined as never,
      new SelectionSet(select(FriendsEdge))
    ),

  friends: (select) =>
    new Field(
      "friends",
      undefined as never,
      new SelectionSet(select(Character))
    ),

  pageInfo: (select) =>
    new Field(
      "pageInfo",
      undefined as never,
      new SelectionSet(select(PageInfo))
    ),
};

export interface IFriendsEdge {
  cursor: string;
  node: ICharacter;
}

interface FriendsEdgeSelector {
  __typename: () => Field<"__typename">;

  cursor: () => Field<"cursor">;

  node: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"node", never, SelectionSet<T>>;
}

export const FriendsEdge: FriendsEdgeSelector = {
  __typename: () => new Field("__typename"),

  cursor: () => new Field("cursor"),

  node: (select) =>
    new Field("node", undefined as never, new SelectionSet(select(Character))),
};

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
}

interface PageInfoSelector {
  __typename: () => Field<"__typename">;

  startCursor: () => Field<"startCursor">;
  endCursor: () => Field<"endCursor">;
  hasNextPage: () => Field<"hasNextPage">;
}

export const PageInfo: PageInfoSelector = {
  __typename: () => new Field("__typename"),

  startCursor: () => new Field("startCursor"),
  endCursor: () => new Field("endCursor"),
  hasNextPage: () => new Field("hasNextPage"),
};

export interface IReview {
  stars: number;
  commentary: string;
}

interface ReviewSelector {
  __typename: () => Field<"__typename">;

  stars: () => Field<"stars">;
  commentary: () => Field<"commentary">;
}

export const Review: ReviewSelector = {
  __typename: () => new Field("__typename"),

  stars: () => new Field("stars"),
  commentary: () => new Field("commentary"),
};

export interface IStarship {
  id: string;
  name: string;
  length: number;
  coordinates: number[];
}

interface StarshipSelector {
  __typename: () => Field<"__typename">;

  id: () => Field<"id">;
  name: () => Field<"name">;
  length: (variables: { unit: unknown }) => Field<"length", [/* @todo */]>;
  coordinates: () => Field<"coordinates">;
}

export const Starship: StarshipSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  name: () => new Field("name"),
  length: (variables) => new Field("length"),
  coordinates: () => new Field("coordinates"),
};

export const query = <T extends Array<Selection>>(
  name: string,
  select: (t: typeof Query) => T
): Operation<SelectionSet<T>> =>
  new Operation(name, "query", new SelectionSet(select(Query)));
