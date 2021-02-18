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
  TypeConditionError,
} from "../../src";

export const VERSION = "unversioned";

export const SCHEMA_SHA = "12df668";

export enum bookmarks_constraint {
  idx_16652_primary = "idx_16652_primary",
}

export enum bookmarks_select_column {
  createdUtc = "createdUtc",
  id = "id",
  name = "name",
  ownerUserId = "ownerUserId",
  parent = "parent",
  value = "value",
}

export enum bookmarks_update_column {
  createdUtc = "createdUtc",
  id = "id",
  name = "name",
  ownerUserId = "ownerUserId",
  parent = "parent",
  value = "value",
}

export enum order_by {
  asc = "asc",
  asc_nulls_first = "asc_nulls_first",
  asc_nulls_last = "asc_nulls_last",
  desc = "desc",
  desc_nulls_first = "desc_nulls_first",
  desc_nulls_last = "desc_nulls_last",
}

export enum playlist_items_constraint {
  idx_16694_primary = "idx_16694_primary",
}

export enum playlist_items_select_column {
  createdUtc = "createdUtc",
  id = "id",
  playlistId = "playlistId",
  position = "position",
  trackId = "trackId",
}

export enum playlist_items_update_column {
  createdUtc = "createdUtc",
  id = "id",
  playlistId = "playlistId",
  position = "position",
  trackId = "trackId",
}

export enum playlists_constraint {
  idx_16687_primary = "idx_16687_primary",
}

export enum playlists_select_column {
  createdUtc = "createdUtc",
  id = "id",
  name = "name",
  ownerUserId = "ownerUserId",
}

export enum playlists_update_column {
  createdUtc = "createdUtc",
  id = "id",
  name = "name",
  ownerUserId = "ownerUserId",
}

export enum tracks_constraint {
  idx_16710_napsterid = "idx_16710_napsterid",
  idx_16710_primary = "idx_16710_primary",
}

export enum tracks_select_column {
  createdUtc = "createdUtc",
  id = "id",
  name = "name",
  napsterId = "napsterId",
}

export enum tracks_update_column {
  createdUtc = "createdUtc",
  id = "id",
  name = "name",
  napsterId = "napsterId",
}

export enum users_constraint {
  idx_16717_primary = "idx_16717_primary",
}

export enum users_select_column {
  createdUtc = "createdUtc",
  email = "email",
  id = "id",
}

export enum users_update_column {
  createdUtc = "createdUtc",
  email = "email",
  id = "id",
}

export interface Int_comparison_exp {
  readonly _eq?: number;
  readonly _gt?: number;
  readonly _gte?: number;
  readonly _in?: number[];
  readonly _is_null?: boolean;
  readonly _lt?: number;
  readonly _lte?: number;
  readonly _neq?: number;
  readonly _nin?: number[];
}

export interface String_comparison_exp {
  readonly _eq?: string;
  readonly _gt?: string;
  readonly _gte?: string;
  readonly _ilike?: string;
  readonly _in?: string[];
  readonly _is_null?: boolean;
  readonly _like?: string;
  readonly _lt?: string;
  readonly _lte?: string;
  readonly _neq?: string;
  readonly _nilike?: string;
  readonly _nin?: string[];
  readonly _nlike?: string;
  readonly _nsimilar?: string;
  readonly _similar?: string;
}

export interface bookmarks_aggregate_order_by {
  readonly avg?: bookmarks_avg_order_by;
  readonly count?: order_by;
  readonly max?: bookmarks_max_order_by;
  readonly min?: bookmarks_min_order_by;
  readonly stddev?: bookmarks_stddev_order_by;
  readonly stddev_pop?: bookmarks_stddev_pop_order_by;
  readonly stddev_samp?: bookmarks_stddev_samp_order_by;
  readonly sum?: bookmarks_sum_order_by;
  readonly var_pop?: bookmarks_var_pop_order_by;
  readonly var_samp?: bookmarks_var_samp_order_by;
  readonly variance?: bookmarks_variance_order_by;
}

export interface bookmarks_arr_rel_insert_input {
  readonly data: bookmarks_insert_input;
  readonly on_conflict?: bookmarks_on_conflict;
}

export interface bookmarks_avg_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface bookmarks_bool_exp {
  readonly _and?: bookmarks_bool_exp[];
  readonly _not?: bookmarks_bool_exp;
  readonly _or?: bookmarks_bool_exp[];
  readonly children?: bookmarks_bool_exp;
  readonly createdUtc?: timestamp_comparison_exp;
  readonly id?: Int_comparison_exp;
  readonly name?: String_comparison_exp;
  readonly owner?: users_bool_exp;
  readonly ownerUserId?: Int_comparison_exp;
  readonly parent?: Int_comparison_exp;
  readonly parentBookmark?: bookmarks_bool_exp;
  readonly value?: json_comparison_exp;
}

export interface bookmarks_inc_input {
  readonly id?: number;
  readonly ownerUserId?: number;
  readonly parent?: number;
}

export interface bookmarks_insert_input {
  readonly children?: bookmarks_arr_rel_insert_input;
  readonly createdUtc?: unknown;
  readonly id?: number;
  readonly name?: string;
  readonly owner?: users_obj_rel_insert_input;
  readonly ownerUserId?: number;
  readonly parent?: number;
  readonly parentBookmark?: bookmarks_obj_rel_insert_input;
  readonly value?: unknown;
}

export interface bookmarks_max_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly name?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface bookmarks_min_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly name?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface bookmarks_obj_rel_insert_input {
  readonly data: bookmarks_insert_input;
  readonly on_conflict?: bookmarks_on_conflict;
}

export interface bookmarks_on_conflict {
  readonly constraint: bookmarks_constraint;
  readonly update_columns: bookmarks_update_column;
  readonly where?: bookmarks_bool_exp;
}

export interface bookmarks_order_by {
  readonly children_aggregate?: bookmarks_aggregate_order_by;
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly name?: order_by;
  readonly owner?: users_order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
  readonly parentBookmark?: bookmarks_order_by;
  readonly value?: order_by;
}

export interface bookmarks_pk_columns_input {
  readonly id: number;
}

export interface bookmarks_set_input {
  readonly createdUtc?: unknown;
  readonly id?: number;
  readonly name?: string;
  readonly ownerUserId?: number;
  readonly parent?: number;
  readonly value?: unknown;
}

export interface bookmarks_stddev_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface bookmarks_stddev_pop_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface bookmarks_stddev_samp_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface bookmarks_sum_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface bookmarks_var_pop_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface bookmarks_var_samp_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface bookmarks_variance_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
  readonly parent?: order_by;
}

export interface json_comparison_exp {
  readonly _eq?: unknown;
  readonly _gt?: unknown;
  readonly _gte?: unknown;
  readonly _in?: unknown[];
  readonly _is_null?: boolean;
  readonly _lt?: unknown;
  readonly _lte?: unknown;
  readonly _neq?: unknown;
  readonly _nin?: unknown[];
}

export interface playlist_items_aggregate_order_by {
  readonly avg?: playlist_items_avg_order_by;
  readonly count?: order_by;
  readonly max?: playlist_items_max_order_by;
  readonly min?: playlist_items_min_order_by;
  readonly stddev?: playlist_items_stddev_order_by;
  readonly stddev_pop?: playlist_items_stddev_pop_order_by;
  readonly stddev_samp?: playlist_items_stddev_samp_order_by;
  readonly sum?: playlist_items_sum_order_by;
  readonly var_pop?: playlist_items_var_pop_order_by;
  readonly var_samp?: playlist_items_var_samp_order_by;
  readonly variance?: playlist_items_variance_order_by;
}

export interface playlist_items_arr_rel_insert_input {
  readonly data: playlist_items_insert_input;
  readonly on_conflict?: playlist_items_on_conflict;
}

export interface playlist_items_avg_order_by {
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_bool_exp {
  readonly _and?: playlist_items_bool_exp[];
  readonly _not?: playlist_items_bool_exp;
  readonly _or?: playlist_items_bool_exp[];
  readonly createdUtc?: timestamp_comparison_exp;
  readonly id?: Int_comparison_exp;
  readonly playlistId?: Int_comparison_exp;
  readonly position?: Int_comparison_exp;
  readonly trackId?: Int_comparison_exp;
}

export interface playlist_items_inc_input {
  readonly id?: number;
  readonly playlistId?: number;
  readonly position?: number;
  readonly trackId?: number;
}

export interface playlist_items_insert_input {
  readonly createdUtc?: unknown;
  readonly id?: number;
  readonly playlistId?: number;
  readonly position?: number;
  readonly trackId?: number;
}

export interface playlist_items_max_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_min_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_obj_rel_insert_input {
  readonly data: playlist_items_insert_input;
  readonly on_conflict?: playlist_items_on_conflict;
}

export interface playlist_items_on_conflict {
  readonly constraint: playlist_items_constraint;
  readonly update_columns: playlist_items_update_column;
  readonly where?: playlist_items_bool_exp;
}

export interface playlist_items_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_pk_columns_input {
  readonly id: number;
}

export interface playlist_items_set_input {
  readonly createdUtc?: unknown;
  readonly id?: number;
  readonly playlistId?: number;
  readonly position?: number;
  readonly trackId?: number;
}

export interface playlist_items_stddev_order_by {
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_stddev_pop_order_by {
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_stddev_samp_order_by {
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_sum_order_by {
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_var_pop_order_by {
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_var_samp_order_by {
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlist_items_variance_order_by {
  readonly id?: order_by;
  readonly playlistId?: order_by;
  readonly position?: order_by;
  readonly trackId?: order_by;
}

export interface playlists_aggregate_order_by {
  readonly avg?: playlists_avg_order_by;
  readonly count?: order_by;
  readonly max?: playlists_max_order_by;
  readonly min?: playlists_min_order_by;
  readonly stddev?: playlists_stddev_order_by;
  readonly stddev_pop?: playlists_stddev_pop_order_by;
  readonly stddev_samp?: playlists_stddev_samp_order_by;
  readonly sum?: playlists_sum_order_by;
  readonly var_pop?: playlists_var_pop_order_by;
  readonly var_samp?: playlists_var_samp_order_by;
  readonly variance?: playlists_variance_order_by;
}

export interface playlists_arr_rel_insert_input {
  readonly data: playlists_insert_input;
  readonly on_conflict?: playlists_on_conflict;
}

export interface playlists_avg_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_bool_exp {
  readonly _and?: playlists_bool_exp[];
  readonly _not?: playlists_bool_exp;
  readonly _or?: playlists_bool_exp[];
  readonly createdUtc?: timestamptz_comparison_exp;
  readonly id?: Int_comparison_exp;
  readonly name?: String_comparison_exp;
  readonly ownerUserId?: Int_comparison_exp;
}

export interface playlists_inc_input {
  readonly id?: number;
  readonly ownerUserId?: number;
}

export interface playlists_insert_input {
  readonly createdUtc?: unknown;
  readonly id?: number;
  readonly name?: string;
  readonly ownerUserId?: number;
}

export interface playlists_max_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly name?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_min_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly name?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_obj_rel_insert_input {
  readonly data: playlists_insert_input;
  readonly on_conflict?: playlists_on_conflict;
}

export interface playlists_on_conflict {
  readonly constraint: playlists_constraint;
  readonly update_columns: playlists_update_column;
  readonly where?: playlists_bool_exp;
}

export interface playlists_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly name?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_pk_columns_input {
  readonly id: number;
}

export interface playlists_set_input {
  readonly createdUtc?: unknown;
  readonly id?: number;
  readonly name?: string;
  readonly ownerUserId?: number;
}

export interface playlists_stddev_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_stddev_pop_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_stddev_samp_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_sum_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_var_pop_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_var_samp_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
}

export interface playlists_variance_order_by {
  readonly id?: order_by;
  readonly ownerUserId?: order_by;
}

export interface timestamp_comparison_exp {
  readonly _eq?: unknown;
  readonly _gt?: unknown;
  readonly _gte?: unknown;
  readonly _in?: unknown[];
  readonly _is_null?: boolean;
  readonly _lt?: unknown;
  readonly _lte?: unknown;
  readonly _neq?: unknown;
  readonly _nin?: unknown[];
}

export interface timestamptz_comparison_exp {
  readonly _eq?: unknown;
  readonly _gt?: unknown;
  readonly _gte?: unknown;
  readonly _in?: unknown[];
  readonly _is_null?: boolean;
  readonly _lt?: unknown;
  readonly _lte?: unknown;
  readonly _neq?: unknown;
  readonly _nin?: unknown[];
}

export interface tracks_aggregate_order_by {
  readonly avg?: tracks_avg_order_by;
  readonly count?: order_by;
  readonly max?: tracks_max_order_by;
  readonly min?: tracks_min_order_by;
  readonly stddev?: tracks_stddev_order_by;
  readonly stddev_pop?: tracks_stddev_pop_order_by;
  readonly stddev_samp?: tracks_stddev_samp_order_by;
  readonly sum?: tracks_sum_order_by;
  readonly var_pop?: tracks_var_pop_order_by;
  readonly var_samp?: tracks_var_samp_order_by;
  readonly variance?: tracks_variance_order_by;
}

export interface tracks_arr_rel_insert_input {
  readonly data: tracks_insert_input;
  readonly on_conflict?: tracks_on_conflict;
}

export interface tracks_avg_order_by {
  readonly id?: order_by;
}

export interface tracks_bool_exp {
  readonly _and?: tracks_bool_exp[];
  readonly _not?: tracks_bool_exp;
  readonly _or?: tracks_bool_exp[];
  readonly createdUtc?: timestamp_comparison_exp;
  readonly id?: Int_comparison_exp;
  readonly name?: String_comparison_exp;
  readonly napsterId?: String_comparison_exp;
}

export interface tracks_inc_input {
  readonly id?: number;
}

export interface tracks_insert_input {
  readonly createdUtc?: unknown;
  readonly id?: number;
  readonly name?: string;
  readonly napsterId?: string;
}

export interface tracks_max_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly name?: order_by;
  readonly napsterId?: order_by;
}

export interface tracks_min_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly name?: order_by;
  readonly napsterId?: order_by;
}

export interface tracks_obj_rel_insert_input {
  readonly data: tracks_insert_input;
  readonly on_conflict?: tracks_on_conflict;
}

export interface tracks_on_conflict {
  readonly constraint: tracks_constraint;
  readonly update_columns: tracks_update_column;
  readonly where?: tracks_bool_exp;
}

export interface tracks_order_by {
  readonly createdUtc?: order_by;
  readonly id?: order_by;
  readonly name?: order_by;
  readonly napsterId?: order_by;
}

export interface tracks_pk_columns_input {
  readonly id: number;
}

export interface tracks_set_input {
  readonly createdUtc?: unknown;
  readonly id?: number;
  readonly name?: string;
  readonly napsterId?: string;
}

export interface tracks_stddev_order_by {
  readonly id?: order_by;
}

export interface tracks_stddev_pop_order_by {
  readonly id?: order_by;
}

export interface tracks_stddev_samp_order_by {
  readonly id?: order_by;
}

export interface tracks_sum_order_by {
  readonly id?: order_by;
}

export interface tracks_var_pop_order_by {
  readonly id?: order_by;
}

export interface tracks_var_samp_order_by {
  readonly id?: order_by;
}

export interface tracks_variance_order_by {
  readonly id?: order_by;
}

export interface users_aggregate_order_by {
  readonly avg?: users_avg_order_by;
  readonly count?: order_by;
  readonly max?: users_max_order_by;
  readonly min?: users_min_order_by;
  readonly stddev?: users_stddev_order_by;
  readonly stddev_pop?: users_stddev_pop_order_by;
  readonly stddev_samp?: users_stddev_samp_order_by;
  readonly sum?: users_sum_order_by;
  readonly var_pop?: users_var_pop_order_by;
  readonly var_samp?: users_var_samp_order_by;
  readonly variance?: users_variance_order_by;
}

export interface users_arr_rel_insert_input {
  readonly data: users_insert_input;
  readonly on_conflict?: users_on_conflict;
}

export interface users_avg_order_by {
  readonly id?: order_by;
}

export interface users_bool_exp {
  readonly _and?: users_bool_exp[];
  readonly _not?: users_bool_exp;
  readonly _or?: users_bool_exp[];
  readonly bookmarks?: bookmarks_bool_exp;
  readonly createdUtc?: timestamp_comparison_exp;
  readonly email?: String_comparison_exp;
  readonly id?: Int_comparison_exp;
  readonly playlists?: playlists_bool_exp;
}

export interface users_inc_input {
  readonly id?: number;
}

export interface users_insert_input {
  readonly bookmarks?: bookmarks_arr_rel_insert_input;
  readonly createdUtc?: unknown;
  readonly email?: string;
  readonly id?: number;
  readonly playlists?: playlists_arr_rel_insert_input;
}

export interface users_max_order_by {
  readonly createdUtc?: order_by;
  readonly email?: order_by;
  readonly id?: order_by;
}

export interface users_min_order_by {
  readonly createdUtc?: order_by;
  readonly email?: order_by;
  readonly id?: order_by;
}

export interface users_obj_rel_insert_input {
  readonly data: users_insert_input;
  readonly on_conflict?: users_on_conflict;
}

export interface users_on_conflict {
  readonly constraint: users_constraint;
  readonly update_columns: users_update_column;
  readonly where?: users_bool_exp;
}

export interface users_order_by {
  readonly bookmarks_aggregate?: bookmarks_aggregate_order_by;
  readonly createdUtc?: order_by;
  readonly email?: order_by;
  readonly id?: order_by;
  readonly playlists_aggregate?: playlists_aggregate_order_by;
}

export interface users_pk_columns_input {
  readonly id: number;
}

export interface users_set_input {
  readonly createdUtc?: unknown;
  readonly email?: string;
  readonly id?: number;
}

export interface users_stddev_order_by {
  readonly id?: order_by;
}

export interface users_stddev_pop_order_by {
  readonly id?: order_by;
}

export interface users_stddev_samp_order_by {
  readonly id?: order_by;
}

export interface users_sum_order_by {
  readonly id?: order_by;
}

export interface users_var_pop_order_by {
  readonly id?: order_by;
}

export interface users_var_samp_order_by {
  readonly id?: order_by;
}

export interface users_variance_order_by {
  readonly id?: order_by;
}

export interface Ibookmarks {
  readonly __typename: "bookmarks";
  readonly children: ReadonlyArray<Ibookmarks>;
  readonly children_aggregate: Ibookmarks_aggregate;
  readonly createdUtc: unknown | null;
  readonly id: number;
  readonly name: string;
  readonly owner: Iusers;
  readonly ownerUserId: number;
  readonly parent: number | null;
  readonly parentBookmark: Ibookmarks | null;
  readonly value: unknown;
}

interface bookmarksSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description An array relationship
   */

  readonly children: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | bookmarks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | bookmarks_order_by;
      where?: Variable<"where"> | bookmarks_bool_exp;
    },
    select: (t: bookmarksSelector) => T
  ) => Field<
    "children",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | bookmarks_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | bookmarks_order_by>,
      Argument<"where", Variable<"where"> | bookmarks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description An aggregated array relationship
   */

