import {
  NamedType,
  Argument,
  Field,
  InlineFragment,
  Operation,
  Selection,
  SelectionSet,
  Variable,
  Executor,
  Client,
} from "../../src";

export const VERSION = "unversioned";

export const SCHEMA_SHA = "4c13c55";

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
  readonly stars: number;
  readonly commentary?: string;
  readonly favorite_color?: ColorInput;
}

export interface ColorInput {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}

type ISearchResult = IHuman | IDroid | IStarship;

export const isSearchResult = (
  object: Record<string, any>
): object is Partial<ISearchResult> => {
  return object.__typename === "SearchResult";
};

interface SearchResultSelector {
  readonly __typename: () => Field<"__typename">;

  readonly on: <
    T extends Array<Selection>,
    F extends "Human" | "Droid" | "Starship"
  >(
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
  ) => InlineFragment<
    NamedType<
      F,
      F extends "Human"
        ? IHuman
        : F extends "Droid"
        ? IDroid
        : F extends "Starship"
        ? IStarship
        : never
    >,
    SelectionSet<T>
  >;
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
  readonly __typename: "Query";
  readonly hero: ICharacter | null;
  readonly reviews: ReadonlyArray<IReview> | null;
  readonly search: ReadonlyArray<ISearchResult> | null;
  readonly character: ICharacter | null;
  readonly droid: IDroid | null;
  readonly human: IHuman | null;
  readonly starship: IStarship | null;
}

interface QuerySelector {
  readonly __typename: () => Field<"__typename">;

  readonly hero: <T extends Array<Selection>>(
    variables: { episode?: Variable<"episode"> | Episode },
    select: (t: CharacterSelector) => T
  ) => Field<
    "hero",
    [Argument<"episode", Variable<"episode"> | Episode>],
    SelectionSet<T>
  >;

  readonly reviews: <T extends Array<Selection>>(
    variables: { episode?: Variable<"episode"> | Episode },
    select: (t: ReviewSelector) => T
  ) => Field<
    "reviews",
    [Argument<"episode", Variable<"episode"> | Episode>],
    SelectionSet<T>
  >;

  readonly search: <T extends Array<Selection>>(
    variables: { text?: Variable<"text"> | string },
    select: (t: SearchResultSelector) => T
  ) => Field<
    "search",
    [Argument<"text", Variable<"text"> | string>],
    SelectionSet<T>
  >;

  readonly character: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: CharacterSelector) => T
  ) => Field<
    "character",
    [Argument<"id", Variable<"id"> | string>],
    SelectionSet<T>
  >;

  readonly droid: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: DroidSelector) => T
  ) => Field<
    "droid",
    [Argument<"id", Variable<"id"> | string>],
    SelectionSet<T>
  >;

  readonly human: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | string },
    select: (t: HumanSelector) => T
  ) => Field<
    "human",
    [Argument<"id", Variable<"id"> | string>],
    SelectionSet<T>
  >;

  readonly starship: <T extends Array<Selection>>(
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
  readonly __typename: "Mutation";
  readonly createReview: IReview | null;
}

interface MutationSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createReview: <T extends Array<Selection>>(
    variables: {
      episode?: Variable<"episode"> | Episode;
      review?: Variable<"review"> | ReviewInput;
    },
    select: (t: ReviewSelector) => T
  ) => Field<
    "createReview",
    [
      Argument<"episode", Variable<"episode"> | Episode>,
      Argument<"review", Variable<"review"> | ReviewInput>
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
  readonly __typename: string;
  readonly id: string;
  readonly name: string;
  readonly friends: ReadonlyArray<ICharacter> | null;
  readonly friendsConnection: IFriendsConnection;
  readonly appearsIn: ReadonlyArray<Episode>;
}

