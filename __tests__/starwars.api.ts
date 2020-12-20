import {
  Argument,
  Value,
  Field,
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

// "SearchResult" is a union type and not supported

export interface IQuery {
  hero: ICharacter;
  reviews: IReview[];
  search: any;
  character: ICharacter;
  droid: IDroid;
  human: IHuman;
  starship: IStarship;
}

export const Query = {
  hero: <T extends Array<Field<any, any, any>>>(
    variables: { episode?: Variable<"episode"> | Episode },
    select: (t: typeof Character) => T
  ) =>
    new Field(
      "hero",
      [new Argument("episode", variables.episode, Episode)],
      new SelectionSet(select(Character))
    ),

  reviews: <T extends Array<Field<any, any, any>>>(
    variables: { episode?: Variable<"episode"> | Episode },
    select: (t: typeof Review) => T
  ) =>
    new Field(
      "reviews",
      [new Argument("episode", variables.episode, Episode)],
      new SelectionSet(select(Review))
    ),

  // search: <T extends Array<Field<any, any, any>>>(
  //   variables: { text?: Variable<"text"> | string },
  //   select: (t: typeof SearchResult) => T
  // ) =>
  //   new Field(
  //     "search",
  //     [new Argument("text", variables.text)],
  //     new SelectionSet(select(SearchResult))
  //   ),

  character: <T extends Array<Field<any, any, any>>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: typeof Character) => T
  ) =>
    new Field(
      "character",
      [new Argument("id", variables.id)],
      new SelectionSet(select(Character))
    ),

  droid: <T extends Array<Field<any, any, any>>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: typeof Droid) => T
  ) =>
    new Field(
      "droid",
      [new Argument("id", variables.id)],
      new SelectionSet(select(Droid))
    ),

  human: <T extends Array<Field<any, any, any>>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: typeof Human) => T
  ) =>
    new Field(
      "human",
      [new Argument("id", variables.id)],
      new SelectionSet(select(Human))
    ),

  starship: <T extends Array<Field<any, any, any>>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: typeof Starship) => T
  ) =>
    new Field(
      "starship",
      [new Argument("id", variables.id)],
      new SelectionSet(select(Starship))
    ),
};

export interface IMutation {
  createReview: IReview;
}

export const Mutation = {
  createReview: <T extends Array<Field<any, any, any>>>(
    variables: {
      episode?: Variable<"episode"> | Episode;
      review?: Variable<"review"> | unknown;
    },
    select: (t: typeof Review) => T
  ) =>
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

export const Character = {
  id: () => new Field("id"),
  name: () => new Field("name"),

  friends: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("friends", [], new SelectionSet(select(Character))),

  friendsConnection: <T extends Array<Field<any, any, any>>>(
    variables: {
      first?: Variable<"first"> | number;
      after?: Variable<"after"> | string;
    },
    select: (t: typeof FriendsConnection) => T
  ) =>
    new Field(
      "friendsConnection",
      [
        new Argument("first", variables.first),
        new Argument("after", variables.after),
      ],
      new SelectionSet(select(FriendsConnection))
    ),

  appearsIn: () => new Field("appearsIn"),
};

export interface IHuman extends ICharacter {
  __typename: "Human";
  homePlanet: string;
  height: number;
  mass: number;
  starships: IStarship[];
}

export const Human = {
  id: () => new Field("id"),
  name: () => new Field("name"),
  homePlanet: () => new Field("homePlanet"),
  height: (variables: { unit: unknown }) =>
    new Field<"height", [/* @todo */]>("height"),

  /**
   * @deprecated Weight is a sensitive subject!
   */
  mass: () => new Field("mass"),

  friends: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("friends", [], new SelectionSet(select(Character))),

  friendsConnection: <T extends Array<Field<any, any, any>>>(
    variables: {
      first?: Variable<"first"> | number;
      after?: Variable<"after"> | string;
    },
    select: (t: typeof FriendsConnection) => T
  ) =>
    new Field(
      "friendsConnection",
      [
        new Argument("first", variables.first),
        new Argument("after", variables.after),
      ],
      new SelectionSet(select(FriendsConnection))
    ),

  appearsIn: () => new Field("appearsIn"),

  starships: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Starship) => T
  ) => new Field("starships", [], new SelectionSet(select(Starship))),
};

export interface IDroid extends ICharacter {
  __typename: "Droid";
  primaryFunction: string;
}

export const Droid = {
  id: () => new Field("id"),
  name: () => new Field("name"),

  friends: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("friends", [], new SelectionSet(select(Character))),

  friendsConnection: <T extends Array<Field<any, any, any>>>(
    variables: {
      first?: Variable<"first"> | number;
      after?: Variable<"after"> | string;
    },
    select: (t: typeof FriendsConnection) => T
  ) =>
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

export const FriendsConnection = {
  totalCount: () => new Field("totalCount"),

  edges: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof FriendsEdge) => T
  ) => new Field("edges", [], new SelectionSet(select(FriendsEdge))),

  friends: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("friends", [], new SelectionSet(select(Character))),

  pageInfo: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof PageInfo) => T
  ) => new Field("pageInfo", [], new SelectionSet(select(PageInfo))),
};

export interface IFriendsEdge {
  cursor: string;
  node: ICharacter;
}

export const FriendsEdge = {
  cursor: () => new Field("cursor"),

  node: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("node", [], new SelectionSet(select(Character))),
};

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
}

export const PageInfo = {
  startCursor: () => new Field("startCursor"),
  endCursor: () => new Field("endCursor"),
  hasNextPage: () => new Field("hasNextPage"),
};

export interface IReview {
  stars: number;
  commentary: string;
}

export const Review = {
  stars: () => new Field("stars"),
  commentary: () => new Field("commentary"),
};

export interface IStarship {
  id: string;
  name: string;
  length: number;
  coordinates: number[];
}

export const Starship = {
  id: () => new Field("id"),
  name: () => new Field("name"),
  length: (variables: { unit: unknown }) =>
    new Field<"length", [/* @todo */]>("length"),
  coordinates: () => new Field("coordinates"),
};

export const query = <T extends Array<Selection>>(
  name: string,
  select: (t: typeof Query) => T
): Operation<SelectionSet<T>> =>
  new Operation(name, "query", new SelectionSet(select(Query)));