  readonly children_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | bookmarks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | bookmarks_order_by;
      where?: Variable<"where"> | bookmarks_bool_exp;
    },
    select: (t: bookmarks_aggregateSelector) => T
  ) => Field<
    "children_aggregate",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | bookmarks_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | bookmarks_order_by>,
      Argument<"where", Variable<"where"> | bookmarks_bool_exp>
    ],
    SelectionSet<T>
  >;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly name: () => Field<"name">;

  /**
   * @description An object relationship
   */

  readonly owner: <T extends Array<Selection>>(
    select: (t: usersSelector) => T
  ) => Field<"owner", never, SelectionSet<T>>;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;

  /**
   * @description An object relationship
   */

  readonly parentBookmark: <T extends Array<Selection>>(
    select: (t: bookmarksSelector) => T
  ) => Field<"parentBookmark", never, SelectionSet<T>>;

  readonly value: (variables: {
    path?: Variable<"path"> | string;
  }) => Field<"value", [Argument<"path", Variable<"path"> | string>]>;
}

export const bookmarks: bookmarksSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description An array relationship
   */

  children: (variables, select) =>
    new Field(
      "children",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          bookmarks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(bookmarks))
    ),

  /**
   * @description An aggregated array relationship
   */

  children_aggregate: (variables, select) =>
    new Field(
      "children_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          bookmarks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(bookmarks_aggregate))
    ),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  name: () => new Field("name"),

  /**
   * @description An object relationship
   */

  owner: (select) =>
    new Field("owner", undefined as never, new SelectionSet(select(users))),

  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),

  /**
   * @description An object relationship
   */

  parentBookmark: (select) =>
    new Field(
      "parentBookmark",
      undefined as never,
      new SelectionSet(select(bookmarks))
    ),

  value: (variables) => new Field("value"),
};

export interface Ibookmarks_aggregate {
  readonly __typename: "bookmarks_aggregate";
  readonly aggregate: Ibookmarks_aggregate_fields | null;
  readonly nodes: ReadonlyArray<Ibookmarks>;
}

interface bookmarks_aggregateSelector {
  readonly __typename: () => Field<"__typename">;

  readonly aggregate: <T extends Array<Selection>>(
    select: (t: bookmarks_aggregate_fieldsSelector) => T
  ) => Field<"aggregate", never, SelectionSet<T>>;

  readonly nodes: <T extends Array<Selection>>(
    select: (t: bookmarksSelector) => T
  ) => Field<"nodes", never, SelectionSet<T>>;
}

export const bookmarks_aggregate: bookmarks_aggregateSelector = {
  __typename: () => new Field("__typename"),

  aggregate: (select) =>
    new Field(
      "aggregate",
      undefined as never,
      new SelectionSet(select(bookmarks_aggregate_fields))
    ),

  nodes: (select) =>
    new Field("nodes", undefined as never, new SelectionSet(select(bookmarks))),
};

export interface Ibookmarks_aggregate_fields {
  readonly __typename: "bookmarks_aggregate_fields";
  readonly avg: Ibookmarks_avg_fields | null;
  readonly count: number | null;
  readonly max: Ibookmarks_max_fields | null;
  readonly min: Ibookmarks_min_fields | null;
  readonly stddev: Ibookmarks_stddev_fields | null;
  readonly stddev_pop: Ibookmarks_stddev_pop_fields | null;
  readonly stddev_samp: Ibookmarks_stddev_samp_fields | null;
  readonly sum: Ibookmarks_sum_fields | null;
  readonly var_pop: Ibookmarks_var_pop_fields | null;
  readonly var_samp: Ibookmarks_var_samp_fields | null;
  readonly variance: Ibookmarks_variance_fields | null;
}

interface bookmarks_aggregate_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly avg: <T extends Array<Selection>>(
    select: (t: bookmarks_avg_fieldsSelector) => T
  ) => Field<"avg", never, SelectionSet<T>>;

  readonly count: (variables: {
    columns?: Variable<"columns"> | bookmarks_select_column;
    distinct?: Variable<"distinct"> | boolean;
  }) => Field<
    "count",
    [
      Argument<"columns", Variable<"columns"> | bookmarks_select_column>,
      Argument<"distinct", Variable<"distinct"> | boolean>
    ]
  >;

  readonly max: <T extends Array<Selection>>(
    select: (t: bookmarks_max_fieldsSelector) => T
  ) => Field<"max", never, SelectionSet<T>>;

  readonly min: <T extends Array<Selection>>(
    select: (t: bookmarks_min_fieldsSelector) => T
  ) => Field<"min", never, SelectionSet<T>>;

  readonly stddev: <T extends Array<Selection>>(
    select: (t: bookmarks_stddev_fieldsSelector) => T
  ) => Field<"stddev", never, SelectionSet<T>>;

  readonly stddev_pop: <T extends Array<Selection>>(
    select: (t: bookmarks_stddev_pop_fieldsSelector) => T
  ) => Field<"stddev_pop", never, SelectionSet<T>>;

  readonly stddev_samp: <T extends Array<Selection>>(
    select: (t: bookmarks_stddev_samp_fieldsSelector) => T
  ) => Field<"stddev_samp", never, SelectionSet<T>>;

  readonly sum: <T extends Array<Selection>>(
    select: (t: bookmarks_sum_fieldsSelector) => T
  ) => Field<"sum", never, SelectionSet<T>>;

  readonly var_pop: <T extends Array<Selection>>(
    select: (t: bookmarks_var_pop_fieldsSelector) => T
  ) => Field<"var_pop", never, SelectionSet<T>>;

  readonly var_samp: <T extends Array<Selection>>(
    select: (t: bookmarks_var_samp_fieldsSelector) => T
  ) => Field<"var_samp", never, SelectionSet<T>>;

  readonly variance: <T extends Array<Selection>>(
    select: (t: bookmarks_variance_fieldsSelector) => T
  ) => Field<"variance", never, SelectionSet<T>>;
}

export const bookmarks_aggregate_fields: bookmarks_aggregate_fieldsSelector = {
  __typename: () => new Field("__typename"),

  avg: (select) =>
    new Field(
      "avg",
      undefined as never,
      new SelectionSet(select(bookmarks_avg_fields))
    ),

  count: (variables) => new Field("count"),

  max: (select) =>
    new Field(
      "max",
      undefined as never,
      new SelectionSet(select(bookmarks_max_fields))
    ),

  min: (select) =>
    new Field(
      "min",
      undefined as never,
      new SelectionSet(select(bookmarks_min_fields))
    ),

  stddev: (select) =>
    new Field(
      "stddev",
      undefined as never,
      new SelectionSet(select(bookmarks_stddev_fields))
    ),

  stddev_pop: (select) =>
    new Field(
      "stddev_pop",
      undefined as never,
      new SelectionSet(select(bookmarks_stddev_pop_fields))
    ),

  stddev_samp: (select) =>
    new Field(
      "stddev_samp",
      undefined as never,
      new SelectionSet(select(bookmarks_stddev_samp_fields))
    ),

  sum: (select) =>
    new Field(
      "sum",
      undefined as never,
      new SelectionSet(select(bookmarks_sum_fields))
    ),

  var_pop: (select) =>
    new Field(
      "var_pop",
      undefined as never,
      new SelectionSet(select(bookmarks_var_pop_fields))
    ),

  var_samp: (select) =>
    new Field(
      "var_samp",
      undefined as never,
      new SelectionSet(select(bookmarks_var_samp_fields))
    ),

  variance: (select) =>
    new Field(
      "variance",
      undefined as never,
      new SelectionSet(select(bookmarks_variance_fields))
    ),
};

export interface Ibookmarks_avg_fields {
  readonly __typename: "bookmarks_avg_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_avg_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_avg_fields: bookmarks_avg_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Ibookmarks_max_fields {
  readonly __typename: "bookmarks_max_fields";
  readonly createdUtc: unknown | null;
  readonly id: number | null;
  readonly name: string | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_max_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly name: () => Field<"name">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_max_fields: bookmarks_max_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  name: () => new Field("name"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Ibookmarks_min_fields {
  readonly __typename: "bookmarks_min_fields";
  readonly createdUtc: unknown | null;
  readonly id: number | null;
  readonly name: string | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_min_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly name: () => Field<"name">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_min_fields: bookmarks_min_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  name: () => new Field("name"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Ibookmarks_mutation_response {
  readonly __typename: "bookmarks_mutation_response";
  readonly affected_rows: number;
  readonly returning: ReadonlyArray<Ibookmarks>;
}

interface bookmarks_mutation_responseSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description number of affected rows by the mutation
   */

  readonly affected_rows: () => Field<"affected_rows">;

  /**
   * @description data of the affected rows by the mutation
   */

  readonly returning: <T extends Array<Selection>>(
    select: (t: bookmarksSelector) => T
  ) => Field<"returning", never, SelectionSet<T>>;
}

export const bookmarks_mutation_response: bookmarks_mutation_responseSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description number of affected rows by the mutation
   */
  affected_rows: () => new Field("affected_rows"),

  /**
   * @description data of the affected rows by the mutation
   */

  returning: (select) =>
    new Field(
      "returning",
      undefined as never,
      new SelectionSet(select(bookmarks))
    ),
};

export interface Ibookmarks_stddev_fields {
  readonly __typename: "bookmarks_stddev_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_stddev_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_stddev_fields: bookmarks_stddev_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Ibookmarks_stddev_pop_fields {
  readonly __typename: "bookmarks_stddev_pop_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_stddev_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_stddev_pop_fields: bookmarks_stddev_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Ibookmarks_stddev_samp_fields {
  readonly __typename: "bookmarks_stddev_samp_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_stddev_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_stddev_samp_fields: bookmarks_stddev_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Ibookmarks_sum_fields {
  readonly __typename: "bookmarks_sum_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_sum_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_sum_fields: bookmarks_sum_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Ibookmarks_var_pop_fields {
  readonly __typename: "bookmarks_var_pop_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_var_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_var_pop_fields: bookmarks_var_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Ibookmarks_var_samp_fields {
  readonly __typename: "bookmarks_var_samp_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_var_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_var_samp_fields: bookmarks_var_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Ibookmarks_variance_fields {
  readonly __typename: "bookmarks_variance_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
  readonly parent: number | null;
}

interface bookmarks_variance_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;

  readonly parent: () => Field<"parent">;
}

export const bookmarks_variance_fields: bookmarks_variance_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
  parent: () => new Field("parent"),
};

export interface Imutation_root {
  readonly __typename: "mutation_root";
  readonly delete_bookmarks: Ibookmarks_mutation_response | null;
  readonly delete_bookmarks_by_pk: Ibookmarks | null;
  readonly delete_playlist_items: Iplaylist_items_mutation_response | null;
  readonly delete_playlist_items_by_pk: Iplaylist_items | null;
  readonly delete_playlists: Iplaylists_mutation_response | null;
  readonly delete_playlists_by_pk: Iplaylists | null;
  readonly delete_tracks: Itracks_mutation_response | null;
  readonly delete_tracks_by_pk: Itracks | null;
  readonly delete_users: Iusers_mutation_response | null;
  readonly delete_users_by_pk: Iusers | null;
  readonly insert_bookmarks: Ibookmarks_mutation_response | null;
  readonly insert_bookmarks_one: Ibookmarks | null;
  readonly insert_playlist_items: Iplaylist_items_mutation_response | null;
  readonly insert_playlist_items_one: Iplaylist_items | null;
  readonly insert_playlists: Iplaylists_mutation_response | null;
  readonly insert_playlists_one: Iplaylists | null;
  readonly insert_tracks: Itracks_mutation_response | null;
  readonly insert_tracks_one: Itracks | null;
  readonly insert_users: Iusers_mutation_response | null;
  readonly insert_users_one: Iusers | null;
  readonly update_bookmarks: Ibookmarks_mutation_response | null;
  readonly update_bookmarks_by_pk: Ibookmarks | null;
  readonly update_playlist_items: Iplaylist_items_mutation_response | null;
  readonly update_playlist_items_by_pk: Iplaylist_items | null;
  readonly update_playlists: Iplaylists_mutation_response | null;
  readonly update_playlists_by_pk: Iplaylists | null;
  readonly update_tracks: Itracks_mutation_response | null;
  readonly update_tracks_by_pk: Itracks | null;
  readonly update_users: Iusers_mutation_response | null;
  readonly update_users_by_pk: Iusers | null;
}

