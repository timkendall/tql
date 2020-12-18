import {
  Argument,
  Value,
  Field,
  Operation,
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
      select(Character)
    ),

  reviews: <T extends Array<Field<any, any, any>>>(
    variables: { episode?: Variable<"episode"> | Episode },
    select: (t: typeof Review) => T
  ) =>
    new Field(
      "reviews",
      [new Argument("episode", variables.episode, Episode)],
      select(Review)
    ),

  // search: <T extends Array<Field<any, any, any>>>(
  //   variables: { text?: Variable<"text"> | string },
  //   select: (t: typeof SearchResult) => T
  // ) =>
  //   new Field(
  //     "search",
  //     [new Argument("text", variables.text)],
  //     select(SearchResult)
  //   ),

  character: <T extends Array<Field<any, any, any>>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: typeof Character) => T
  ) =>
    new Field(
      "character",
      [new Argument("id", variables.id)],
      select(Character)
    ),

  droid: <T extends Array<Field<any, any, any>>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: typeof Droid) => T
  ) => new Field("droid", [new Argument("id", variables.id)], select(Droid)),

  human: <T extends Array<Field<any, any, any>>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: typeof Human) => T
  ) => new Field("human", [new Argument("id", variables.id)], select(Human)),

  starship: <T extends Array<Field<any, any, any>>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: typeof Starship) => T
  ) =>
    new Field("starship", [new Argument("id", variables.id)], select(Starship)),
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
      select(Review)
    ),
};

export interface ICharacter {
  id: string;
  name: string;
  friends: ICharacter[];
  friendsConnection: IFriendsConnection;
  appearsIn: Episode[];
}

export const Character = {
  id: () => new Field<"id">("id"),
  name: () => new Field<"name">("name"),

  friends: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("friends", [], select(Character)),

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
      select(FriendsConnection)
    ),

  appearsIn: () => new Field<"appearsIn">("appearsIn"),
};

export interface IHuman extends ICharacter {
  homePlanet: string;
  height: number;
  mass: number;
  starships: IStarship[];
}

export const Human = {
  id: () => new Field<"id">("id"),
  name: () => new Field<"name">("name"),
  homePlanet: () => new Field<"homePlanet">("homePlanet"),
  height: (variables: { unit: unknown }) =>
    new Field<"height", [/* @todo */]>("height"),
  mass: () => new Field<"mass">("mass"),

  friends: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("friends", [], select(Character)),

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
      select(FriendsConnection)
    ),

  appearsIn: () => new Field<"appearsIn">("appearsIn"),

  starships: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Starship) => T
  ) => new Field("starships", [], select(Starship)),
};

export interface IDroid extends ICharacter {
  primaryFunction: string;
}

export const Droid = {
  id: () => new Field<"id">("id"),
  name: () => new Field<"name">("name"),

  friends: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("friends", [], select(Character)),

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
      select(FriendsConnection)
    ),

  appearsIn: () => new Field<"appearsIn">("appearsIn"),
  primaryFunction: () => new Field<"primaryFunction">("primaryFunction"),
};

export interface IFriendsConnection {
  totalCount: number;
  edges: IFriendsEdge[];
  friends: ICharacter[];
  pageInfo: IPageInfo;
}

export const FriendsConnection = {
  totalCount: () => new Field<"totalCount">("totalCount"),

  edges: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof FriendsEdge) => T
  ) => new Field("edges", [], select(FriendsEdge)),

  friends: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("friends", [], select(Character)),

  pageInfo: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof PageInfo) => T
  ) => new Field("pageInfo", [], select(PageInfo)),
};

export interface IFriendsEdge {
  cursor: string;
  node: ICharacter;
}

export const FriendsEdge = {
  cursor: () => new Field<"cursor">("cursor"),

  node: <T extends Array<Field<any, any, any>>>(
    select: (t: typeof Character) => T
  ) => new Field("node", [], select(Character)),
};

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
}

export const PageInfo = {
  startCursor: () => new Field<"startCursor">("startCursor"),
  endCursor: () => new Field<"endCursor">("endCursor"),
  hasNextPage: () => new Field<"hasNextPage">("hasNextPage"),
};

export interface IReview {
  stars: number;
  commentary: string;
}

export const Review = {
  stars: () => new Field<"stars">("stars"),
  commentary: () => new Field<"commentary">("commentary"),
};

export interface IStarship {
  id: string;
  name: string;
  length: number;
  coordinates: number[];
}

export const Starship = {
  id: () => new Field<"id">("id"),
  name: () => new Field<"name">("name"),
  length: (variables: { unit: unknown }) =>
    new Field<"length", [/* @todo */]>("length"),
  coordinates: () => new Field<"coordinates">("coordinates"),
};

export const query = <T extends Array<Field<any, any, any>>>(
  name: string,
  select: (t: typeof Query) => T
): Operation<T> =>
  new Operation(name, "query", new SelectionSet(select(Query)));