interface CharacterSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description The ID of the character
   */

  readonly id: () => Field<"id">;

  /**
   * @description The name of the character
   */

  readonly name: () => Field<"name">;

  /**
   * @description The friends of the character, or an empty list if they have none
   */

  readonly friends: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  /**
   * @description The friends of the character exposed as a connection with edges
   */

  readonly friendsConnection: <T extends Array<Selection>>(
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

  /**
   * @description The movies this character appears in
   */

  readonly appearsIn: () => Field<"appearsIn">;

  readonly on: <T extends Array<Selection>, F extends "Human" | "Droid">(
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

  /**
   * @description The ID of the character
   */
  id: () => new Field("id"),

  /**
   * @description The name of the character
   */
  name: () => new Field("name"),

  /**
   * @description The friends of the character, or an empty list if they have none
   */

  friends: (select) =>
    new Field(
      "friends",
      undefined as never,
      new SelectionSet(select(Character))
    ),

  /**
   * @description The friends of the character exposed as a connection with edges
   */

  friendsConnection: (variables, select) =>
    new Field(
      "friendsConnection",
      [
        new Argument("first", variables.first),
        new Argument("after", variables.after),
      ],
      new SelectionSet(select(FriendsConnection))
    ),

  /**
   * @description The movies this character appears in
   */
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
  readonly __typename: "Human";
  readonly homePlanet: string | null;
  readonly height: number | null;
  readonly mass: number | null;
  readonly starships: ReadonlyArray<IStarship> | null;
}

interface HumanSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description The ID of the human
   */

  readonly id: () => Field<"id">;

  /**
   * @description What this human calls themselves
   */

  readonly name: () => Field<"name">;

  /**
   * @description The home planet of the human, or null if unknown
   */

  readonly homePlanet: () => Field<"homePlanet">;

  /**
   * @description Height in the preferred unit, default is meters
   */

  readonly height: (variables: {
    unit?: Variable<"unit"> | LengthUnit;
  }) => Field<"height", [Argument<"unit", Variable<"unit"> | LengthUnit>]>;

  /**
   * @description Mass in kilograms, or null if unknown
   * @deprecated Weight is a sensitive subject!
   */

  readonly mass: () => Field<"mass">;

  /**
   * @description This human's friends, or an empty list if they have none
   */

  readonly friends: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  /**
   * @description The friends of the human exposed as a connection with edges
   */

  readonly friendsConnection: <T extends Array<Selection>>(
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

  /**
   * @description The movies this human appears in
   */

  readonly appearsIn: () => Field<"appearsIn">;

  /**
   * @description A list of starships this person has piloted, or an empty list if none
   */

  readonly starships: <T extends Array<Selection>>(
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

  /**
   * @description The ID of the human
   */
  id: () => new Field("id"),

  /**
   * @description What this human calls themselves
   */
  name: () => new Field("name"),

  /**
   * @description The home planet of the human, or null if unknown
   */
  homePlanet: () => new Field("homePlanet"),

  /**
   * @description Height in the preferred unit, default is meters
   */
  height: (variables) => new Field("height"),

  /**
   * @description Mass in kilograms, or null if unknown
   * @deprecated Weight is a sensitive subject!
   */
  mass: () => new Field("mass"),

  /**
   * @description This human's friends, or an empty list if they have none
   */

  friends: (select) =>
    new Field(
      "friends",
      undefined as never,
      new SelectionSet(select(Character))
    ),

  /**
   * @description The friends of the human exposed as a connection with edges
   */

  friendsConnection: (variables, select) =>
    new Field(
      "friendsConnection",
      [
        new Argument("first", variables.first),
        new Argument("after", variables.after),
      ],
      new SelectionSet(select(FriendsConnection))
    ),

  /**
   * @description The movies this human appears in
   */
  appearsIn: () => new Field("appearsIn"),

  /**
   * @description A list of starships this person has piloted, or an empty list if none
   */

  starships: (select) =>
    new Field(
      "starships",
      undefined as never,
      new SelectionSet(select(Starship))
    ),
};

export interface IDroid extends ICharacter {
  readonly __typename: "Droid";
  readonly primaryFunction: string | null;
}

interface DroidSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description The ID of the droid
   */

  readonly id: () => Field<"id">;

  /**
   * @description What others call this droid
   */

  readonly name: () => Field<"name">;

  /**
   * @description This droid's friends, or an empty list if they have none
   */

  readonly friends: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  /**
   * @description The friends of the droid exposed as a connection with edges
   */

  readonly friendsConnection: <T extends Array<Selection>>(
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

  /**
   * @description The movies this droid appears in
   */

  readonly appearsIn: () => Field<"appearsIn">;

  /**
   * @description This droid's primary function
   */

  readonly primaryFunction: () => Field<"primaryFunction">;
}

export const isDroid = (
  object: Record<string, any>
): object is Partial<IDroid> => {
  return object.__typename === "Droid";
};

export const Droid: DroidSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description The ID of the droid
   */
  id: () => new Field("id"),

  /**
   * @description What others call this droid
   */
  name: () => new Field("name"),

  /**
   * @description This droid's friends, or an empty list if they have none
   */

  friends: (select) =>
    new Field(
      "friends",
      undefined as never,
      new SelectionSet(select(Character))
    ),

  /**
   * @description The friends of the droid exposed as a connection with edges
   */

  friendsConnection: (variables, select) =>
    new Field(
      "friendsConnection",
      [
        new Argument("first", variables.first),
        new Argument("after", variables.after),
      ],
      new SelectionSet(select(FriendsConnection))
    ),

  /**
   * @description The movies this droid appears in
   */
  appearsIn: () => new Field("appearsIn"),

  /**
   * @description This droid's primary function
   */
  primaryFunction: () => new Field("primaryFunction"),
};

export interface IFriendsConnection {
  readonly __typename: "FriendsConnection";
  readonly totalCount: number | null;
  readonly edges: ReadonlyArray<IFriendsEdge> | null;
  readonly friends: ReadonlyArray<ICharacter> | null;
  readonly pageInfo: IPageInfo;
}

interface FriendsConnectionSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description The total number of friends
   */

  readonly totalCount: () => Field<"totalCount">;

  /**
   * @description The edges for each of the character's friends.
   */

  readonly edges: <T extends Array<Selection>>(
    select: (t: FriendsEdgeSelector) => T
  ) => Field<"edges", never, SelectionSet<T>>;

  /**
   * @description A list of the friends, as a convenience when edges are not needed.
   */

  readonly friends: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  /**
   * @description Information for paginating this connection
   */

  readonly pageInfo: <T extends Array<Selection>>(
    select: (t: PageInfoSelector) => T
  ) => Field<"pageInfo", never, SelectionSet<T>>;
}