interface mutation_rootSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description delete data from the table: "bookmarks"
   */

  readonly delete_bookmarks: <T extends Array<Selection>>(
    variables: { where?: Variable<"where"> | bookmarks_bool_exp },
    select: (t: bookmarks_mutation_responseSelector) => T
  ) => Field<
    "delete_bookmarks",
    [Argument<"where", Variable<"where"> | bookmarks_bool_exp>],
    SelectionSet<T>
  >;

  /**
   * @description delete single row from the table: "bookmarks"
   */

  readonly delete_bookmarks_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: bookmarksSelector) => T
  ) => Field<
    "delete_bookmarks_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description delete data from the table: "playlist_items"
   */

  readonly delete_playlist_items: <T extends Array<Selection>>(
    variables: { where?: Variable<"where"> | playlist_items_bool_exp },
    select: (t: playlist_items_mutation_responseSelector) => T
  ) => Field<
    "delete_playlist_items",
    [Argument<"where", Variable<"where"> | playlist_items_bool_exp>],
    SelectionSet<T>
  >;

  /**
   * @description delete single row from the table: "playlist_items"
   */

  readonly delete_playlist_items_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: playlist_itemsSelector) => T
  ) => Field<
    "delete_playlist_items_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description delete data from the table: "playlists"
   */

  readonly delete_playlists: <T extends Array<Selection>>(
    variables: { where?: Variable<"where"> | playlists_bool_exp },
    select: (t: playlists_mutation_responseSelector) => T
  ) => Field<
    "delete_playlists",
    [Argument<"where", Variable<"where"> | playlists_bool_exp>],
    SelectionSet<T>
  >;

  /**
   * @description delete single row from the table: "playlists"
   */

  readonly delete_playlists_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: playlistsSelector) => T
  ) => Field<
    "delete_playlists_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description delete data from the table: "tracks"
   */

  readonly delete_tracks: <T extends Array<Selection>>(
    variables: { where?: Variable<"where"> | tracks_bool_exp },
    select: (t: tracks_mutation_responseSelector) => T
  ) => Field<
    "delete_tracks",
    [Argument<"where", Variable<"where"> | tracks_bool_exp>],
    SelectionSet<T>
  >;

  /**
   * @description delete single row from the table: "tracks"
   */

  readonly delete_tracks_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: tracksSelector) => T
  ) => Field<
    "delete_tracks_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description delete data from the table: "users"
   */

  readonly delete_users: <T extends Array<Selection>>(
    variables: { where?: Variable<"where"> | users_bool_exp },
    select: (t: users_mutation_responseSelector) => T
  ) => Field<
    "delete_users",
    [Argument<"where", Variable<"where"> | users_bool_exp>],
    SelectionSet<T>
  >;

  /**
   * @description delete single row from the table: "users"
   */

  readonly delete_users_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: usersSelector) => T
  ) => Field<
    "delete_users_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description insert data into the table: "bookmarks"
   */

  readonly insert_bookmarks: <T extends Array<Selection>>(
    variables: {
      objects?: Variable<"objects"> | bookmarks_insert_input;
      on_conflict?: Variable<"on_conflict"> | bookmarks_on_conflict;
    },
    select: (t: bookmarks_mutation_responseSelector) => T
  ) => Field<
    "insert_bookmarks",
    [
      Argument<"objects", Variable<"objects"> | bookmarks_insert_input>,
      Argument<"on_conflict", Variable<"on_conflict"> | bookmarks_on_conflict>
    ],
    SelectionSet<T>
  >;

  /**
   * @description insert a single row into the table: "bookmarks"
   */

  readonly insert_bookmarks_one: <T extends Array<Selection>>(
    variables: {
      object?: Variable<"object"> | bookmarks_insert_input;
      on_conflict?: Variable<"on_conflict"> | bookmarks_on_conflict;
    },
    select: (t: bookmarksSelector) => T
  ) => Field<
    "insert_bookmarks_one",
    [
      Argument<"object", Variable<"object"> | bookmarks_insert_input>,
      Argument<"on_conflict", Variable<"on_conflict"> | bookmarks_on_conflict>
    ],
    SelectionSet<T>
  >;

  /**
   * @description insert data into the table: "playlist_items"
   */

  readonly insert_playlist_items: <T extends Array<Selection>>(
    variables: {
      objects?: Variable<"objects"> | playlist_items_insert_input;
      on_conflict?: Variable<"on_conflict"> | playlist_items_on_conflict;
    },
    select: (t: playlist_items_mutation_responseSelector) => T
  ) => Field<
    "insert_playlist_items",
    [
      Argument<"objects", Variable<"objects"> | playlist_items_insert_input>,
      Argument<
        "on_conflict",
        Variable<"on_conflict"> | playlist_items_on_conflict
      >
    ],
    SelectionSet<T>
  >;

  /**
   * @description insert a single row into the table: "playlist_items"
   */

  readonly insert_playlist_items_one: <T extends Array<Selection>>(
    variables: {
      object?: Variable<"object"> | playlist_items_insert_input;
      on_conflict?: Variable<"on_conflict"> | playlist_items_on_conflict;
    },
    select: (t: playlist_itemsSelector) => T
  ) => Field<
    "insert_playlist_items_one",
    [
      Argument<"object", Variable<"object"> | playlist_items_insert_input>,
      Argument<
        "on_conflict",
        Variable<"on_conflict"> | playlist_items_on_conflict
      >
    ],
    SelectionSet<T>
  >;

  /**
   * @description insert data into the table: "playlists"
   */

  readonly insert_playlists: <T extends Array<Selection>>(
    variables: {
      objects?: Variable<"objects"> | playlists_insert_input;
      on_conflict?: Variable<"on_conflict"> | playlists_on_conflict;
    },
    select: (t: playlists_mutation_responseSelector) => T
  ) => Field<
    "insert_playlists",
    [
      Argument<"objects", Variable<"objects"> | playlists_insert_input>,
      Argument<"on_conflict", Variable<"on_conflict"> | playlists_on_conflict>
    ],
    SelectionSet<T>
  >;

  /**
   * @description insert a single row into the table: "playlists"
   */

  readonly insert_playlists_one: <T extends Array<Selection>>(
    variables: {
      object?: Variable<"object"> | playlists_insert_input;
      on_conflict?: Variable<"on_conflict"> | playlists_on_conflict;
    },
    select: (t: playlistsSelector) => T
  ) => Field<
    "insert_playlists_one",
    [
      Argument<"object", Variable<"object"> | playlists_insert_input>,
      Argument<"on_conflict", Variable<"on_conflict"> | playlists_on_conflict>
    ],
    SelectionSet<T>
  >;

  /**
   * @description insert data into the table: "tracks"
   */

  readonly insert_tracks: <T extends Array<Selection>>(
    variables: {
      objects?: Variable<"objects"> | tracks_insert_input;
      on_conflict?: Variable<"on_conflict"> | tracks_on_conflict;
    },
    select: (t: tracks_mutation_responseSelector) => T
  ) => Field<
    "insert_tracks",
    [
      Argument<"objects", Variable<"objects"> | tracks_insert_input>,
      Argument<"on_conflict", Variable<"on_conflict"> | tracks_on_conflict>
    ],
    SelectionSet<T>
  >;

  /**
   * @description insert a single row into the table: "tracks"
   */

  readonly insert_tracks_one: <T extends Array<Selection>>(
    variables: {
      object?: Variable<"object"> | tracks_insert_input;
      on_conflict?: Variable<"on_conflict"> | tracks_on_conflict;
    },
    select: (t: tracksSelector) => T
  ) => Field<
    "insert_tracks_one",
    [
      Argument<"object", Variable<"object"> | tracks_insert_input>,
      Argument<"on_conflict", Variable<"on_conflict"> | tracks_on_conflict>
    ],
    SelectionSet<T>
  >;

  /**
   * @description insert data into the table: "users"
   */

  readonly insert_users: <T extends Array<Selection>>(
    variables: {
      objects?: Variable<"objects"> | users_insert_input;
      on_conflict?: Variable<"on_conflict"> | users_on_conflict;
    },
    select: (t: users_mutation_responseSelector) => T
  ) => Field<
    "insert_users",
    [
      Argument<"objects", Variable<"objects"> | users_insert_input>,
      Argument<"on_conflict", Variable<"on_conflict"> | users_on_conflict>
    ],
    SelectionSet<T>
  >;

  /**
   * @description insert a single row into the table: "users"
   */

  readonly insert_users_one: <T extends Array<Selection>>(
    variables: {
      object?: Variable<"object"> | users_insert_input;
      on_conflict?: Variable<"on_conflict"> | users_on_conflict;
    },
    select: (t: usersSelector) => T
  ) => Field<
    "insert_users_one",
    [
      Argument<"object", Variable<"object"> | users_insert_input>,
      Argument<"on_conflict", Variable<"on_conflict"> | users_on_conflict>
    ],
    SelectionSet<T>
  >;

  /**
   * @description update data of the table: "bookmarks"
   */

  readonly update_bookmarks: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | bookmarks_inc_input;
      _set?: Variable<"_set"> | bookmarks_set_input;
      where?: Variable<"where"> | bookmarks_bool_exp;
    },
    select: (t: bookmarks_mutation_responseSelector) => T
  ) => Field<
    "update_bookmarks",
    [
      Argument<"_inc", Variable<"_inc"> | bookmarks_inc_input>,
      Argument<"_set", Variable<"_set"> | bookmarks_set_input>,
      Argument<"where", Variable<"where"> | bookmarks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description update single row of the table: "bookmarks"
   */

  readonly update_bookmarks_by_pk: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | bookmarks_inc_input;
      _set?: Variable<"_set"> | bookmarks_set_input;
      pk_columns?: Variable<"pk_columns"> | bookmarks_pk_columns_input;
    },
    select: (t: bookmarksSelector) => T
  ) => Field<
    "update_bookmarks_by_pk",
    [
      Argument<"_inc", Variable<"_inc"> | bookmarks_inc_input>,
      Argument<"_set", Variable<"_set"> | bookmarks_set_input>,
      Argument<
        "pk_columns",
        Variable<"pk_columns"> | bookmarks_pk_columns_input
      >
    ],
    SelectionSet<T>
  >;

  /**
   * @description update data of the table: "playlist_items"
   */

  readonly update_playlist_items: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | playlist_items_inc_input;
      _set?: Variable<"_set"> | playlist_items_set_input;
      where?: Variable<"where"> | playlist_items_bool_exp;
    },
    select: (t: playlist_items_mutation_responseSelector) => T
  ) => Field<
    "update_playlist_items",
    [
      Argument<"_inc", Variable<"_inc"> | playlist_items_inc_input>,
      Argument<"_set", Variable<"_set"> | playlist_items_set_input>,
      Argument<"where", Variable<"where"> | playlist_items_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description update single row of the table: "playlist_items"
   */

  readonly update_playlist_items_by_pk: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | playlist_items_inc_input;
      _set?: Variable<"_set"> | playlist_items_set_input;
      pk_columns?: Variable<"pk_columns"> | playlist_items_pk_columns_input;
    },
    select: (t: playlist_itemsSelector) => T
  ) => Field<
    "update_playlist_items_by_pk",
    [
      Argument<"_inc", Variable<"_inc"> | playlist_items_inc_input>,
      Argument<"_set", Variable<"_set"> | playlist_items_set_input>,
      Argument<
        "pk_columns",
        Variable<"pk_columns"> | playlist_items_pk_columns_input
      >
    ],
    SelectionSet<T>
  >;

  /**
   * @description update data of the table: "playlists"
   */

  readonly update_playlists: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | playlists_inc_input;
      _set?: Variable<"_set"> | playlists_set_input;
      where?: Variable<"where"> | playlists_bool_exp;
    },
    select: (t: playlists_mutation_responseSelector) => T
  ) => Field<
    "update_playlists",
    [
      Argument<"_inc", Variable<"_inc"> | playlists_inc_input>,
      Argument<"_set", Variable<"_set"> | playlists_set_input>,
      Argument<"where", Variable<"where"> | playlists_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description update single row of the table: "playlists"
   */

  readonly update_playlists_by_pk: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | playlists_inc_input;
      _set?: Variable<"_set"> | playlists_set_input;
      pk_columns?: Variable<"pk_columns"> | playlists_pk_columns_input;
    },
    select: (t: playlistsSelector) => T
  ) => Field<
    "update_playlists_by_pk",
    [
      Argument<"_inc", Variable<"_inc"> | playlists_inc_input>,
      Argument<"_set", Variable<"_set"> | playlists_set_input>,
      Argument<
        "pk_columns",
        Variable<"pk_columns"> | playlists_pk_columns_input
      >
    ],
    SelectionSet<T>
  >;

  /**
   * @description update data of the table: "tracks"
   */

  readonly update_tracks: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | tracks_inc_input;
      _set?: Variable<"_set"> | tracks_set_input;
      where?: Variable<"where"> | tracks_bool_exp;
    },
    select: (t: tracks_mutation_responseSelector) => T
  ) => Field<
    "update_tracks",
    [
      Argument<"_inc", Variable<"_inc"> | tracks_inc_input>,
      Argument<"_set", Variable<"_set"> | tracks_set_input>,
      Argument<"where", Variable<"where"> | tracks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description update single row of the table: "tracks"
   */

  readonly update_tracks_by_pk: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | tracks_inc_input;
      _set?: Variable<"_set"> | tracks_set_input;
      pk_columns?: Variable<"pk_columns"> | tracks_pk_columns_input;
    },
    select: (t: tracksSelector) => T
  ) => Field<
    "update_tracks_by_pk",
    [
      Argument<"_inc", Variable<"_inc"> | tracks_inc_input>,
      Argument<"_set", Variable<"_set"> | tracks_set_input>,
      Argument<"pk_columns", Variable<"pk_columns"> | tracks_pk_columns_input>
    ],
    SelectionSet<T>
  >;

  /**
   * @description update data of the table: "users"
   */

  readonly update_users: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | users_inc_input;
      _set?: Variable<"_set"> | users_set_input;
      where?: Variable<"where"> | users_bool_exp;
    },
    select: (t: users_mutation_responseSelector) => T
  ) => Field<
    "update_users",
    [
      Argument<"_inc", Variable<"_inc"> | users_inc_input>,
      Argument<"_set", Variable<"_set"> | users_set_input>,
      Argument<"where", Variable<"where"> | users_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description update single row of the table: "users"
   */

  readonly update_users_by_pk: <T extends Array<Selection>>(
    variables: {
      _inc?: Variable<"_inc"> | users_inc_input;
      _set?: Variable<"_set"> | users_set_input;
      pk_columns?: Variable<"pk_columns"> | users_pk_columns_input;
    },
    select: (t: usersSelector) => T
  ) => Field<
    "update_users_by_pk",
    [
      Argument<"_inc", Variable<"_inc"> | users_inc_input>,
      Argument<"_set", Variable<"_set"> | users_set_input>,
      Argument<"pk_columns", Variable<"pk_columns"> | users_pk_columns_input>
    ],
    SelectionSet<T>
  >;
}

export const mutation_root: mutation_rootSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description delete data from the table: "bookmarks"
   */

  delete_bookmarks: (variables, select) =>
    new Field(
      "delete_bookmarks",
      [new Argument("where", variables.where)],
      new SelectionSet(select(bookmarks_mutation_response))
    ),

  /**
   * @description delete single row from the table: "bookmarks"
   */

  delete_bookmarks_by_pk: (variables, select) =>
    new Field(
      "delete_bookmarks_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(bookmarks))
    ),

  /**
   * @description delete data from the table: "playlist_items"
   */

  delete_playlist_items: (variables, select) =>
    new Field(
      "delete_playlist_items",
      [new Argument("where", variables.where)],
      new SelectionSet(select(playlist_items_mutation_response))
    ),

  /**
   * @description delete single row from the table: "playlist_items"
   */

  delete_playlist_items_by_pk: (variables, select) =>
    new Field(
      "delete_playlist_items_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(playlist_items))
    ),

  /**
   * @description delete data from the table: "playlists"
   */

  delete_playlists: (variables, select) =>
    new Field(
      "delete_playlists",
      [new Argument("where", variables.where)],
      new SelectionSet(select(playlists_mutation_response))
    ),

  /**
   * @description delete single row from the table: "playlists"
   */

  delete_playlists_by_pk: (variables, select) =>
    new Field(
      "delete_playlists_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(playlists))
    ),

  /**
   * @description delete data from the table: "tracks"
   */

  delete_tracks: (variables, select) =>
    new Field(
      "delete_tracks",
      [new Argument("where", variables.where)],
      new SelectionSet(select(tracks_mutation_response))
    ),

  /**
   * @description delete single row from the table: "tracks"
   */

  delete_tracks_by_pk: (variables, select) =>
    new Field(
      "delete_tracks_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(tracks))
    ),

  /**
   * @description delete data from the table: "users"
   */

  delete_users: (variables, select) =>
    new Field(
      "delete_users",
      [new Argument("where", variables.where)],
      new SelectionSet(select(users_mutation_response))
    ),

  /**
   * @description delete single row from the table: "users"
   */

  delete_users_by_pk: (variables, select) =>
    new Field(
      "delete_users_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(users))
    ),

  /**
   * @description insert data into the table: "bookmarks"
   */

  insert_bookmarks: (variables, select) =>
    new Field(
      "insert_bookmarks",
      [
        new Argument("objects", variables.objects),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(bookmarks_mutation_response))
    ),

  /**
   * @description insert a single row into the table: "bookmarks"
   */

  insert_bookmarks_one: (variables, select) =>
    new Field(
      "insert_bookmarks_one",
      [
        new Argument("object", variables.object),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(bookmarks))
    ),

  /**
   * @description insert data into the table: "playlist_items"
   */

  insert_playlist_items: (variables, select) =>
    new Field(
      "insert_playlist_items",
      [
        new Argument("objects", variables.objects),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(playlist_items_mutation_response))
    ),

  /**
   * @description insert a single row into the table: "playlist_items"
   */

  insert_playlist_items_one: (variables, select) =>
    new Field(
      "insert_playlist_items_one",
      [
        new Argument("object", variables.object),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(playlist_items))
    ),

  /**
   * @description insert data into the table: "playlists"
   */

  insert_playlists: (variables, select) =>
    new Field(
      "insert_playlists",
      [
        new Argument("objects", variables.objects),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(playlists_mutation_response))
    ),

  /**
   * @description insert a single row into the table: "playlists"
   */

  insert_playlists_one: (variables, select) =>
    new Field(
      "insert_playlists_one",
      [
        new Argument("object", variables.object),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(playlists))
    ),

  /**
   * @description insert data into the table: "tracks"
   */

  insert_tracks: (variables, select) =>
    new Field(
      "insert_tracks",
      [
        new Argument("objects", variables.objects),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(tracks_mutation_response))
    ),

  /**
   * @description insert a single row into the table: "tracks"
   */

  insert_tracks_one: (variables, select) =>
    new Field(
      "insert_tracks_one",
      [
        new Argument("object", variables.object),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(tracks))
    ),

  /**
   * @description insert data into the table: "users"
   */

  insert_users: (variables, select) =>
    new Field(
      "insert_users",
      [
        new Argument("objects", variables.objects),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(users_mutation_response))
    ),

  /**
   * @description insert a single row into the table: "users"
   */

  insert_users_one: (variables, select) =>
    new Field(
      "insert_users_one",
      [
        new Argument("object", variables.object),
        new Argument("on_conflict", variables.on_conflict),
      ],
      new SelectionSet(select(users))
    ),

  /**
   * @description update data of the table: "bookmarks"
   */

  update_bookmarks: (variables, select) =>
    new Field(
      "update_bookmarks",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(bookmarks_mutation_response))
    ),

  /**
   * @description update single row of the table: "bookmarks"
   */

  update_bookmarks_by_pk: (variables, select) =>
    new Field(
      "update_bookmarks_by_pk",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("pk_columns", variables.pk_columns),
      ],
      new SelectionSet(select(bookmarks))
    ),

  /**
   * @description update data of the table: "playlist_items"
   */

  update_playlist_items: (variables, select) =>
    new Field(
      "update_playlist_items",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlist_items_mutation_response))
    ),

  /**
   * @description update single row of the table: "playlist_items"
   */

  update_playlist_items_by_pk: (variables, select) =>
    new Field(
      "update_playlist_items_by_pk",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("pk_columns", variables.pk_columns),
      ],
      new SelectionSet(select(playlist_items))
    ),

  /**
   * @description update data of the table: "playlists"
   */

  update_playlists: (variables, select) =>
    new Field(
      "update_playlists",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlists_mutation_response))
    ),

  /**
   * @description update single row of the table: "playlists"
   */

  update_playlists_by_pk: (variables, select) =>
    new Field(
      "update_playlists_by_pk",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("pk_columns", variables.pk_columns),
      ],
      new SelectionSet(select(playlists))
    ),

  /**
   * @description update data of the table: "tracks"
   */

  update_tracks: (variables, select) =>
    new Field(
      "update_tracks",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(tracks_mutation_response))
    ),

  /**
   * @description update single row of the table: "tracks"
   */

  update_tracks_by_pk: (variables, select) =>
    new Field(
      "update_tracks_by_pk",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("pk_columns", variables.pk_columns),
      ],
      new SelectionSet(select(tracks))
    ),

  /**
   * @description update data of the table: "users"
   */

  update_users: (variables, select) =>
    new Field(
      "update_users",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(users_mutation_response))
    ),

  /**
   * @description update single row of the table: "users"
   */

  update_users_by_pk: (variables, select) =>
    new Field(
      "update_users_by_pk",
      [
        new Argument("_inc", variables._inc),
        new Argument("_set", variables._set),
        new Argument("pk_columns", variables.pk_columns),
      ],
      new SelectionSet(select(users))
    ),
};

