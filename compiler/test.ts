export type ID = string;
export type String = string;
export type Int = number;
export type Float = number;
export type Boolean = boolean;
export type DateTime = string;
export interface IQuery {
    readonly hero?: ICharacter;
    readonly reviews?: IReview[];
    readonly search?: ISearchResult[];
    readonly character?: ICharacter;
    readonly droid?: IDroid;
    readonly human?: IHuman;
    readonly starship?: IStarship;
    readonly __typename: "Query";
}
export interface IMutation {
    readonly createReview?: IReview;
    readonly __typename: "Mutation";
}
export enum Episode {
    NEWHOPE = "NEWHOPE",
    EMPIRE = "EMPIRE",
    JEDI = "JEDI",
}
export interface ICharacter {
    readonly id?: string;
    readonly name?: string;
    readonly friends?: ICharacter[];
    readonly friendsConnection?: IFriendsConnection;
    readonly appearsIn?: IEpisode[];
    readonly __typename: "Foo";
}
export enum LengthUnit {
    METER = "METER",
    FOOT = "FOOT",
    CUBIT = "CUBIT",
}
export interface IHuman {
    readonly id?: string;
    readonly name?: string;
    readonly homePlanet?: string;
    readonly height?: number;
    readonly mass?: number;
    readonly friends?: ICharacter[];
    readonly friendsConnection?: IFriendsConnection;
    readonly appearsIn?: IEpisode[];
    readonly starships?: IStarship[];
    readonly __typename: "Human";
}
export interface IDroid {
    readonly id?: string;
    readonly name?: string;
    readonly friends?: ICharacter[];
    readonly friendsConnection?: IFriendsConnection;
    readonly appearsIn?: IEpisode[];
    readonly primaryFunction?: string;
    readonly __typename: "Droid";
}
export interface IFriendsConnection {
    readonly totalCount?: number;
    readonly edges?: IFriendsEdge[];
    readonly friends?: ICharacter[];
    readonly pageInfo?: IPageInfo;
    readonly __typename: "FriendsConnection";
}
export interface IFriendsEdge {
    readonly cursor?: string;
    readonly node?: ICharacter;
    readonly __typename: "FriendsEdge";
}
export interface IPageInfo {
    readonly startCursor?: string;
    readonly endCursor?: string;
    readonly hasNextPage?: boolean;
    readonly __typename: "PageInfo";
}
export interface IReview {
    readonly stars?: number;
    readonly commentary?: string;
    readonly __typename: "Review";
}
export interface IReviewInput {
    readonly stars?: number;
    readonly commentary?: string;
    readonly favorite_color?: IColorInput;
}
export interface IColorInput {
    readonly red?: number;
    readonly green?: number;
    readonly blue?: number;
}
export interface IStarship {
    readonly id?: string;
    readonly name?: string;
    readonly length?: number;
    readonly coordinates?: number[][];
    readonly __typename: "Starship";
}
export type ISearchResult = IHuman | IDroid | IStarship;