export const FriendsConnection: FriendsConnectionSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description The total number of friends
   */
  totalCount: () => new Field("totalCount"),

  /**
   * @description The edges for each of the character's friends.
   */

  edges: (select) =>
    new Field(
      "edges",
      undefined as never,
      new SelectionSet(select(FriendsEdge))
    ),

  /**
   * @description A list of the friends, as a convenience when edges are not needed.
   */

  friends: (select) =>
    new Field(
      "friends",
      undefined as never,
      new SelectionSet(select(Character))
    ),

  /**
   * @description Information for paginating this connection
   */

  pageInfo: (select) =>
    new Field(
      "pageInfo",
      undefined as never,
      new SelectionSet(select(PageInfo))
    ),
};

export interface IFriendsEdge {
  readonly __typename: "FriendsEdge";
  readonly cursor: string;
  readonly node: ICharacter | null;
}

interface FriendsEdgeSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description A cursor used for pagination
   */

  readonly cursor: () => Field<"cursor">;

  /**
   * @description The character represented by this friendship edge
   */

  readonly node: <T extends Array<Selection>>(
    select: (t: CharacterSelector) => T
  ) => Field<"node", never, SelectionSet<T>>;
}

export const FriendsEdge: FriendsEdgeSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description A cursor used for pagination
   */
  cursor: () => new Field("cursor"),

  /**
   * @description The character represented by this friendship edge
   */

  node: (select) =>
    new Field("node", undefined as never, new SelectionSet(select(Character))),
};

export interface IPageInfo {
  readonly __typename: "PageInfo";
  readonly startCursor: string | null;
  readonly endCursor: string | null;
  readonly hasNextPage: boolean;
}

interface PageInfoSelector {
  readonly __typename: () => Field<"__typename">;

  readonly startCursor: () => Field<"startCursor">;

  readonly endCursor: () => Field<"endCursor">;

  readonly hasNextPage: () => Field<"hasNextPage">;
}

export const PageInfo: PageInfoSelector = {
  __typename: () => new Field("__typename"),

  startCursor: () => new Field("startCursor"),
  endCursor: () => new Field("endCursor"),
  hasNextPage: () => new Field("hasNextPage"),
};

export interface IReview {
  readonly __typename: "Review";
  readonly stars: number;
  readonly commentary: string | null;
}

interface ReviewSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description The number of stars this review gave, 1-5
   */

  readonly stars: () => Field<"stars">;

  /**
   * @description Comment about the movie
   */

  readonly commentary: () => Field<"commentary">;
}

export const Review: ReviewSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description The number of stars this review gave, 1-5
   */
  stars: () => new Field("stars"),

  /**
   * @description Comment about the movie
   */
  commentary: () => new Field("commentary"),
};