export interface Iplaylist_items {
  readonly __typename: "playlist_items";
  readonly createdUtc: unknown | null;
  readonly id: number;
  readonly playlistId: number;
  readonly position: number;
  readonly trackId: number;
}

interface playlist_itemsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items: playlist_itemsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_aggregate {
  readonly __typename: "playlist_items_aggregate";
  readonly aggregate: Iplaylist_items_aggregate_fields | null;
  readonly nodes: ReadonlyArray<Iplaylist_items>;
}

interface playlist_items_aggregateSelector {
  readonly __typename: () => Field<"__typename">;

  readonly aggregate: <T extends Array<Selection>>(
    select: (t: playlist_items_aggregate_fieldsSelector) => T
  ) => Field<"aggregate", never, SelectionSet<T>>;

  readonly nodes: <T extends Array<Selection>>(
    select: (t: playlist_itemsSelector) => T
  ) => Field<"nodes", never, SelectionSet<T>>;
}

export const playlist_items_aggregate: playlist_items_aggregateSelector = {
  __typename: () => new Field("__typename"),

  aggregate: (select) =>
    new Field(
      "aggregate",
      undefined as never,
      new SelectionSet(select(playlist_items_aggregate_fields))
    ),

  nodes: (select) =>
    new Field(
      "nodes",
      undefined as never,
      new SelectionSet(select(playlist_items))
    ),
};

export interface Iplaylist_items_aggregate_fields {
  readonly __typename: "playlist_items_aggregate_fields";
  readonly avg: Iplaylist_items_avg_fields | null;
  readonly count: number | null;
  readonly max: Iplaylist_items_max_fields | null;
  readonly min: Iplaylist_items_min_fields | null;
  readonly stddev: Iplaylist_items_stddev_fields | null;
  readonly stddev_pop: Iplaylist_items_stddev_pop_fields | null;
  readonly stddev_samp: Iplaylist_items_stddev_samp_fields | null;
  readonly sum: Iplaylist_items_sum_fields | null;
  readonly var_pop: Iplaylist_items_var_pop_fields | null;
  readonly var_samp: Iplaylist_items_var_samp_fields | null;
  readonly variance: Iplaylist_items_variance_fields | null;
}

interface playlist_items_aggregate_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly avg: <T extends Array<Selection>>(
    select: (t: playlist_items_avg_fieldsSelector) => T
  ) => Field<"avg", never, SelectionSet<T>>;

  readonly count: (variables: {
    columns?: Variable<"columns"> | playlist_items_select_column;
    distinct?: Variable<"distinct"> | boolean;
  }) => Field<
    "count",
    [
      Argument<"columns", Variable<"columns"> | playlist_items_select_column>,
      Argument<"distinct", Variable<"distinct"> | boolean>
    ]
  >;

  readonly max: <T extends Array<Selection>>(
    select: (t: playlist_items_max_fieldsSelector) => T
  ) => Field<"max", never, SelectionSet<T>>;

  readonly min: <T extends Array<Selection>>(
    select: (t: playlist_items_min_fieldsSelector) => T
  ) => Field<"min", never, SelectionSet<T>>;

  readonly stddev: <T extends Array<Selection>>(
    select: (t: playlist_items_stddev_fieldsSelector) => T
  ) => Field<"stddev", never, SelectionSet<T>>;

  readonly stddev_pop: <T extends Array<Selection>>(
    select: (t: playlist_items_stddev_pop_fieldsSelector) => T
  ) => Field<"stddev_pop", never, SelectionSet<T>>;

  readonly stddev_samp: <T extends Array<Selection>>(
    select: (t: playlist_items_stddev_samp_fieldsSelector) => T
  ) => Field<"stddev_samp", never, SelectionSet<T>>;

  readonly sum: <T extends Array<Selection>>(
    select: (t: playlist_items_sum_fieldsSelector) => T
  ) => Field<"sum", never, SelectionSet<T>>;

  readonly var_pop: <T extends Array<Selection>>(
    select: (t: playlist_items_var_pop_fieldsSelector) => T
  ) => Field<"var_pop", never, SelectionSet<T>>;

  readonly var_samp: <T extends Array<Selection>>(
    select: (t: playlist_items_var_samp_fieldsSelector) => T
  ) => Field<"var_samp", never, SelectionSet<T>>;

  readonly variance: <T extends Array<Selection>>(
    select: (t: playlist_items_variance_fieldsSelector) => T
  ) => Field<"variance", never, SelectionSet<T>>;
}

export const playlist_items_aggregate_fields: playlist_items_aggregate_fieldsSelector = {
  __typename: () => new Field("__typename"),

  avg: (select) =>
    new Field(
      "avg",
      undefined as never,
      new SelectionSet(select(playlist_items_avg_fields))
    ),

  count: (variables) => new Field("count"),

  max: (select) =>
    new Field(
      "max",
      undefined as never,
      new SelectionSet(select(playlist_items_max_fields))
    ),

  min: (select) =>
    new Field(
      "min",
      undefined as never,
      new SelectionSet(select(playlist_items_min_fields))
    ),

  stddev: (select) =>
    new Field(
      "stddev",
      undefined as never,
      new SelectionSet(select(playlist_items_stddev_fields))
    ),

  stddev_pop: (select) =>
    new Field(
      "stddev_pop",
      undefined as never,
      new SelectionSet(select(playlist_items_stddev_pop_fields))
    ),

  stddev_samp: (select) =>
    new Field(
      "stddev_samp",
      undefined as never,
      new SelectionSet(select(playlist_items_stddev_samp_fields))
    ),

  sum: (select) =>
    new Field(
      "sum",
      undefined as never,
      new SelectionSet(select(playlist_items_sum_fields))
    ),

  var_pop: (select) =>
    new Field(
      "var_pop",
      undefined as never,
      new SelectionSet(select(playlist_items_var_pop_fields))
    ),

  var_samp: (select) =>
    new Field(
      "var_samp",
      undefined as never,
      new SelectionSet(select(playlist_items_var_samp_fields))
    ),

  variance: (select) =>
    new Field(
      "variance",
      undefined as never,
      new SelectionSet(select(playlist_items_variance_fields))
    ),
};

export interface Iplaylist_items_avg_fields {
  readonly __typename: "playlist_items_avg_fields";
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_avg_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_avg_fields: playlist_items_avg_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_max_fields {
  readonly __typename: "playlist_items_max_fields";
  readonly createdUtc: unknown | null;
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_max_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_max_fields: playlist_items_max_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_min_fields {
  readonly __typename: "playlist_items_min_fields";
  readonly createdUtc: unknown | null;
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_min_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_min_fields: playlist_items_min_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_mutation_response {
  readonly __typename: "playlist_items_mutation_response";
  readonly affected_rows: number;
  readonly returning: ReadonlyArray<Iplaylist_items>;
}

interface playlist_items_mutation_responseSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description number of affected rows by the mutation
   */

  readonly affected_rows: () => Field<"affected_rows">;

  /**
   * @description data of the affected rows by the mutation
   */

  readonly returning: <T extends Array<Selection>>(
    select: (t: playlist_itemsSelector) => T
  ) => Field<"returning", never, SelectionSet<T>>;
}

export const playlist_items_mutation_response: playlist_items_mutation_responseSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description number of affected rows by the mutation
   */
  affected_rows: () => new Field("affected_rows"),

  /**
   * @description data of the affected rows by the mutation
   */

  returning: (select) =>
    new Field(
      "returning",
      undefined as never,
      new SelectionSet(select(playlist_items))
    ),
};

export interface Iplaylist_items_stddev_fields {
  readonly __typename: "playlist_items_stddev_fields";
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_stddev_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_stddev_fields: playlist_items_stddev_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_stddev_pop_fields {
  readonly __typename: "playlist_items_stddev_pop_fields";
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_stddev_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_stddev_pop_fields: playlist_items_stddev_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_stddev_samp_fields {
  readonly __typename: "playlist_items_stddev_samp_fields";
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_stddev_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_stddev_samp_fields: playlist_items_stddev_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_sum_fields {
  readonly __typename: "playlist_items_sum_fields";
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_sum_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_sum_fields: playlist_items_sum_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_var_pop_fields {
  readonly __typename: "playlist_items_var_pop_fields";
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_var_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_var_pop_fields: playlist_items_var_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_var_samp_fields {
  readonly __typename: "playlist_items_var_samp_fields";
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_var_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_var_samp_fields: playlist_items_var_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylist_items_variance_fields {
  readonly __typename: "playlist_items_variance_fields";
  readonly id: number | null;
  readonly playlistId: number | null;
  readonly position: number | null;
  readonly trackId: number | null;
}

interface playlist_items_variance_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly playlistId: () => Field<"playlistId">;

  readonly position: () => Field<"position">;

  readonly trackId: () => Field<"trackId">;
}

export const playlist_items_variance_fields: playlist_items_variance_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  playlistId: () => new Field("playlistId"),
  position: () => new Field("position"),
  trackId: () => new Field("trackId"),
};

export interface Iplaylists {
  readonly __typename: "playlists";
  readonly createdUtc: unknown | null;
  readonly id: number;
  readonly name: string;
  readonly ownerUserId: number;
}

interface playlistsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly name: () => Field<"name">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists: playlistsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  name: () => new Field("name"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_aggregate {
  readonly __typename: "playlists_aggregate";
  readonly aggregate: Iplaylists_aggregate_fields | null;
  readonly nodes: ReadonlyArray<Iplaylists>;
}

interface playlists_aggregateSelector {
  readonly __typename: () => Field<"__typename">;

  readonly aggregate: <T extends Array<Selection>>(
    select: (t: playlists_aggregate_fieldsSelector) => T
  ) => Field<"aggregate", never, SelectionSet<T>>;

  readonly nodes: <T extends Array<Selection>>(
    select: (t: playlistsSelector) => T
  ) => Field<"nodes", never, SelectionSet<T>>;
}

export const playlists_aggregate: playlists_aggregateSelector = {
  __typename: () => new Field("__typename"),

  aggregate: (select) =>
    new Field(
      "aggregate",
      undefined as never,
      new SelectionSet(select(playlists_aggregate_fields))
    ),

  nodes: (select) =>
    new Field("nodes", undefined as never, new SelectionSet(select(playlists))),
};

export interface Iplaylists_aggregate_fields {
  readonly __typename: "playlists_aggregate_fields";
  readonly avg: Iplaylists_avg_fields | null;
  readonly count: number | null;
  readonly max: Iplaylists_max_fields | null;
  readonly min: Iplaylists_min_fields | null;
  readonly stddev: Iplaylists_stddev_fields | null;
  readonly stddev_pop: Iplaylists_stddev_pop_fields | null;
  readonly stddev_samp: Iplaylists_stddev_samp_fields | null;
  readonly sum: Iplaylists_sum_fields | null;
  readonly var_pop: Iplaylists_var_pop_fields | null;
  readonly var_samp: Iplaylists_var_samp_fields | null;
  readonly variance: Iplaylists_variance_fields | null;
}

interface playlists_aggregate_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly avg: <T extends Array<Selection>>(
    select: (t: playlists_avg_fieldsSelector) => T
  ) => Field<"avg", never, SelectionSet<T>>;

  readonly count: (variables: {
    columns?: Variable<"columns"> | playlists_select_column;
    distinct?: Variable<"distinct"> | boolean;
  }) => Field<
    "count",
    [
      Argument<"columns", Variable<"columns"> | playlists_select_column>,
      Argument<"distinct", Variable<"distinct"> | boolean>
    ]
  >;

  readonly max: <T extends Array<Selection>>(
    select: (t: playlists_max_fieldsSelector) => T
  ) => Field<"max", never, SelectionSet<T>>;

  readonly min: <T extends Array<Selection>>(
    select: (t: playlists_min_fieldsSelector) => T
  ) => Field<"min", never, SelectionSet<T>>;

  readonly stddev: <T extends Array<Selection>>(
    select: (t: playlists_stddev_fieldsSelector) => T
  ) => Field<"stddev", never, SelectionSet<T>>;

  readonly stddev_pop: <T extends Array<Selection>>(
    select: (t: playlists_stddev_pop_fieldsSelector) => T
  ) => Field<"stddev_pop", never, SelectionSet<T>>;

  readonly stddev_samp: <T extends Array<Selection>>(
    select: (t: playlists_stddev_samp_fieldsSelector) => T
  ) => Field<"stddev_samp", never, SelectionSet<T>>;

  readonly sum: <T extends Array<Selection>>(
    select: (t: playlists_sum_fieldsSelector) => T
  ) => Field<"sum", never, SelectionSet<T>>;

  readonly var_pop: <T extends Array<Selection>>(
    select: (t: playlists_var_pop_fieldsSelector) => T
  ) => Field<"var_pop", never, SelectionSet<T>>;

  readonly var_samp: <T extends Array<Selection>>(
    select: (t: playlists_var_samp_fieldsSelector) => T
  ) => Field<"var_samp", never, SelectionSet<T>>;

  readonly variance: <T extends Array<Selection>>(
    select: (t: playlists_variance_fieldsSelector) => T
  ) => Field<"variance", never, SelectionSet<T>>;
}

export const playlists_aggregate_fields: playlists_aggregate_fieldsSelector = {
  __typename: () => new Field("__typename"),

  avg: (select) =>
    new Field(
      "avg",
      undefined as never,
      new SelectionSet(select(playlists_avg_fields))
    ),

  count: (variables) => new Field("count"),

  max: (select) =>
    new Field(
      "max",
      undefined as never,
      new SelectionSet(select(playlists_max_fields))
    ),

  min: (select) =>
    new Field(
      "min",
      undefined as never,
      new SelectionSet(select(playlists_min_fields))
    ),

  stddev: (select) =>
    new Field(
      "stddev",
      undefined as never,
      new SelectionSet(select(playlists_stddev_fields))
    ),

  stddev_pop: (select) =>
    new Field(
      "stddev_pop",
      undefined as never,
      new SelectionSet(select(playlists_stddev_pop_fields))
    ),

  stddev_samp: (select) =>
    new Field(
      "stddev_samp",
      undefined as never,
      new SelectionSet(select(playlists_stddev_samp_fields))
    ),

  sum: (select) =>
    new Field(
      "sum",
      undefined as never,
      new SelectionSet(select(playlists_sum_fields))
    ),

  var_pop: (select) =>
    new Field(
      "var_pop",
      undefined as never,
      new SelectionSet(select(playlists_var_pop_fields))
    ),

  var_samp: (select) =>
    new Field(
      "var_samp",
      undefined as never,
      new SelectionSet(select(playlists_var_samp_fields))
    ),

  variance: (select) =>
    new Field(
      "variance",
      undefined as never,
      new SelectionSet(select(playlists_variance_fields))
    ),
};

export interface Iplaylists_avg_fields {
  readonly __typename: "playlists_avg_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
}

interface playlists_avg_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_avg_fields: playlists_avg_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_max_fields {
  readonly __typename: "playlists_max_fields";
  readonly createdUtc: unknown | null;
  readonly id: number | null;
  readonly name: string | null;
  readonly ownerUserId: number | null;
}

interface playlists_max_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly name: () => Field<"name">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_max_fields: playlists_max_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  name: () => new Field("name"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_min_fields {
  readonly __typename: "playlists_min_fields";
  readonly createdUtc: unknown | null;
  readonly id: number | null;
  readonly name: string | null;
  readonly ownerUserId: number | null;
}

interface playlists_min_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly name: () => Field<"name">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_min_fields: playlists_min_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  name: () => new Field("name"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_mutation_response {
  readonly __typename: "playlists_mutation_response";
  readonly affected_rows: number;
  readonly returning: ReadonlyArray<Iplaylists>;
}

interface playlists_mutation_responseSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description number of affected rows by the mutation
   */

  readonly affected_rows: () => Field<"affected_rows">;

  /**
   * @description data of the affected rows by the mutation
   */

  readonly returning: <T extends Array<Selection>>(
    select: (t: playlistsSelector) => T
  ) => Field<"returning", never, SelectionSet<T>>;
}

export const playlists_mutation_response: playlists_mutation_responseSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description number of affected rows by the mutation
   */
  affected_rows: () => new Field("affected_rows"),

  /**
   * @description data of the affected rows by the mutation
   */

  returning: (select) =>
    new Field(
      "returning",
      undefined as never,
      new SelectionSet(select(playlists))
    ),
};

export interface Iplaylists_stddev_fields {
  readonly __typename: "playlists_stddev_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
}

interface playlists_stddev_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_stddev_fields: playlists_stddev_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_stddev_pop_fields {
  readonly __typename: "playlists_stddev_pop_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
}

interface playlists_stddev_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_stddev_pop_fields: playlists_stddev_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_stddev_samp_fields {
  readonly __typename: "playlists_stddev_samp_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
}

interface playlists_stddev_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_stddev_samp_fields: playlists_stddev_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_sum_fields {
  readonly __typename: "playlists_sum_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
}

interface playlists_sum_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_sum_fields: playlists_sum_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_var_pop_fields {
  readonly __typename: "playlists_var_pop_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
}

interface playlists_var_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_var_pop_fields: playlists_var_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_var_samp_fields {
  readonly __typename: "playlists_var_samp_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
}

interface playlists_var_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_var_samp_fields: playlists_var_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iplaylists_variance_fields {
  readonly __typename: "playlists_variance_fields";
  readonly id: number | null;
  readonly ownerUserId: number | null;
}

interface playlists_variance_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;

  readonly ownerUserId: () => Field<"ownerUserId">;
}

export const playlists_variance_fields: playlists_variance_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
  ownerUserId: () => new Field("ownerUserId"),
};

export interface Iquery_root {
  readonly __typename: "query_root";
  readonly bookmarks: ReadonlyArray<Ibookmarks>;
  readonly bookmarks_aggregate: Ibookmarks_aggregate;
  readonly bookmarks_by_pk: Ibookmarks | null;
  readonly playlist_items: ReadonlyArray<Iplaylist_items>;
  readonly playlist_items_aggregate: Iplaylist_items_aggregate;
  readonly playlist_items_by_pk: Iplaylist_items | null;
  readonly playlists: ReadonlyArray<Iplaylists>;
  readonly playlists_aggregate: Iplaylists_aggregate;
  readonly playlists_by_pk: Iplaylists | null;
  readonly tracks: ReadonlyArray<Itracks>;
  readonly tracks_aggregate: Itracks_aggregate;
  readonly tracks_by_pk: Itracks | null;
  readonly users: ReadonlyArray<Iusers>;
  readonly users_aggregate: Iusers_aggregate;
  readonly users_by_pk: Iusers | null;
}

interface query_rootSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description fetch data from the table: "bookmarks"
   */

  readonly bookmarks: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | bookmarks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | bookmarks_order_by;
      where?: Variable<"where"> | bookmarks_bool_exp;
    },
    select: (t: bookmarksSelector) => T
  ) => Field<
    "bookmarks",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | bookmarks_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | bookmarks_order_by>,
      Argument<"where", Variable<"where"> | bookmarks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "bookmarks"
   */

  readonly bookmarks_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | bookmarks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | bookmarks_order_by;
      where?: Variable<"where"> | bookmarks_bool_exp;
    },
    select: (t: bookmarks_aggregateSelector) => T
  ) => Field<
    "bookmarks_aggregate",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | bookmarks_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | bookmarks_order_by>,
      Argument<"where", Variable<"where"> | bookmarks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "bookmarks" using primary key columns
   */

  readonly bookmarks_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: bookmarksSelector) => T
  ) => Field<
    "bookmarks_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "playlist_items"
   */

  readonly playlist_items: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlist_items_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlist_items_order_by;
      where?: Variable<"where"> | playlist_items_bool_exp;
    },
    select: (t: playlist_itemsSelector) => T
  ) => Field<
    "playlist_items",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlist_items_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlist_items_order_by>,
      Argument<"where", Variable<"where"> | playlist_items_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "playlist_items"
   */

  readonly playlist_items_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlist_items_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlist_items_order_by;
      where?: Variable<"where"> | playlist_items_bool_exp;
    },
    select: (t: playlist_items_aggregateSelector) => T
  ) => Field<
    "playlist_items_aggregate",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlist_items_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlist_items_order_by>,
      Argument<"where", Variable<"where"> | playlist_items_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "playlist_items" using primary key columns
   */

  readonly playlist_items_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: playlist_itemsSelector) => T
  ) => Field<
    "playlist_items_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "playlists"
   */

  readonly playlists: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlists_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlists_order_by;
      where?: Variable<"where"> | playlists_bool_exp;
    },
    select: (t: playlistsSelector) => T
  ) => Field<
    "playlists",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlists_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlists_order_by>,
      Argument<"where", Variable<"where"> | playlists_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "playlists"
   */

  readonly playlists_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlists_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlists_order_by;
      where?: Variable<"where"> | playlists_bool_exp;
    },
    select: (t: playlists_aggregateSelector) => T
  ) => Field<
    "playlists_aggregate",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlists_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlists_order_by>,
      Argument<"where", Variable<"where"> | playlists_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "playlists" using primary key columns
   */

  readonly playlists_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: playlistsSelector) => T
  ) => Field<
    "playlists_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "tracks"
   */

  readonly tracks: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | tracks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | tracks_order_by;
      where?: Variable<"where"> | tracks_bool_exp;
    },
    select: (t: tracksSelector) => T
  ) => Field<
    "tracks",
    [
      Argument<"distinct_on", Variable<"distinct_on"> | tracks_select_column>,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | tracks_order_by>,
      Argument<"where", Variable<"where"> | tracks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "tracks"
   */

  readonly tracks_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | tracks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | tracks_order_by;
      where?: Variable<"where"> | tracks_bool_exp;
    },
    select: (t: tracks_aggregateSelector) => T
  ) => Field<
    "tracks_aggregate",
    [
      Argument<"distinct_on", Variable<"distinct_on"> | tracks_select_column>,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | tracks_order_by>,
      Argument<"where", Variable<"where"> | tracks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "tracks" using primary key columns
   */

  readonly tracks_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: tracksSelector) => T
  ) => Field<
    "tracks_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "users"
   */

  readonly users: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | users_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | users_order_by;
      where?: Variable<"where"> | users_bool_exp;
    },
    select: (t: usersSelector) => T
  ) => Field<
    "users",
    [
      Argument<"distinct_on", Variable<"distinct_on"> | users_select_column>,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | users_order_by>,
      Argument<"where", Variable<"where"> | users_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "users"
   */

  readonly users_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | users_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | users_order_by;
      where?: Variable<"where"> | users_bool_exp;
    },
    select: (t: users_aggregateSelector) => T
  ) => Field<
    "users_aggregate",
    [
      Argument<"distinct_on", Variable<"distinct_on"> | users_select_column>,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | users_order_by>,
      Argument<"where", Variable<"where"> | users_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "users" using primary key columns
   */

  readonly users_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: usersSelector) => T
  ) => Field<
    "users_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;
}

export const query_root: query_rootSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description fetch data from the table: "bookmarks"
   */

  bookmarks: (variables, select) =>
    new Field(
      "bookmarks",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          bookmarks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(bookmarks))
    ),

  /**
   * @description fetch aggregated fields from the table: "bookmarks"
   */

  bookmarks_aggregate: (variables, select) =>
    new Field(
      "bookmarks_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          bookmarks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(bookmarks_aggregate))
    ),

  /**
   * @description fetch data from the table: "bookmarks" using primary key columns
   */

  bookmarks_by_pk: (variables, select) =>
    new Field(
      "bookmarks_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(bookmarks))
    ),

  /**
   * @description fetch data from the table: "playlist_items"
   */

  playlist_items: (variables, select) =>
    new Field(
      "playlist_items",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlist_items_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlist_items))
    ),

  /**
   * @description fetch aggregated fields from the table: "playlist_items"
   */

  playlist_items_aggregate: (variables, select) =>
    new Field(
      "playlist_items_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlist_items_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlist_items_aggregate))
    ),

  /**
   * @description fetch data from the table: "playlist_items" using primary key columns
   */

  playlist_items_by_pk: (variables, select) =>
    new Field(
      "playlist_items_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(playlist_items))
    ),

  /**
   * @description fetch data from the table: "playlists"
   */

  playlists: (variables, select) =>
    new Field(
      "playlists",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlists_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlists))
    ),

  /**
   * @description fetch aggregated fields from the table: "playlists"
   */

  playlists_aggregate: (variables, select) =>
    new Field(
      "playlists_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlists_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlists_aggregate))
    ),

  /**
   * @description fetch data from the table: "playlists" using primary key columns
   */

  playlists_by_pk: (variables, select) =>
    new Field(
      "playlists_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(playlists))
    ),

  /**
   * @description fetch data from the table: "tracks"
   */

  tracks: (variables, select) =>
    new Field(
      "tracks",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          tracks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(tracks))
    ),

  /**
   * @description fetch aggregated fields from the table: "tracks"
   */

  tracks_aggregate: (variables, select) =>
    new Field(
      "tracks_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          tracks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(tracks_aggregate))
    ),

  /**
   * @description fetch data from the table: "tracks" using primary key columns
   */

  tracks_by_pk: (variables, select) =>
    new Field(
      "tracks_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(tracks))
    ),

  /**
   * @description fetch data from the table: "users"
   */

  users: (variables, select) =>
    new Field(
      "users",
      [
        new Argument("distinct_on", variables.distinct_on, users_select_column),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(users))
    ),

  /**
   * @description fetch aggregated fields from the table: "users"
   */

  users_aggregate: (variables, select) =>
    new Field(
      "users_aggregate",
      [
        new Argument("distinct_on", variables.distinct_on, users_select_column),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(users_aggregate))
    ),

  /**
   * @description fetch data from the table: "users" using primary key columns
   */

  users_by_pk: (variables, select) =>
    new Field(
      "users_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(users))
    ),
};

export interface Isubscription_root {
  readonly __typename: "subscription_root";
  readonly bookmarks: ReadonlyArray<Ibookmarks>;
  readonly bookmarks_aggregate: Ibookmarks_aggregate;
  readonly bookmarks_by_pk: Ibookmarks | null;
  readonly playlist_items: ReadonlyArray<Iplaylist_items>;
  readonly playlist_items_aggregate: Iplaylist_items_aggregate;
  readonly playlist_items_by_pk: Iplaylist_items | null;
  readonly playlists: ReadonlyArray<Iplaylists>;
  readonly playlists_aggregate: Iplaylists_aggregate;
  readonly playlists_by_pk: Iplaylists | null;
  readonly tracks: ReadonlyArray<Itracks>;
  readonly tracks_aggregate: Itracks_aggregate;
  readonly tracks_by_pk: Itracks | null;
  readonly users: ReadonlyArray<Iusers>;
  readonly users_aggregate: Iusers_aggregate;
  readonly users_by_pk: Iusers | null;
}

interface subscription_rootSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description fetch data from the table: "bookmarks"
   */

  readonly bookmarks: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | bookmarks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | bookmarks_order_by;
      where?: Variable<"where"> | bookmarks_bool_exp;
    },
    select: (t: bookmarksSelector) => T
  ) => Field<
    "bookmarks",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | bookmarks_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | bookmarks_order_by>,
      Argument<"where", Variable<"where"> | bookmarks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "bookmarks"
   */

  readonly bookmarks_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | bookmarks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | bookmarks_order_by;
      where?: Variable<"where"> | bookmarks_bool_exp;
    },
    select: (t: bookmarks_aggregateSelector) => T
  ) => Field<
    "bookmarks_aggregate",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | bookmarks_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | bookmarks_order_by>,
      Argument<"where", Variable<"where"> | bookmarks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "bookmarks" using primary key columns
   */

  readonly bookmarks_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: bookmarksSelector) => T
  ) => Field<
    "bookmarks_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "playlist_items"
   */

  readonly playlist_items: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlist_items_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlist_items_order_by;
      where?: Variable<"where"> | playlist_items_bool_exp;
    },
    select: (t: playlist_itemsSelector) => T
  ) => Field<
    "playlist_items",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlist_items_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlist_items_order_by>,
      Argument<"where", Variable<"where"> | playlist_items_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "playlist_items"
   */

  readonly playlist_items_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlist_items_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlist_items_order_by;
      where?: Variable<"where"> | playlist_items_bool_exp;
    },
    select: (t: playlist_items_aggregateSelector) => T
  ) => Field<
    "playlist_items_aggregate",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlist_items_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlist_items_order_by>,
      Argument<"where", Variable<"where"> | playlist_items_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "playlist_items" using primary key columns
   */

  readonly playlist_items_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: playlist_itemsSelector) => T
  ) => Field<
    "playlist_items_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "playlists"
   */

  readonly playlists: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlists_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlists_order_by;
      where?: Variable<"where"> | playlists_bool_exp;
    },
    select: (t: playlistsSelector) => T
  ) => Field<
    "playlists",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlists_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlists_order_by>,
      Argument<"where", Variable<"where"> | playlists_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "playlists"
   */

  readonly playlists_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlists_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlists_order_by;
      where?: Variable<"where"> | playlists_bool_exp;
    },
    select: (t: playlists_aggregateSelector) => T
  ) => Field<
    "playlists_aggregate",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlists_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlists_order_by>,
      Argument<"where", Variable<"where"> | playlists_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "playlists" using primary key columns
   */

  readonly playlists_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: playlistsSelector) => T
  ) => Field<
    "playlists_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "tracks"
   */

  readonly tracks: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | tracks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | tracks_order_by;
      where?: Variable<"where"> | tracks_bool_exp;
    },
    select: (t: tracksSelector) => T
  ) => Field<
    "tracks",
    [
      Argument<"distinct_on", Variable<"distinct_on"> | tracks_select_column>,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | tracks_order_by>,
      Argument<"where", Variable<"where"> | tracks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "tracks"
   */

  readonly tracks_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | tracks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | tracks_order_by;
      where?: Variable<"where"> | tracks_bool_exp;
    },
    select: (t: tracks_aggregateSelector) => T
  ) => Field<
    "tracks_aggregate",
    [
      Argument<"distinct_on", Variable<"distinct_on"> | tracks_select_column>,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | tracks_order_by>,
      Argument<"where", Variable<"where"> | tracks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "tracks" using primary key columns
   */

  readonly tracks_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: tracksSelector) => T
  ) => Field<
    "tracks_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "users"
   */

  readonly users: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | users_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | users_order_by;
      where?: Variable<"where"> | users_bool_exp;
    },
    select: (t: usersSelector) => T
  ) => Field<
    "users",
    [
      Argument<"distinct_on", Variable<"distinct_on"> | users_select_column>,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | users_order_by>,
      Argument<"where", Variable<"where"> | users_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch aggregated fields from the table: "users"
   */

  readonly users_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | users_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | users_order_by;
      where?: Variable<"where"> | users_bool_exp;
    },
    select: (t: users_aggregateSelector) => T
  ) => Field<
    "users_aggregate",
    [
      Argument<"distinct_on", Variable<"distinct_on"> | users_select_column>,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | users_order_by>,
      Argument<"where", Variable<"where"> | users_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description fetch data from the table: "users" using primary key columns
   */

  readonly users_by_pk: <T extends Array<Selection>>(
    variables: { id?: Variable<"id"> | number },
    select: (t: usersSelector) => T
  ) => Field<
    "users_by_pk",
    [Argument<"id", Variable<"id"> | number>],
    SelectionSet<T>
  >;
}