export interface IStarship {
  readonly __typename: "Starship";
  readonly id: string;
  readonly name: string;
  readonly length: number | null;
  readonly coordinates: ReadonlyArray<number> | null;
}

interface StarshipSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description The ID of the starship
   */

  readonly id: () => Field<"id">;

  /**
   * @description The name of the starship
   */

  readonly name: () => Field<"name">;

  /**
   * @description Length of the starship, along the longest axis
   */

  readonly length: (variables: {
    unit?: Variable<"unit"> | LengthUnit;
  }) => Field<"length", [Argument<"unit", Variable<"unit"> | LengthUnit>]>;

  readonly coordinates: () => Field<"coordinates">;
}

export const Starship: StarshipSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description The ID of the starship
   */
  id: () => new Field("id"),

  /**
   * @description The name of the starship
   */
  name: () => new Field("name"),

  /**
   * @description Length of the starship, along the longest axis
   */
  length: (variables) => new Field("length"),
  coordinates: () => new Field("coordinates"),
};

export const query = <T extends Array<Selection>>(
  name: string,
  select: (t: typeof Query) => T
): Operation<SelectionSet<T>> =>
  new Operation(name, "query", new SelectionSet(select(Query)));

export const mutation = <T extends Array<Selection>>(
  name: string,
  select: (t: typeof Mutation) => T
): Operation<SelectionSet<T>> =>
  new Operation(name, "mutation", new SelectionSet(select(Mutation)));

export class Starwars implements Client {
  public static readonly VERSION = VERSION;
  public static readonly SCHEMA_SHA = SCHEMA_SHA;

  constructor(public readonly executor: Executor) {}

  public readonly query = {
    hero: <T extends Array<Selection>>(
      variables: { episode?: Episode },
      select: (t: CharacterSelector) => T
    ) =>
      this.executor.execute<
        IQuery,
        Operation<SelectionSet<[Field<"hero", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "hero",
          "query",
          new SelectionSet([Query.hero<T>(variables, select)])
        )
      ),

    reviews: <T extends Array<Selection>>(
      variables: { episode?: Episode },
      select: (t: ReviewSelector) => T
    ) =>
      this.executor.execute<
        IQuery,
        Operation<SelectionSet<[Field<"reviews", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "reviews",
          "query",
          new SelectionSet([Query.reviews<T>(variables, select)])
        )
      ),

    search: <T extends Array<Selection>>(
      variables: { text?: string },
      select: (t: SearchResultSelector) => T
    ) =>
      this.executor.execute<
        IQuery,
        Operation<SelectionSet<[Field<"search", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "search",
          "query",
          new SelectionSet([Query.search<T>(variables, select)])
        )
      ),

    character: <T extends Array<Selection>>(
      variables: { id?: string },
      select: (t: CharacterSelector) => T
    ) =>
      this.executor.execute<
        IQuery,
        Operation<SelectionSet<[Field<"character", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "character",
          "query",
          new SelectionSet([Query.character<T>(variables, select)])
        )
      ),

    droid: <T extends Array<Selection>>(
      variables: { id?: string },
      select: (t: DroidSelector) => T
    ) =>
      this.executor.execute<
        IQuery,
        Operation<SelectionSet<[Field<"droid", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "droid",
          "query",
          new SelectionSet([Query.droid<T>(variables, select)])
        )
      ),

    human: <T extends Array<Selection>>(
      variables: { id?: string },
      select: (t: HumanSelector) => T
    ) =>
      this.executor.execute<
        IQuery,
        Operation<SelectionSet<[Field<"human", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "human",
          "query",
          new SelectionSet([Query.human<T>(variables, select)])
        )
      ),

    starship: <T extends Array<Selection>>(
      variables: { id?: string },
      select: (t: StarshipSelector) => T
    ) =>
      this.executor.execute<
        IQuery,
        Operation<SelectionSet<[Field<"starship", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "starship",
          "query",
          new SelectionSet([Query.starship<T>(variables, select)])
        )
      ),
  };

  public readonly mutate = {
    createReview: <T extends Array<Selection>>(
      variables: { episode?: Episode; review?: ReviewInput },
      select: (t: ReviewSelector) => T
    ) =>
      this.executor.execute<
        IMutation,
        Operation<SelectionSet<[Field<"createReview", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "createReview",
          "mutation",
          new SelectionSet([Mutation.createReview<T>(variables, select)])
        )
      ),
  };
}