export const subscription_root: subscription_rootSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description fetch data from the table: "bookmarks"
   */

  bookmarks: (variables, select) =>
    new Field(
      "bookmarks",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          bookmarks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(bookmarks))
    ),

  /**
   * @description fetch aggregated fields from the table: "bookmarks"
   */

  bookmarks_aggregate: (variables, select) =>
    new Field(
      "bookmarks_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          bookmarks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(bookmarks_aggregate))
    ),

  /**
   * @description fetch data from the table: "bookmarks" using primary key columns
   */

  bookmarks_by_pk: (variables, select) =>
    new Field(
      "bookmarks_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(bookmarks))
    ),

  /**
   * @description fetch data from the table: "playlist_items"
   */

  playlist_items: (variables, select) =>
    new Field(
      "playlist_items",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlist_items_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlist_items))
    ),

  /**
   * @description fetch aggregated fields from the table: "playlist_items"
   */

  playlist_items_aggregate: (variables, select) =>
    new Field(
      "playlist_items_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlist_items_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlist_items_aggregate))
    ),

  /**
   * @description fetch data from the table: "playlist_items" using primary key columns
   */

  playlist_items_by_pk: (variables, select) =>
    new Field(
      "playlist_items_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(playlist_items))
    ),

  /**
   * @description fetch data from the table: "playlists"
   */

  playlists: (variables, select) =>
    new Field(
      "playlists",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlists_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlists))
    ),

  /**
   * @description fetch aggregated fields from the table: "playlists"
   */

  playlists_aggregate: (variables, select) =>
    new Field(
      "playlists_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlists_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlists_aggregate))
    ),

  /**
   * @description fetch data from the table: "playlists" using primary key columns
   */

  playlists_by_pk: (variables, select) =>
    new Field(
      "playlists_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(playlists))
    ),

  /**
   * @description fetch data from the table: "tracks"
   */

  tracks: (variables, select) =>
    new Field(
      "tracks",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          tracks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(tracks))
    ),

  /**
   * @description fetch aggregated fields from the table: "tracks"
   */

  tracks_aggregate: (variables, select) =>
    new Field(
      "tracks_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          tracks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(tracks_aggregate))
    ),

  /**
   * @description fetch data from the table: "tracks" using primary key columns
   */

  tracks_by_pk: (variables, select) =>
    new Field(
      "tracks_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(tracks))
    ),

  /**
   * @description fetch data from the table: "users"
   */

  users: (variables, select) =>
    new Field(
      "users",
      [
        new Argument("distinct_on", variables.distinct_on, users_select_column),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(users))
    ),

  /**
   * @description fetch aggregated fields from the table: "users"
   */

  users_aggregate: (variables, select) =>
    new Field(
      "users_aggregate",
      [
        new Argument("distinct_on", variables.distinct_on, users_select_column),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(users_aggregate))
    ),

  /**
   * @description fetch data from the table: "users" using primary key columns
   */

  users_by_pk: (variables, select) =>
    new Field(
      "users_by_pk",
      [new Argument("id", variables.id)],
      new SelectionSet(select(users))
    ),
};

export interface Itracks {
  readonly __typename: "tracks";
  readonly createdUtc: unknown;
  readonly id: number;
  readonly name: string;
  readonly napsterId: string | null;
}

interface tracksSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly name: () => Field<"name">;

  readonly napsterId: () => Field<"napsterId">;
}

export const tracks: tracksSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  name: () => new Field("name"),
  napsterId: () => new Field("napsterId"),
};

export interface Itracks_aggregate {
  readonly __typename: "tracks_aggregate";
  readonly aggregate: Itracks_aggregate_fields | null;
  readonly nodes: ReadonlyArray<Itracks>;
}

interface tracks_aggregateSelector {
  readonly __typename: () => Field<"__typename">;

  readonly aggregate: <T extends Array<Selection>>(
    select: (t: tracks_aggregate_fieldsSelector) => T
  ) => Field<"aggregate", never, SelectionSet<T>>;

  readonly nodes: <T extends Array<Selection>>(
    select: (t: tracksSelector) => T
  ) => Field<"nodes", never, SelectionSet<T>>;
}

export const tracks_aggregate: tracks_aggregateSelector = {
  __typename: () => new Field("__typename"),

  aggregate: (select) =>
    new Field(
      "aggregate",
      undefined as never,
      new SelectionSet(select(tracks_aggregate_fields))
    ),

  nodes: (select) =>
    new Field("nodes", undefined as never, new SelectionSet(select(tracks))),
};

export interface Itracks_aggregate_fields {
  readonly __typename: "tracks_aggregate_fields";
  readonly avg: Itracks_avg_fields | null;
  readonly count: number | null;
  readonly max: Itracks_max_fields | null;
  readonly min: Itracks_min_fields | null;
  readonly stddev: Itracks_stddev_fields | null;
  readonly stddev_pop: Itracks_stddev_pop_fields | null;
  readonly stddev_samp: Itracks_stddev_samp_fields | null;
  readonly sum: Itracks_sum_fields | null;
  readonly var_pop: Itracks_var_pop_fields | null;
  readonly var_samp: Itracks_var_samp_fields | null;
  readonly variance: Itracks_variance_fields | null;
}

interface tracks_aggregate_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly avg: <T extends Array<Selection>>(
    select: (t: tracks_avg_fieldsSelector) => T
  ) => Field<"avg", never, SelectionSet<T>>;

  readonly count: (variables: {
    columns?: Variable<"columns"> | tracks_select_column;
    distinct?: Variable<"distinct"> | boolean;
  }) => Field<
    "count",
    [
      Argument<"columns", Variable<"columns"> | tracks_select_column>,
      Argument<"distinct", Variable<"distinct"> | boolean>
    ]
  >;

  readonly max: <T extends Array<Selection>>(
    select: (t: tracks_max_fieldsSelector) => T
  ) => Field<"max", never, SelectionSet<T>>;

  readonly min: <T extends Array<Selection>>(
    select: (t: tracks_min_fieldsSelector) => T
  ) => Field<"min", never, SelectionSet<T>>;

  readonly stddev: <T extends Array<Selection>>(
    select: (t: tracks_stddev_fieldsSelector) => T
  ) => Field<"stddev", never, SelectionSet<T>>;

  readonly stddev_pop: <T extends Array<Selection>>(
    select: (t: tracks_stddev_pop_fieldsSelector) => T
  ) => Field<"stddev_pop", never, SelectionSet<T>>;

  readonly stddev_samp: <T extends Array<Selection>>(
    select: (t: tracks_stddev_samp_fieldsSelector) => T
  ) => Field<"stddev_samp", never, SelectionSet<T>>;

  readonly sum: <T extends Array<Selection>>(
    select: (t: tracks_sum_fieldsSelector) => T
  ) => Field<"sum", never, SelectionSet<T>>;

  readonly var_pop: <T extends Array<Selection>>(
    select: (t: tracks_var_pop_fieldsSelector) => T
  ) => Field<"var_pop", never, SelectionSet<T>>;

  readonly var_samp: <T extends Array<Selection>>(
    select: (t: tracks_var_samp_fieldsSelector) => T
  ) => Field<"var_samp", never, SelectionSet<T>>;

  readonly variance: <T extends Array<Selection>>(
    select: (t: tracks_variance_fieldsSelector) => T
  ) => Field<"variance", never, SelectionSet<T>>;
}

export const tracks_aggregate_fields: tracks_aggregate_fieldsSelector = {
  __typename: () => new Field("__typename"),

  avg: (select) =>
    new Field(
      "avg",
      undefined as never,
      new SelectionSet(select(tracks_avg_fields))
    ),

  count: (variables) => new Field("count"),

  max: (select) =>
    new Field(
      "max",
      undefined as never,
      new SelectionSet(select(tracks_max_fields))
    ),

  min: (select) =>
    new Field(
      "min",
      undefined as never,
      new SelectionSet(select(tracks_min_fields))
    ),

  stddev: (select) =>
    new Field(
      "stddev",
      undefined as never,
      new SelectionSet(select(tracks_stddev_fields))
    ),

  stddev_pop: (select) =>
    new Field(
      "stddev_pop",
      undefined as never,
      new SelectionSet(select(tracks_stddev_pop_fields))
    ),

  stddev_samp: (select) =>
    new Field(
      "stddev_samp",
      undefined as never,
      new SelectionSet(select(tracks_stddev_samp_fields))
    ),

  sum: (select) =>
    new Field(
      "sum",
      undefined as never,
      new SelectionSet(select(tracks_sum_fields))
    ),

  var_pop: (select) =>
    new Field(
      "var_pop",
      undefined as never,
      new SelectionSet(select(tracks_var_pop_fields))
    ),

  var_samp: (select) =>
    new Field(
      "var_samp",
      undefined as never,
      new SelectionSet(select(tracks_var_samp_fields))
    ),

  variance: (select) =>
    new Field(
      "variance",
      undefined as never,
      new SelectionSet(select(tracks_variance_fields))
    ),
};

export interface Itracks_avg_fields {
  readonly __typename: "tracks_avg_fields";
  readonly id: number | null;
}

interface tracks_avg_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const tracks_avg_fields: tracks_avg_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Itracks_max_fields {
  readonly __typename: "tracks_max_fields";
  readonly createdUtc: unknown | null;
  readonly id: number | null;
  readonly name: string | null;
  readonly napsterId: string | null;
}

interface tracks_max_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly name: () => Field<"name">;

  readonly napsterId: () => Field<"napsterId">;
}

export const tracks_max_fields: tracks_max_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  name: () => new Field("name"),
  napsterId: () => new Field("napsterId"),
};

export interface Itracks_min_fields {
  readonly __typename: "tracks_min_fields";
  readonly createdUtc: unknown | null;
  readonly id: number | null;
  readonly name: string | null;
  readonly napsterId: string | null;
}

interface tracks_min_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly id: () => Field<"id">;

  readonly name: () => Field<"name">;

  readonly napsterId: () => Field<"napsterId">;
}

export const tracks_min_fields: tracks_min_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  id: () => new Field("id"),
  name: () => new Field("name"),
  napsterId: () => new Field("napsterId"),
};

export interface Itracks_mutation_response {
  readonly __typename: "tracks_mutation_response";
  readonly affected_rows: number;
  readonly returning: ReadonlyArray<Itracks>;
}

interface tracks_mutation_responseSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description number of affected rows by the mutation
   */

  readonly affected_rows: () => Field<"affected_rows">;

  /**
   * @description data of the affected rows by the mutation
   */

  readonly returning: <T extends Array<Selection>>(
    select: (t: tracksSelector) => T
  ) => Field<"returning", never, SelectionSet<T>>;
}

export const tracks_mutation_response: tracks_mutation_responseSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description number of affected rows by the mutation
   */
  affected_rows: () => new Field("affected_rows"),

  /**
   * @description data of the affected rows by the mutation
   */

  returning: (select) =>
    new Field(
      "returning",
      undefined as never,
      new SelectionSet(select(tracks))
    ),
};

export interface Itracks_stddev_fields {
  readonly __typename: "tracks_stddev_fields";
  readonly id: number | null;
}

interface tracks_stddev_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const tracks_stddev_fields: tracks_stddev_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Itracks_stddev_pop_fields {
  readonly __typename: "tracks_stddev_pop_fields";
  readonly id: number | null;
}

interface tracks_stddev_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const tracks_stddev_pop_fields: tracks_stddev_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Itracks_stddev_samp_fields {
  readonly __typename: "tracks_stddev_samp_fields";
  readonly id: number | null;
}

interface tracks_stddev_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const tracks_stddev_samp_fields: tracks_stddev_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Itracks_sum_fields {
  readonly __typename: "tracks_sum_fields";
  readonly id: number | null;
}

interface tracks_sum_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const tracks_sum_fields: tracks_sum_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Itracks_var_pop_fields {
  readonly __typename: "tracks_var_pop_fields";
  readonly id: number | null;
}

interface tracks_var_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const tracks_var_pop_fields: tracks_var_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Itracks_var_samp_fields {
  readonly __typename: "tracks_var_samp_fields";
  readonly id: number | null;
}

interface tracks_var_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const tracks_var_samp_fields: tracks_var_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Itracks_variance_fields {
  readonly __typename: "tracks_variance_fields";
  readonly id: number | null;
}

interface tracks_variance_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const tracks_variance_fields: tracks_variance_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Iusers {
  readonly __typename: "users";
  readonly bookmarks: ReadonlyArray<Ibookmarks>;
  readonly bookmarks_aggregate: Ibookmarks_aggregate;
  readonly createdUtc: unknown | null;
  readonly email: string | null;
  readonly id: number;
  readonly playlists: ReadonlyArray<Iplaylists>;
  readonly playlists_aggregate: Iplaylists_aggregate;
}

interface usersSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description An array relationship
   */

  readonly bookmarks: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | bookmarks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | bookmarks_order_by;
      where?: Variable<"where"> | bookmarks_bool_exp;
    },
    select: (t: bookmarksSelector) => T
  ) => Field<
    "bookmarks",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | bookmarks_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | bookmarks_order_by>,
      Argument<"where", Variable<"where"> | bookmarks_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description An aggregated array relationship
   */

  readonly bookmarks_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | bookmarks_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | bookmarks_order_by;
      where?: Variable<"where"> | bookmarks_bool_exp;
    },
    select: (t: bookmarks_aggregateSelector) => T
  ) => Field<
    "bookmarks_aggregate",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | bookmarks_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | bookmarks_order_by>,
      Argument<"where", Variable<"where"> | bookmarks_bool_exp>
    ],
    SelectionSet<T>
  >;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly email: () => Field<"email">;

  readonly id: () => Field<"id">;

  /**
   * @description An array relationship
   */

  readonly playlists: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlists_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlists_order_by;
      where?: Variable<"where"> | playlists_bool_exp;
    },
    select: (t: playlistsSelector) => T
  ) => Field<
    "playlists",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlists_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlists_order_by>,
      Argument<"where", Variable<"where"> | playlists_bool_exp>
    ],
    SelectionSet<T>
  >;

  /**
   * @description An aggregated array relationship
   */

  readonly playlists_aggregate: <T extends Array<Selection>>(
    variables: {
      distinct_on?: Variable<"distinct_on"> | playlists_select_column;
      limit?: Variable<"limit"> | number;
      offset?: Variable<"offset"> | number;
      order_by?: Variable<"order_by"> | playlists_order_by;
      where?: Variable<"where"> | playlists_bool_exp;
    },
    select: (t: playlists_aggregateSelector) => T
  ) => Field<
    "playlists_aggregate",
    [
      Argument<
        "distinct_on",
        Variable<"distinct_on"> | playlists_select_column
      >,
      Argument<"limit", Variable<"limit"> | number>,
      Argument<"offset", Variable<"offset"> | number>,
      Argument<"order_by", Variable<"order_by"> | playlists_order_by>,
      Argument<"where", Variable<"where"> | playlists_bool_exp>
    ],
    SelectionSet<T>
  >;
}

export const users: usersSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description An array relationship
   */

  bookmarks: (variables, select) =>
    new Field(
      "bookmarks",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          bookmarks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(bookmarks))
    ),

  /**
   * @description An aggregated array relationship
   */

  bookmarks_aggregate: (variables, select) =>
    new Field(
      "bookmarks_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          bookmarks_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(bookmarks_aggregate))
    ),

  createdUtc: () => new Field("createdUtc"),
  email: () => new Field("email"),
  id: () => new Field("id"),

  /**
   * @description An array relationship
   */

  playlists: (variables, select) =>
    new Field(
      "playlists",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlists_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlists))
    ),

  /**
   * @description An aggregated array relationship
   */

  playlists_aggregate: (variables, select) =>
    new Field(
      "playlists_aggregate",
      [
        new Argument(
          "distinct_on",
          variables.distinct_on,
          playlists_select_column
        ),
        new Argument("limit", variables.limit),
        new Argument("offset", variables.offset),
        new Argument("order_by", variables.order_by),
        new Argument("where", variables.where),
      ],
      new SelectionSet(select(playlists_aggregate))
    ),
};

export interface Iusers_aggregate {
  readonly __typename: "users_aggregate";
  readonly aggregate: Iusers_aggregate_fields | null;
  readonly nodes: ReadonlyArray<Iusers>;
}

interface users_aggregateSelector {
  readonly __typename: () => Field<"__typename">;

  readonly aggregate: <T extends Array<Selection>>(
    select: (t: users_aggregate_fieldsSelector) => T
  ) => Field<"aggregate", never, SelectionSet<T>>;

  readonly nodes: <T extends Array<Selection>>(
    select: (t: usersSelector) => T
  ) => Field<"nodes", never, SelectionSet<T>>;
}

export const users_aggregate: users_aggregateSelector = {
  __typename: () => new Field("__typename"),

  aggregate: (select) =>
    new Field(
      "aggregate",
      undefined as never,
      new SelectionSet(select(users_aggregate_fields))
    ),

  nodes: (select) =>
    new Field("nodes", undefined as never, new SelectionSet(select(users))),
};

export interface Iusers_aggregate_fields {
  readonly __typename: "users_aggregate_fields";
  readonly avg: Iusers_avg_fields | null;
  readonly count: number | null;
  readonly max: Iusers_max_fields | null;
  readonly min: Iusers_min_fields | null;
  readonly stddev: Iusers_stddev_fields | null;
  readonly stddev_pop: Iusers_stddev_pop_fields | null;
  readonly stddev_samp: Iusers_stddev_samp_fields | null;
  readonly sum: Iusers_sum_fields | null;
  readonly var_pop: Iusers_var_pop_fields | null;
  readonly var_samp: Iusers_var_samp_fields | null;
  readonly variance: Iusers_variance_fields | null;
}

interface users_aggregate_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly avg: <T extends Array<Selection>>(
    select: (t: users_avg_fieldsSelector) => T
  ) => Field<"avg", never, SelectionSet<T>>;

  readonly count: (variables: {
    columns?: Variable<"columns"> | users_select_column;
    distinct?: Variable<"distinct"> | boolean;
  }) => Field<
    "count",
    [
      Argument<"columns", Variable<"columns"> | users_select_column>,
      Argument<"distinct", Variable<"distinct"> | boolean>
    ]
  >;

  readonly max: <T extends Array<Selection>>(
    select: (t: users_max_fieldsSelector) => T
  ) => Field<"max", never, SelectionSet<T>>;

  readonly min: <T extends Array<Selection>>(
    select: (t: users_min_fieldsSelector) => T
  ) => Field<"min", never, SelectionSet<T>>;

  readonly stddev: <T extends Array<Selection>>(
    select: (t: users_stddev_fieldsSelector) => T
  ) => Field<"stddev", never, SelectionSet<T>>;

  readonly stddev_pop: <T extends Array<Selection>>(
    select: (t: users_stddev_pop_fieldsSelector) => T
  ) => Field<"stddev_pop", never, SelectionSet<T>>;

  readonly stddev_samp: <T extends Array<Selection>>(
    select: (t: users_stddev_samp_fieldsSelector) => T
  ) => Field<"stddev_samp", never, SelectionSet<T>>;

  readonly sum: <T extends Array<Selection>>(
    select: (t: users_sum_fieldsSelector) => T
  ) => Field<"sum", never, SelectionSet<T>>;

  readonly var_pop: <T extends Array<Selection>>(
    select: (t: users_var_pop_fieldsSelector) => T
  ) => Field<"var_pop", never, SelectionSet<T>>;

  readonly var_samp: <T extends Array<Selection>>(
    select: (t: users_var_samp_fieldsSelector) => T
  ) => Field<"var_samp", never, SelectionSet<T>>;

  readonly variance: <T extends Array<Selection>>(
    select: (t: users_variance_fieldsSelector) => T
  ) => Field<"variance", never, SelectionSet<T>>;
}

export const users_aggregate_fields: users_aggregate_fieldsSelector = {
  __typename: () => new Field("__typename"),

  avg: (select) =>
    new Field(
      "avg",
      undefined as never,
      new SelectionSet(select(users_avg_fields))
    ),

  count: (variables) => new Field("count"),

  max: (select) =>
    new Field(
      "max",
      undefined as never,
      new SelectionSet(select(users_max_fields))
    ),

  min: (select) =>
    new Field(
      "min",
      undefined as never,
      new SelectionSet(select(users_min_fields))
    ),

  stddev: (select) =>
    new Field(
      "stddev",
      undefined as never,
      new SelectionSet(select(users_stddev_fields))
    ),

  stddev_pop: (select) =>
    new Field(
      "stddev_pop",
      undefined as never,
      new SelectionSet(select(users_stddev_pop_fields))
    ),

  stddev_samp: (select) =>
    new Field(
      "stddev_samp",
      undefined as never,
      new SelectionSet(select(users_stddev_samp_fields))
    ),

  sum: (select) =>
    new Field(
      "sum",
      undefined as never,
      new SelectionSet(select(users_sum_fields))
    ),

  var_pop: (select) =>
    new Field(
      "var_pop",
      undefined as never,
      new SelectionSet(select(users_var_pop_fields))
    ),

  var_samp: (select) =>
    new Field(
      "var_samp",
      undefined as never,
      new SelectionSet(select(users_var_samp_fields))
    ),

  variance: (select) =>
    new Field(
      "variance",
      undefined as never,
      new SelectionSet(select(users_variance_fields))
    ),
};

export interface Iusers_avg_fields {
  readonly __typename: "users_avg_fields";
  readonly id: number | null;
}

interface users_avg_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const users_avg_fields: users_avg_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Iusers_max_fields {
  readonly __typename: "users_max_fields";
  readonly createdUtc: unknown | null;
  readonly email: string | null;
  readonly id: number | null;
}

interface users_max_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly email: () => Field<"email">;

  readonly id: () => Field<"id">;
}

export const users_max_fields: users_max_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  email: () => new Field("email"),
  id: () => new Field("id"),
};

export interface Iusers_min_fields {
  readonly __typename: "users_min_fields";
  readonly createdUtc: unknown | null;
  readonly email: string | null;
  readonly id: number | null;
}

interface users_min_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createdUtc: () => Field<"createdUtc">;

  readonly email: () => Field<"email">;

  readonly id: () => Field<"id">;
}

export const users_min_fields: users_min_fieldsSelector = {
  __typename: () => new Field("__typename"),

  createdUtc: () => new Field("createdUtc"),
  email: () => new Field("email"),
  id: () => new Field("id"),
};

export interface Iusers_mutation_response {
  readonly __typename: "users_mutation_response";
  readonly affected_rows: number;
  readonly returning: ReadonlyArray<Iusers>;
}

interface users_mutation_responseSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description number of affected rows by the mutation
   */

  readonly affected_rows: () => Field<"affected_rows">;

  /**
   * @description data of the affected rows by the mutation
   */

  readonly returning: <T extends Array<Selection>>(
    select: (t: usersSelector) => T
  ) => Field<"returning", never, SelectionSet<T>>;
}

export const users_mutation_response: users_mutation_responseSelector = {
  __typename: () => new Field("__typename"),

  /**
   * @description number of affected rows by the mutation
   */
  affected_rows: () => new Field("affected_rows"),

  /**
   * @description data of the affected rows by the mutation
   */

  returning: (select) =>
    new Field("returning", undefined as never, new SelectionSet(select(users))),
};

export interface Iusers_stddev_fields {
  readonly __typename: "users_stddev_fields";
  readonly id: number | null;
}

interface users_stddev_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const users_stddev_fields: users_stddev_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Iusers_stddev_pop_fields {
  readonly __typename: "users_stddev_pop_fields";
  readonly id: number | null;
}

interface users_stddev_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const users_stddev_pop_fields: users_stddev_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Iusers_stddev_samp_fields {
  readonly __typename: "users_stddev_samp_fields";
  readonly id: number | null;
}

interface users_stddev_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const users_stddev_samp_fields: users_stddev_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Iusers_sum_fields {
  readonly __typename: "users_sum_fields";
  readonly id: number | null;
}

interface users_sum_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const users_sum_fields: users_sum_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Iusers_var_pop_fields {
  readonly __typename: "users_var_pop_fields";
  readonly id: number | null;
}

interface users_var_pop_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const users_var_pop_fields: users_var_pop_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Iusers_var_samp_fields {
  readonly __typename: "users_var_samp_fields";
  readonly id: number | null;
}

interface users_var_samp_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const users_var_samp_fields: users_var_samp_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export interface Iusers_variance_fields {
  readonly __typename: "users_variance_fields";
  readonly id: number | null;
}

interface users_variance_fieldsSelector {
  readonly __typename: () => Field<"__typename">;

  readonly id: () => Field<"id">;
}

export const users_variance_fields: users_variance_fieldsSelector = {
  __typename: () => new Field("__typename"),

  id: () => new Field("id"),
};

export const query = <T extends Array<Selection>>(
  name: string,
  select: (t: typeof query_root) => T
): Operation<SelectionSet<T>> =>
  new Operation(name, "query", new SelectionSet(select(query_root)));

export const mutation = <T extends Array<Selection>>(
  name: string,
  select: (t: typeof mutation_root) => T
): Operation<SelectionSet<T>> =>
  new Operation(name, "mutation", new SelectionSet(select(mutation_root)));

export const subscription = <T extends Array<Selection>>(
  name: string,
  select: (t: typeof subscription_root) => T
): Operation<SelectionSet<T>> =>
  new Operation(
    name,
    "subscription",
    new SelectionSet(select(subscription_root))
  );

export class Hasura implements Client {
  public static readonly VERSION = VERSION;
  public static readonly SCHEMA_SHA = SCHEMA_SHA;

  constructor(public readonly executor: Executor) {}

  public readonly query = {
    /**
     * @description fetch data from the table: "bookmarks"
     */

    bookmarks: <T extends Array<Selection>>(
      variables: {
        distinct_on?: bookmarks_select_column;
        limit?: number;
        offset?: number;
        order_by?: bookmarks_order_by;
        where?: bookmarks_bool_exp;
      },
      select: (t: bookmarksSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<SelectionSet<[Field<"bookmarks", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "bookmarks",
          "query",
          new SelectionSet([query_root.bookmarks<T>(variables, select)])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "bookmarks"
     */

    bookmarks_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: bookmarks_select_column;
        limit?: number;
        offset?: number;
        order_by?: bookmarks_order_by;
        where?: bookmarks_bool_exp;
      },
      select: (t: bookmarks_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<
          SelectionSet<[Field<"bookmarks_aggregate", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "bookmarks_aggregate",
          "query",
          new SelectionSet([
            query_root.bookmarks_aggregate<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "bookmarks" using primary key columns
     */

    bookmarks_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: bookmarksSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<
          SelectionSet<[Field<"bookmarks_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "bookmarks_by_pk",
          "query",
          new SelectionSet([query_root.bookmarks_by_pk<T>(variables, select)])
        )
      ),

    /**
     * @description fetch data from the table: "playlist_items"
     */

    playlist_items: <T extends Array<Selection>>(
      variables: {
        distinct_on?: playlist_items_select_column;
        limit?: number;
        offset?: number;
        order_by?: playlist_items_order_by;
        where?: playlist_items_bool_exp;
      },
      select: (t: playlist_itemsSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<SelectionSet<[Field<"playlist_items", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "playlist_items",
          "query",
          new SelectionSet([query_root.playlist_items<T>(variables, select)])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "playlist_items"
     */

    playlist_items_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: playlist_items_select_column;
        limit?: number;
        offset?: number;
        order_by?: playlist_items_order_by;
        where?: playlist_items_bool_exp;
      },
      select: (t: playlist_items_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<
          SelectionSet<
            [Field<"playlist_items_aggregate", any, SelectionSet<T>>]
          >
        >
      >(
        new Operation(
          "playlist_items_aggregate",
          "query",
          new SelectionSet([
            query_root.playlist_items_aggregate<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "playlist_items" using primary key columns
     */

    playlist_items_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: playlist_itemsSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<
          SelectionSet<[Field<"playlist_items_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "playlist_items_by_pk",
          "query",
          new SelectionSet([
            query_root.playlist_items_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "playlists"
     */

    playlists: <T extends Array<Selection>>(
      variables: {
        distinct_on?: playlists_select_column;
        limit?: number;
        offset?: number;
        order_by?: playlists_order_by;
        where?: playlists_bool_exp;
      },
      select: (t: playlistsSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<SelectionSet<[Field<"playlists", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "playlists",
          "query",
          new SelectionSet([query_root.playlists<T>(variables, select)])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "playlists"
     */

    playlists_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: playlists_select_column;
        limit?: number;
        offset?: number;
        order_by?: playlists_order_by;
        where?: playlists_bool_exp;
      },
      select: (t: playlists_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<
          SelectionSet<[Field<"playlists_aggregate", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "playlists_aggregate",
          "query",
          new SelectionSet([
            query_root.playlists_aggregate<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "playlists" using primary key columns
     */

    playlists_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: playlistsSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<
          SelectionSet<[Field<"playlists_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "playlists_by_pk",
          "query",
          new SelectionSet([query_root.playlists_by_pk<T>(variables, select)])
        )
      ),

    /**
     * @description fetch data from the table: "tracks"
     */

    tracks: <T extends Array<Selection>>(
      variables: {
        distinct_on?: tracks_select_column;
        limit?: number;
        offset?: number;
        order_by?: tracks_order_by;
        where?: tracks_bool_exp;
      },
      select: (t: tracksSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<SelectionSet<[Field<"tracks", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "tracks",
          "query",
          new SelectionSet([query_root.tracks<T>(variables, select)])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "tracks"
     */

    tracks_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: tracks_select_column;
        limit?: number;
        offset?: number;
        order_by?: tracks_order_by;
        where?: tracks_bool_exp;
      },
      select: (t: tracks_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<
          SelectionSet<[Field<"tracks_aggregate", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "tracks_aggregate",
          "query",
          new SelectionSet([query_root.tracks_aggregate<T>(variables, select)])
        )
      ),

    /**
     * @description fetch data from the table: "tracks" using primary key columns
     */

    tracks_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: tracksSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<SelectionSet<[Field<"tracks_by_pk", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "tracks_by_pk",
          "query",
          new SelectionSet([query_root.tracks_by_pk<T>(variables, select)])
        )
      ),

    /**
     * @description fetch data from the table: "users"
     */

    users: <T extends Array<Selection>>(
      variables: {
        distinct_on?: users_select_column;
        limit?: number;
        offset?: number;
        order_by?: users_order_by;
        where?: users_bool_exp;
      },
      select: (t: usersSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<SelectionSet<[Field<"users", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "users",
          "query",
          new SelectionSet([query_root.users<T>(variables, select)])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "users"
     */

    users_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: users_select_column;
        limit?: number;
        offset?: number;
        order_by?: users_order_by;
        where?: users_bool_exp;
      },
      select: (t: users_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<
          SelectionSet<[Field<"users_aggregate", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "users_aggregate",
          "query",
          new SelectionSet([query_root.users_aggregate<T>(variables, select)])
        )
      ),

    /**
     * @description fetch data from the table: "users" using primary key columns
     */

    users_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: usersSelector) => T
    ) =>
      this.executor.execute<
        Iquery_root,
        Operation<SelectionSet<[Field<"users_by_pk", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "users_by_pk",
          "query",
          new SelectionSet([query_root.users_by_pk<T>(variables, select)])
        )
      ),
  };

  public readonly mutate = {
    /**
     * @description delete data from the table: "bookmarks"
     */

    delete_bookmarks: <T extends Array<Selection>>(
      variables: { where?: bookmarks_bool_exp },
      select: (t: bookmarks_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"delete_bookmarks", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "delete_bookmarks",
          "mutation",
          new SelectionSet([
            mutation_root.delete_bookmarks<T>(variables, select),
          ])
        )
      ),

    /**
     * @description delete single row from the table: "bookmarks"
     */

    delete_bookmarks_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: bookmarksSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"delete_bookmarks_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "delete_bookmarks_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.delete_bookmarks_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description delete data from the table: "playlist_items"
     */

    delete_playlist_items: <T extends Array<Selection>>(
      variables: { where?: playlist_items_bool_exp },
      select: (t: playlist_items_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"delete_playlist_items", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "delete_playlist_items",
          "mutation",
          new SelectionSet([
            mutation_root.delete_playlist_items<T>(variables, select),
          ])
        )
      ),

    /**
     * @description delete single row from the table: "playlist_items"
     */

    delete_playlist_items_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: playlist_itemsSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<
            [Field<"delete_playlist_items_by_pk", any, SelectionSet<T>>]
          >
        >
      >(
        new Operation(
          "delete_playlist_items_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.delete_playlist_items_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description delete data from the table: "playlists"
     */

    delete_playlists: <T extends Array<Selection>>(
      variables: { where?: playlists_bool_exp },
      select: (t: playlists_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"delete_playlists", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "delete_playlists",
          "mutation",
          new SelectionSet([
            mutation_root.delete_playlists<T>(variables, select),
          ])
        )
      ),

    /**
     * @description delete single row from the table: "playlists"
     */

    delete_playlists_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: playlistsSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"delete_playlists_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "delete_playlists_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.delete_playlists_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description delete data from the table: "tracks"
     */

    delete_tracks: <T extends Array<Selection>>(
      variables: { where?: tracks_bool_exp },
      select: (t: tracks_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<SelectionSet<[Field<"delete_tracks", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "delete_tracks",
          "mutation",
          new SelectionSet([mutation_root.delete_tracks<T>(variables, select)])
        )
      ),

    /**
     * @description delete single row from the table: "tracks"
     */

    delete_tracks_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: tracksSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"delete_tracks_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "delete_tracks_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.delete_tracks_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description delete data from the table: "users"
     */

    delete_users: <T extends Array<Selection>>(
      variables: { where?: users_bool_exp },
      select: (t: users_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<SelectionSet<[Field<"delete_users", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "delete_users",
          "mutation",
          new SelectionSet([mutation_root.delete_users<T>(variables, select)])
        )
      ),

    /**
     * @description delete single row from the table: "users"
     */

    delete_users_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: usersSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"delete_users_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "delete_users_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.delete_users_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description insert data into the table: "bookmarks"
     */

    insert_bookmarks: <T extends Array<Selection>>(
      variables: {
        objects?: bookmarks_insert_input;
        on_conflict?: bookmarks_on_conflict;
      },
      select: (t: bookmarks_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"insert_bookmarks", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "insert_bookmarks",
          "mutation",
          new SelectionSet([
            mutation_root.insert_bookmarks<T>(variables, select),
          ])
        )
      ),

    /**
     * @description insert a single row into the table: "bookmarks"
     */

    insert_bookmarks_one: <T extends Array<Selection>>(
      variables: {
        object?: bookmarks_insert_input;
        on_conflict?: bookmarks_on_conflict;
      },
      select: (t: bookmarksSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"insert_bookmarks_one", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "insert_bookmarks_one",
          "mutation",
          new SelectionSet([
            mutation_root.insert_bookmarks_one<T>(variables, select),
          ])
        )
      ),

    /**
     * @description insert data into the table: "playlist_items"
     */

    insert_playlist_items: <T extends Array<Selection>>(
      variables: {
        objects?: playlist_items_insert_input;
        on_conflict?: playlist_items_on_conflict;
      },
      select: (t: playlist_items_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"insert_playlist_items", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "insert_playlist_items",
          "mutation",
          new SelectionSet([
            mutation_root.insert_playlist_items<T>(variables, select),
          ])
        )
      ),

    /**
     * @description insert a single row into the table: "playlist_items"
     */

    insert_playlist_items_one: <T extends Array<Selection>>(
      variables: {
        object?: playlist_items_insert_input;
        on_conflict?: playlist_items_on_conflict;
      },
      select: (t: playlist_itemsSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<
            [Field<"insert_playlist_items_one", any, SelectionSet<T>>]
          >
        >
      >(
        new Operation(
          "insert_playlist_items_one",
          "mutation",
          new SelectionSet([
            mutation_root.insert_playlist_items_one<T>(variables, select),
          ])
        )
      ),

    /**
     * @description insert data into the table: "playlists"
     */

    insert_playlists: <T extends Array<Selection>>(
      variables: {
        objects?: playlists_insert_input;
        on_conflict?: playlists_on_conflict;
      },
      select: (t: playlists_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"insert_playlists", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "insert_playlists",
          "mutation",
          new SelectionSet([
            mutation_root.insert_playlists<T>(variables, select),
          ])
        )
      ),

    /**
     * @description insert a single row into the table: "playlists"
     */

    insert_playlists_one: <T extends Array<Selection>>(
      variables: {
        object?: playlists_insert_input;
        on_conflict?: playlists_on_conflict;
      },
      select: (t: playlistsSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"insert_playlists_one", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "insert_playlists_one",
          "mutation",
          new SelectionSet([
            mutation_root.insert_playlists_one<T>(variables, select),
          ])
        )
      ),

    /**
     * @description insert data into the table: "tracks"
     */

    insert_tracks: <T extends Array<Selection>>(
      variables: {
        objects?: tracks_insert_input;
        on_conflict?: tracks_on_conflict;
      },
      select: (t: tracks_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<SelectionSet<[Field<"insert_tracks", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "insert_tracks",
          "mutation",
          new SelectionSet([mutation_root.insert_tracks<T>(variables, select)])
        )
      ),

    /**
     * @description insert a single row into the table: "tracks"
     */

    insert_tracks_one: <T extends Array<Selection>>(
      variables: {
        object?: tracks_insert_input;
        on_conflict?: tracks_on_conflict;
      },
      select: (t: tracksSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"insert_tracks_one", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "insert_tracks_one",
          "mutation",
          new SelectionSet([
            mutation_root.insert_tracks_one<T>(variables, select),
          ])
        )
      ),

    /**
     * @description insert data into the table: "users"
     */

    insert_users: <T extends Array<Selection>>(
      variables: {
        objects?: users_insert_input;
        on_conflict?: users_on_conflict;
      },
      select: (t: users_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<SelectionSet<[Field<"insert_users", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "insert_users",
          "mutation",
          new SelectionSet([mutation_root.insert_users<T>(variables, select)])
        )
      ),

    /**
     * @description insert a single row into the table: "users"
     */

    insert_users_one: <T extends Array<Selection>>(
      variables: {
        object?: users_insert_input;
        on_conflict?: users_on_conflict;
      },
      select: (t: usersSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"insert_users_one", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "insert_users_one",
          "mutation",
          new SelectionSet([
            mutation_root.insert_users_one<T>(variables, select),
          ])
        )
      ),

    /**
     * @description update data of the table: "bookmarks"
     */

    update_bookmarks: <T extends Array<Selection>>(
      variables: {
        _inc?: bookmarks_inc_input;
        _set?: bookmarks_set_input;
        where?: bookmarks_bool_exp;
      },
      select: (t: bookmarks_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"update_bookmarks", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "update_bookmarks",
          "mutation",
          new SelectionSet([
            mutation_root.update_bookmarks<T>(variables, select),
          ])
        )
      ),

    /**
     * @description update single row of the table: "bookmarks"
     */

    update_bookmarks_by_pk: <T extends Array<Selection>>(
      variables: {
        _inc?: bookmarks_inc_input;
        _set?: bookmarks_set_input;
        pk_columns?: bookmarks_pk_columns_input;
      },
      select: (t: bookmarksSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"update_bookmarks_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "update_bookmarks_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.update_bookmarks_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description update data of the table: "playlist_items"
     */

    update_playlist_items: <T extends Array<Selection>>(
      variables: {
        _inc?: playlist_items_inc_input;
        _set?: playlist_items_set_input;
        where?: playlist_items_bool_exp;
      },
      select: (t: playlist_items_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"update_playlist_items", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "update_playlist_items",
          "mutation",
          new SelectionSet([
            mutation_root.update_playlist_items<T>(variables, select),
          ])
        )
      ),

    /**
     * @description update single row of the table: "playlist_items"
     */

    update_playlist_items_by_pk: <T extends Array<Selection>>(
      variables: {
        _inc?: playlist_items_inc_input;
        _set?: playlist_items_set_input;
        pk_columns?: playlist_items_pk_columns_input;
      },
      select: (t: playlist_itemsSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<
            [Field<"update_playlist_items_by_pk", any, SelectionSet<T>>]
          >
        >
      >(
        new Operation(
          "update_playlist_items_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.update_playlist_items_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description update data of the table: "playlists"
     */

    update_playlists: <T extends Array<Selection>>(
      variables: {
        _inc?: playlists_inc_input;
        _set?: playlists_set_input;
        where?: playlists_bool_exp;
      },
      select: (t: playlists_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"update_playlists", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "update_playlists",
          "mutation",
          new SelectionSet([
            mutation_root.update_playlists<T>(variables, select),
          ])
        )
      ),

    /**
     * @description update single row of the table: "playlists"
     */

    update_playlists_by_pk: <T extends Array<Selection>>(
      variables: {
        _inc?: playlists_inc_input;
        _set?: playlists_set_input;
        pk_columns?: playlists_pk_columns_input;
      },
      select: (t: playlistsSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"update_playlists_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "update_playlists_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.update_playlists_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description update data of the table: "tracks"
     */

    update_tracks: <T extends Array<Selection>>(
      variables: {
        _inc?: tracks_inc_input;
        _set?: tracks_set_input;
        where?: tracks_bool_exp;
      },
      select: (t: tracks_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<SelectionSet<[Field<"update_tracks", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "update_tracks",
          "mutation",
          new SelectionSet([mutation_root.update_tracks<T>(variables, select)])
        )
      ),

    /**
     * @description update single row of the table: "tracks"
     */

    update_tracks_by_pk: <T extends Array<Selection>>(
      variables: {
        _inc?: tracks_inc_input;
        _set?: tracks_set_input;
        pk_columns?: tracks_pk_columns_input;
      },
      select: (t: tracksSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"update_tracks_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "update_tracks_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.update_tracks_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description update data of the table: "users"
     */

    update_users: <T extends Array<Selection>>(
      variables: {
        _inc?: users_inc_input;
        _set?: users_set_input;
        where?: users_bool_exp;
      },
      select: (t: users_mutation_responseSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<SelectionSet<[Field<"update_users", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "update_users",
          "mutation",
          new SelectionSet([mutation_root.update_users<T>(variables, select)])
        )
      ),

    /**
     * @description update single row of the table: "users"
     */

    update_users_by_pk: <T extends Array<Selection>>(
      variables: {
        _inc?: users_inc_input;
        _set?: users_set_input;
        pk_columns?: users_pk_columns_input;
      },
      select: (t: usersSelector) => T
    ) =>
      this.executor.execute<
        Imutation_root,
        Operation<
          SelectionSet<[Field<"update_users_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "update_users_by_pk",
          "mutation",
          new SelectionSet([
            mutation_root.update_users_by_pk<T>(variables, select),
          ])
        )
      ),
  };

  public readonly subscribe = {
    /**
     * @description fetch data from the table: "bookmarks"
     */

    bookmarks: <T extends Array<Selection>>(
      variables: {
        distinct_on?: bookmarks_select_column;
        limit?: number;
        offset?: number;
        order_by?: bookmarks_order_by;
        where?: bookmarks_bool_exp;
      },
      select: (t: bookmarksSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<SelectionSet<[Field<"bookmarks", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "bookmarks",
          "subscription",
          new SelectionSet([subscription_root.bookmarks<T>(variables, select)])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "bookmarks"
     */

    bookmarks_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: bookmarks_select_column;
        limit?: number;
        offset?: number;
        order_by?: bookmarks_order_by;
        where?: bookmarks_bool_exp;
      },
      select: (t: bookmarks_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<
          SelectionSet<[Field<"bookmarks_aggregate", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "bookmarks_aggregate",
          "subscription",
          new SelectionSet([
            subscription_root.bookmarks_aggregate<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "bookmarks" using primary key columns
     */

    bookmarks_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: bookmarksSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<
          SelectionSet<[Field<"bookmarks_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "bookmarks_by_pk",
          "subscription",
          new SelectionSet([
            subscription_root.bookmarks_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "playlist_items"
     */

    playlist_items: <T extends Array<Selection>>(
      variables: {
        distinct_on?: playlist_items_select_column;
        limit?: number;
        offset?: number;
        order_by?: playlist_items_order_by;
        where?: playlist_items_bool_exp;
      },
      select: (t: playlist_itemsSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<SelectionSet<[Field<"playlist_items", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "playlist_items",
          "subscription",
          new SelectionSet([
            subscription_root.playlist_items<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "playlist_items"
     */

    playlist_items_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: playlist_items_select_column;
        limit?: number;
        offset?: number;
        order_by?: playlist_items_order_by;
        where?: playlist_items_bool_exp;
      },
      select: (t: playlist_items_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<
          SelectionSet<
            [Field<"playlist_items_aggregate", any, SelectionSet<T>>]
          >
        >
      >(
        new Operation(
          "playlist_items_aggregate",
          "subscription",
          new SelectionSet([
            subscription_root.playlist_items_aggregate<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "playlist_items" using primary key columns
     */

    playlist_items_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: playlist_itemsSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<
          SelectionSet<[Field<"playlist_items_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "playlist_items_by_pk",
          "subscription",
          new SelectionSet([
            subscription_root.playlist_items_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "playlists"
     */

    playlists: <T extends Array<Selection>>(
      variables: {
        distinct_on?: playlists_select_column;
        limit?: number;
        offset?: number;
        order_by?: playlists_order_by;
        where?: playlists_bool_exp;
      },
      select: (t: playlistsSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<SelectionSet<[Field<"playlists", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "playlists",
          "subscription",
          new SelectionSet([subscription_root.playlists<T>(variables, select)])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "playlists"
     */

    playlists_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: playlists_select_column;
        limit?: number;
        offset?: number;
        order_by?: playlists_order_by;
        where?: playlists_bool_exp;
      },
      select: (t: playlists_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<
          SelectionSet<[Field<"playlists_aggregate", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "playlists_aggregate",
          "subscription",
          new SelectionSet([
            subscription_root.playlists_aggregate<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "playlists" using primary key columns
     */

    playlists_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: playlistsSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<
          SelectionSet<[Field<"playlists_by_pk", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "playlists_by_pk",
          "subscription",
          new SelectionSet([
            subscription_root.playlists_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "tracks"
     */

    tracks: <T extends Array<Selection>>(
      variables: {
        distinct_on?: tracks_select_column;
        limit?: number;
        offset?: number;
        order_by?: tracks_order_by;
        where?: tracks_bool_exp;
      },
      select: (t: tracksSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<SelectionSet<[Field<"tracks", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "tracks",
          "subscription",
          new SelectionSet([subscription_root.tracks<T>(variables, select)])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "tracks"
     */

    tracks_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: tracks_select_column;
        limit?: number;
        offset?: number;
        order_by?: tracks_order_by;
        where?: tracks_bool_exp;
      },
      select: (t: tracks_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<
          SelectionSet<[Field<"tracks_aggregate", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "tracks_aggregate",
          "subscription",
          new SelectionSet([
            subscription_root.tracks_aggregate<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "tracks" using primary key columns
     */

    tracks_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: tracksSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<SelectionSet<[Field<"tracks_by_pk", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "tracks_by_pk",
          "subscription",
          new SelectionSet([
            subscription_root.tracks_by_pk<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "users"
     */

    users: <T extends Array<Selection>>(
      variables: {
        distinct_on?: users_select_column;
        limit?: number;
        offset?: number;
        order_by?: users_order_by;
        where?: users_bool_exp;
      },
      select: (t: usersSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<SelectionSet<[Field<"users", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "users",
          "subscription",
          new SelectionSet([subscription_root.users<T>(variables, select)])
        )
      ),

    /**
     * @description fetch aggregated fields from the table: "users"
     */

    users_aggregate: <T extends Array<Selection>>(
      variables: {
        distinct_on?: users_select_column;
        limit?: number;
        offset?: number;
        order_by?: users_order_by;
        where?: users_bool_exp;
      },
      select: (t: users_aggregateSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<
          SelectionSet<[Field<"users_aggregate", any, SelectionSet<T>>]>
        >
      >(
        new Operation(
          "users_aggregate",
          "subscription",
          new SelectionSet([
            subscription_root.users_aggregate<T>(variables, select),
          ])
        )
      ),

    /**
     * @description fetch data from the table: "users" using primary key columns
     */

    users_by_pk: <T extends Array<Selection>>(
      variables: { id?: number },
      select: (t: usersSelector) => T
    ) =>
      this.executor.execute<
        Isubscription_root,
        Operation<SelectionSet<[Field<"users_by_pk", any, SelectionSet<T>>]>>
      >(
        new Operation(
          "users_by_pk",
          "subscription",
          new SelectionSet([
            subscription_root.users_by_pk<T>(variables, select),
          ])
        )
      ),
  };
}
