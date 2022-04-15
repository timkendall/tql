import { buildASTSchema, Kind, OperationTypeNode } from "graphql";

import {
  TypeConditionError,
  NamedType,
  Field,
  InlineFragment,
  Argument,
  Variable,
  Selection,
  SelectionSet,
  SelectionBuilder,
  namedType,
  field,
  inlineFragment,
  argument,
  selectionSet,
} from "../src";

export type { Result, Variables } from "../src";
export { $ } from "../src";

export const SCHEMA = buildASTSchema({
  kind: Kind.DOCUMENT,
  definitions: [
    {
      kind: Kind.SCHEMA_DEFINITION,
      directives: [],
      operationTypes: [
        {
          kind: Kind.OPERATION_TYPE_DEFINITION,
          operation: OperationTypeNode.QUERY,
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Query",
            },
          },
        },
        {
          kind: Kind.OPERATION_TYPE_DEFINITION,
          operation: OperationTypeNode.MUTATION,
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Mutation",
            },
          },
        },
      ],
    },
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value:
          "The query type, represents all of the entry points into our object graph",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "Query",
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "hero",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "episode",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "Episode",
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Character",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "reviews",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "episode",
              },
              type: {
                kind: Kind.NON_NULL_TYPE,
                type: {
                  kind: Kind.NAMED_TYPE,
                  name: {
                    kind: Kind.NAME,
                    value: "Episode",
                  },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.LIST_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Review",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "search",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "text",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "String",
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.LIST_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "SearchResult",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "character",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "id",
              },
              type: {
                kind: Kind.NON_NULL_TYPE,
                type: {
                  kind: Kind.NAMED_TYPE,
                  name: {
                    kind: Kind.NAME,
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Character",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "droid",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "id",
              },
              type: {
                kind: Kind.NON_NULL_TYPE,
                type: {
                  kind: Kind.NAMED_TYPE,
                  name: {
                    kind: Kind.NAME,
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Droid",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "human",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "id",
              },
              type: {
                kind: Kind.NON_NULL_TYPE,
                type: {
                  kind: Kind.NAMED_TYPE,
                  name: {
                    kind: Kind.NAME,
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Human",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "starship",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "id",
              },
              type: {
                kind: Kind.NON_NULL_TYPE,
                type: {
                  kind: Kind.NAMED_TYPE,
                  name: {
                    kind: Kind.NAME,
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Starship",
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value:
          "The mutation type, represents all updates we can make to our data",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "Mutation",
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "createReview",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "episode",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "Episode",
                },
              },
              directives: [],
            },
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "review",
              },
              type: {
                kind: Kind.NON_NULL_TYPE,
                type: {
                  kind: Kind.NAMED_TYPE,
                  name: {
                    kind: Kind.NAME,
                    value: "ReviewInput",
                  },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Review",
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "The episodes in the Star Wars trilogy",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "Episode",
      },
      directives: [],
      values: [
        {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Star Wars Episode IV: A New Hope, released in 1977.",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "NEWHOPE",
          },
          directives: [],
        },
        {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description: {
            kind: Kind.STRING,
            value:
              "Star Wars Episode V: The Empire Strikes Back, released in 1980.",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "EMPIRE",
          },
          directives: [],
        },
        {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description: {
            kind: Kind.STRING,
            value:
              "Star Wars Episode VI: Return of the Jedi, released in 1983.",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "JEDI",
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "A character from the Star Wars universe",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "Character",
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The ID of the character",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "id",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "ID",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The name of the character",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "name",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "String",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value:
              "The friends of the character, or an empty list if they have none",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "friends",
          },
          arguments: [],
          type: {
            kind: Kind.LIST_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Character",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value:
              "The friends of the character exposed as a connection with edges",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "friendsConnection",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "first",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "Int",
                },
              },
              directives: [],
            },
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "after",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "ID",
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "FriendsConnection",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The movies this character appears in",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "appearsIn",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.LIST_TYPE,
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "Episode",
                },
              },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "Units of height",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "LengthUnit",
      },
      directives: [],
      values: [
        {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The standard unit around the world",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "METER",
          },
          directives: [],
        },
        {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Primarily used in the United States",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "FOOT",
          },
          directives: [],
        },
        {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Ancient unit used during the Middle Ages",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "CUBIT",
          },
          directives: [
            {
              kind: Kind.DIRECTIVE,
              name: {
                kind: Kind.NAME,
                value: "deprecated",
              },
              arguments: [
                {
                  kind: Kind.ARGUMENT,
                  name: {
                    kind: Kind.NAME,
                    value: "reason",
                  },
                  value: {
                    kind: Kind.STRING,
                    value: "Test deprecated enum case",
                    block: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "A humanoid creature from the Star Wars universe",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "Human",
      },
      interfaces: [
        {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: "Character",
          },
        },
      ],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The ID of the human",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "id",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "ID",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "What this human calls themselves",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "name",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "String",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The home planet of the human, or null if unknown",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "homePlanet",
          },
          arguments: [],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "String",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Height in the preferred unit, default is meters",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "height",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "unit",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "LengthUnit",
                },
              },
              defaultValue: {
                kind: Kind.ENUM,
                value: "METER",
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Float",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Mass in kilograms, or null if unknown",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "mass",
          },
          arguments: [],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Float",
            },
          },
          directives: [
            {
              kind: Kind.DIRECTIVE,
              name: {
                kind: Kind.NAME,
                value: "deprecated",
              },
              arguments: [
                {
                  kind: Kind.ARGUMENT,
                  name: {
                    kind: Kind.NAME,
                    value: "reason",
                  },
                  value: {
                    kind: Kind.STRING,
                    value: "Weight is a sensitive subject!",
                    block: false,
                  },
                },
              ],
            },
          ],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "This human's friends, or an empty list if they have none",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "friends",
          },
          arguments: [],
          type: {
            kind: Kind.LIST_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Character",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value:
              "The friends of the human exposed as a connection with edges",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "friendsConnection",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "first",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "Int",
                },
              },
              directives: [],
            },
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "after",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "ID",
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "FriendsConnection",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The movies this human appears in",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "appearsIn",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.LIST_TYPE,
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "Episode",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value:
              "A list of starships this person has piloted, or an empty list if none",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "starships",
          },
          arguments: [],
          type: {
            kind: Kind.LIST_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Starship",
              },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "An autonomous mechanical character in the Star Wars universe",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "Droid",
      },
      interfaces: [
        {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: "Character",
          },
        },
      ],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The ID of the droid",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "id",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "ID",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "What others call this droid",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "name",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "String",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "This droid's friends, or an empty list if they have none",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "friends",
          },
          arguments: [],
          type: {
            kind: Kind.LIST_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Character",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value:
              "The friends of the droid exposed as a connection with edges",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "friendsConnection",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "first",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "Int",
                },
              },
              directives: [],
            },
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "after",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "ID",
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "FriendsConnection",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The movies this droid appears in",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "appearsIn",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.LIST_TYPE,
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "Episode",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "This droid's primary function",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "primaryFunction",
          },
          arguments: [],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "String",
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "A connection object for a character's friends",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "FriendsConnection",
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The total number of friends",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "totalCount",
          },
          arguments: [],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Int",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The edges for each of the character's friends.",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "edges",
          },
          arguments: [],
          type: {
            kind: Kind.LIST_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "FriendsEdge",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value:
              "A list of the friends, as a convenience when edges are not needed.",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "friends",
          },
          arguments: [],
          type: {
            kind: Kind.LIST_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Character",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Information for paginating this connection",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "pageInfo",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "PageInfo",
              },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "An edge object for a character's friends",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "FriendsEdge",
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "A cursor used for pagination",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "cursor",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "ID",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The character represented by this friendship edge",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "node",
          },
          arguments: [],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Character",
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "Information for paginating this connection",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "PageInfo",
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "startCursor",
          },
          arguments: [],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "ID",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "endCursor",
          },
          arguments: [],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "ID",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "hasNextPage",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Boolean",
              },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "Represents a review for a movie",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "Review",
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The number of stars this review gave, 1-5",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "stars",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Int",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Comment about the movie",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "commentary",
          },
          arguments: [],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "String",
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "The input object sent when someone is creating a new review",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "ReviewInput",
      },
      directives: [],
      fields: [
        {
          kind: Kind.INPUT_VALUE_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "0-5 stars",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "stars",
          },
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Int",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.INPUT_VALUE_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Comment about the movie, optional",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "commentary",
          },
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "String",
            },
          },
          directives: [],
        },
        {
          kind: Kind.INPUT_VALUE_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Favorite color, optional",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "favorite_color",
          },
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "ColorInput",
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description: {
        kind: Kind.STRING,
        value: "The input object sent when passing in a color",
        block: true,
      },
      name: {
        kind: Kind.NAME,
        value: "ColorInput",
      },
      directives: [],
      fields: [
        {
          kind: Kind.INPUT_VALUE_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "red",
          },
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Int",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.INPUT_VALUE_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "green",
          },
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Int",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.INPUT_VALUE_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "blue",
          },
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "Int",
              },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      name: {
        kind: Kind.NAME,
        value: "Starship",
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The ID of the starship",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "id",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "ID",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "The name of the starship",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "name",
          },
          arguments: [],
          type: {
            kind: Kind.NON_NULL_TYPE,
            type: {
              kind: Kind.NAMED_TYPE,
              name: {
                kind: Kind.NAME,
                value: "String",
              },
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          description: {
            kind: Kind.STRING,
            value: "Length of the starship, along the longest axis",
            block: true,
          },
          name: {
            kind: Kind.NAME,
            value: "length",
          },
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: {
                kind: Kind.NAME,
                value: "unit",
              },
              type: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: "LengthUnit",
                },
              },
              defaultValue: {
                kind: Kind.ENUM,
                value: "METER",
              },
              directives: [],
            },
          ],
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Float",
            },
          },
          directives: [],
        },
        {
          kind: Kind.FIELD_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "coordinates",
          },
          arguments: [],
          type: {
            kind: Kind.LIST_TYPE,
            type: {
              kind: Kind.NON_NULL_TYPE,
              type: {
                kind: Kind.LIST_TYPE,
                type: {
                  kind: Kind.NON_NULL_TYPE,
                  type: {
                    kind: Kind.NAMED_TYPE,
                    name: {
                      kind: Kind.NAME,
                      value: "Float",
                    },
                  },
                },
              },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: Kind.UNION_TYPE_DEFINITION,
      name: {
        kind: Kind.NAME,
        value: "SearchResult",
      },
      directives: [],
      types: [
        {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: "Human",
          },
        },
        {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: "Droid",
          },
        },
        {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: "Starship",
          },
        },
      ],
    },
  ],
});

export const ENUMS = Object.freeze({
  NEWHOPE: true,
  EMPIRE: true,
  JEDI: true,
  METER: true,
  FOOT: true,
  CUBIT: true,
  SCALAR: true,
  OBJECT: true,
  INTERFACE: true,
  UNION: true,
  ENUM: true,
  INPUT_OBJECT: true,
  LIST: true,
  NON_NULL: true,
  QUERY: true,
  MUTATION: true,
  SUBSCRIPTION: true,
  FIELD: true,
  FRAGMENT_DEFINITION: true,
  FRAGMENT_SPREAD: true,
  INLINE_FRAGMENT: true,
  VARIABLE_DEFINITION: true,
  SCHEMA: true,
  FIELD_DEFINITION: true,
  ARGUMENT_DEFINITION: true,
  ENUM_VALUE: true,
  INPUT_FIELD_DEFINITION: true,
} as const);

export interface ISchema {
  Query: IQuery;
  String: string;
  ID: string;
  Mutation: IMutation;
  Episode: Episode;
  Character: ICharacter;
  Int: number;
  LengthUnit: LengthUnit;
  Human: IHuman;
  Float: number;
  Droid: IDroid;
  FriendsConnection: IFriendsConnection;
  FriendsEdge: IFriendsEdge;
  PageInfo: IPageInfo;
  Boolean: boolean;
  Review: IReview;
  ReviewInput: IReviewInput;
  ColorInput: IColorInput;
  Starship: IStarship;
  SearchResult: ISearchResult;
}

export interface IQuery {
  readonly __typename: "Query";
  hero(variables: { episode: Episode | undefined }): ICharacter | null;
  reviews(variables: { episode: Episode }): ReadonlyArray<IReview> | null;
  search(variables: {
    text: string | undefined;
  }): ReadonlyArray<ISearchResult> | null;
  character(variables: { id: string }): ICharacter | null;
  droid(variables: { id: string }): IDroid | null;
  human(variables: { id: string }): IHuman | null;
  starship(variables: { id: string }): IStarship | null;
}

export interface IMutation {
  readonly __typename: "Mutation";
  createReview(variables: {
    episode: Episode | undefined;
    review: IReviewInput;
  }): IReview | null;
}

export enum Episode {
  NEWHOPE = "NEWHOPE",
  EMPIRE = "EMPIRE",
  JEDI = "JEDI",
}

export interface ICharacter {
  readonly __typename: "Human" | "Droid";
  readonly id: string;
  readonly name: string;
  readonly friends: ReadonlyArray<ICharacter> | null;
  friendsConnection(variables: {
    first: number | undefined;
    after: string | undefined;
  }): IFriendsConnection;
  readonly appearsIn: ReadonlyArray<Episode>;
}

export enum LengthUnit {
  METER = "METER",
  FOOT = "FOOT",
  CUBIT = "CUBIT",
}

export interface IHuman extends ICharacter {
  readonly __typename: "Human";
  readonly homePlanet: string | null;
  height(variables: { unit: LengthUnit | undefined }): number | null;
  readonly mass: number | null;
  readonly starships: ReadonlyArray<IStarship> | null;
}

export interface IDroid extends ICharacter {
  readonly __typename: "Droid";
  readonly primaryFunction: string | null;
}

export interface IFriendsConnection {
  readonly __typename: "FriendsConnection";
  readonly totalCount: number | null;
  readonly edges: ReadonlyArray<IFriendsEdge> | null;
  readonly friends: ReadonlyArray<ICharacter> | null;
  readonly pageInfo: IPageInfo;
}

export interface IFriendsEdge {
  readonly __typename: "FriendsEdge";
  readonly cursor: string;
  readonly node: ICharacter | null;
}

export interface IPageInfo {
  readonly __typename: "PageInfo";
  readonly startCursor: string | null;
  readonly endCursor: string | null;
  readonly hasNextPage: boolean;
}

export interface IReview {
  readonly __typename: "Review";
  readonly stars: number;
  readonly commentary: string | null;
}

export interface IReviewInput {
  stars: number;
  commentary?: string;
  favorite_color?: IColorInput;
}

export interface IColorInput {
  red: number;
  green: number;
  blue: number;
}

export interface IStarship {
  readonly __typename: "Starship";
  readonly id: string;
  readonly name: string;
  length(variables: { unit: LengthUnit | undefined }): number | null;
  readonly coordinates: ReadonlyArray<number> | null;
}

export type ISearchResult = IHuman | IDroid | IStarship;

interface IQuerySelector {
  readonly __typename: () => Field<"__typename">;

  readonly hero: <
    V extends { episode?: Variable<string> | Episode },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: ICharacterSelector) => T
  ) => Field<"hero", [Argument<"episode", V["episode"]>], SelectionSet<T>>;

  readonly reviews: <
    V extends { episode: Variable<string> | Episode },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: IReviewSelector) => T
  ) => Field<"reviews", [Argument<"episode", V["episode"]>], SelectionSet<T>>;

  readonly search: <
    V extends { text?: Variable<string> | string },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: ISearchResultSelector) => T
  ) => Field<"search", [Argument<"text", V["text"]>], SelectionSet<T>>;

  readonly character: <
    V extends { id: Variable<string> | string },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: ICharacterSelector) => T
  ) => Field<"character", [Argument<"id", V["id"]>], SelectionSet<T>>;

  readonly droid: <
    V extends { id: Variable<string> | string },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: IDroidSelector) => T
  ) => Field<"droid", [Argument<"id", V["id"]>], SelectionSet<T>>;

  readonly human: <
    V extends { id: Variable<string> | string },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: IHumanSelector) => T
  ) => Field<"human", [Argument<"id", V["id"]>], SelectionSet<T>>;

  readonly starship: <
    V extends { id: Variable<string> | string },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: IStarshipSelector) => T
  ) => Field<"starship", [Argument<"id", V["id"]>], SelectionSet<T>>;
}

const QuerySelector: IQuerySelector = {
  __typename: () => field("__typename"),

  hero: (variables, select) =>
    field(
      "hero",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(CharacterSelector))
    ),

  reviews: (variables, select) =>
    field(
      "reviews",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(ReviewSelector))
    ),

  search: (variables, select) =>
    field(
      "search",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(SearchResultSelector))
    ),

  character: (variables, select) =>
    field(
      "character",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(CharacterSelector))
    ),

  droid: (variables, select) =>
    field(
      "droid",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(DroidSelector))
    ),

  human: (variables, select) =>
    field(
      "human",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(HumanSelector))
    ),

  starship: (variables, select) =>
    field(
      "starship",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(StarshipSelector))
    ),
};

export const query = <T extends ReadonlyArray<Selection>>(
  select: (t: IQuerySelector) => T
) =>
  new SelectionBuilder<ISchema, "Query", T>(
    SCHEMA as any,
    "Query",
    select(QuerySelector)
  );

interface IMutationSelector {
  readonly __typename: () => Field<"__typename">;

  readonly createReview: <
    V extends {
      episode?: Variable<string> | Episode;
      review: Variable<string> | IReviewInput;
    },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: IReviewSelector) => T
  ) => Field<
    "createReview",
    [Argument<"episode", V["episode"]>, Argument<"review", V["review"]>],
    SelectionSet<T>
  >;
}

const MutationSelector: IMutationSelector = {
  __typename: () => field("__typename"),

  createReview: (variables, select) =>
    field(
      "createReview",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(ReviewSelector))
    ),
};

export const mutation = <T extends ReadonlyArray<Selection>>(
  select: (t: IMutationSelector) => T
) =>
  new SelectionBuilder<ISchema, "Mutation", T>(
    SCHEMA as any,
    "Mutation",
    select(MutationSelector)
  );

interface ICharacterSelector {
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

  readonly friends: <T extends ReadonlyArray<Selection>>(
    select: (t: ICharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  /**
   * @description The friends of the character exposed as a connection with edges
   */

  readonly friendsConnection: <
    V extends {
      first?: Variable<string> | number;
      after?: Variable<string> | string;
    },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: IFriendsConnectionSelector) => T
  ) => Field<
    "friendsConnection",
    [Argument<"first", V["first"]>, Argument<"after", V["after"]>],
    SelectionSet<T>
  >;

  /**
   * @description The movies this character appears in
   */

  readonly appearsIn: () => Field<"appearsIn">;

  readonly on: <
    T extends ReadonlyArray<Selection>,
    F extends "Human" | "Droid"
  >(
    type: F,
    select: (
      t: F extends "Human"
        ? IHumanSelector
        : F extends "Droid"
        ? IDroidSelector
        : never
    ) => T
  ) => InlineFragment<NamedType<F>, SelectionSet<T>>;
}

const CharacterSelector: ICharacterSelector = {
  __typename: () => field("__typename"),

  /**
   * @description The ID of the character
   */
  id: () => field("id"),

  /**
   * @description The name of the character
   */
  name: () => field("name"),

  /**
   * @description The friends of the character, or an empty list if they have none
   */

  friends: (select) =>
    field(
      "friends",
      undefined as never,
      selectionSet(select(CharacterSelector))
    ),

  /**
   * @description The friends of the character exposed as a connection with edges
   */

  friendsConnection: (variables, select) =>
    field(
      "friendsConnection",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(FriendsConnectionSelector))
    ),

  /**
   * @description The movies this character appears in
   */
  appearsIn: () => field("appearsIn"),

  on: (type, select) => {
    switch (type) {
      case "Human": {
        return inlineFragment(
          namedType("Human"),
          selectionSet(select(HumanSelector as Parameters<typeof select>[0]))
        );
      }

      case "Droid": {
        return inlineFragment(
          namedType("Droid"),
          selectionSet(select(DroidSelector as Parameters<typeof select>[0]))
        );
      }

      default:
        throw new TypeConditionError({
          selectedType: type,
          abstractType: "Character",
        });
    }
  },
};

export const character = <T extends ReadonlyArray<Selection>>(
  select: (t: ICharacterSelector) => T
) =>
  new SelectionBuilder<ISchema, "Character", T>(
    SCHEMA as any,
    "Character",
    select(CharacterSelector)
  );

interface IHumanSelector {
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

  readonly height: <V extends { unit?: Variable<string> | LengthUnit }>(
    variables: V
  ) => Field<"height", [Argument<"unit", V["unit"]>]>;

  /**
   * @description Mass in kilograms, or null if unknown
   * @deprecated Weight is a sensitive subject!
   */

  readonly mass: () => Field<"mass">;

  /**
   * @description This human's friends, or an empty list if they have none
   */

  readonly friends: <T extends ReadonlyArray<Selection>>(
    select: (t: ICharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  /**
   * @description The friends of the human exposed as a connection with edges
   */

  readonly friendsConnection: <
    V extends {
      first?: Variable<string> | number;
      after?: Variable<string> | string;
    },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: IFriendsConnectionSelector) => T
  ) => Field<
    "friendsConnection",
    [Argument<"first", V["first"]>, Argument<"after", V["after"]>],
    SelectionSet<T>
  >;

  /**
   * @description The movies this human appears in
   */

  readonly appearsIn: () => Field<"appearsIn">;

  /**
   * @description A list of starships this person has piloted, or an empty list if none
   */

  readonly starships: <T extends ReadonlyArray<Selection>>(
    select: (t: IStarshipSelector) => T
  ) => Field<"starships", never, SelectionSet<T>>;
}

const HumanSelector: IHumanSelector = {
  __typename: () => field("__typename"),

  /**
   * @description The ID of the human
   */
  id: () => field("id"),

  /**
   * @description What this human calls themselves
   */
  name: () => field("name"),

  /**
   * @description The home planet of the human, or null if unknown
   */
  homePlanet: () => field("homePlanet"),

  /**
   * @description Height in the preferred unit, default is meters
   */
  height: (variables) =>
    field(
      "height",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any
    ),

  /**
   * @description Mass in kilograms, or null if unknown
   * @deprecated Weight is a sensitive subject!
   */
  mass: () => field("mass"),

  /**
   * @description This human's friends, or an empty list if they have none
   */

  friends: (select) =>
    field(
      "friends",
      undefined as never,
      selectionSet(select(CharacterSelector))
    ),

  /**
   * @description The friends of the human exposed as a connection with edges
   */

  friendsConnection: (variables, select) =>
    field(
      "friendsConnection",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(FriendsConnectionSelector))
    ),

  /**
   * @description The movies this human appears in
   */
  appearsIn: () => field("appearsIn"),

  /**
   * @description A list of starships this person has piloted, or an empty list if none
   */

  starships: (select) =>
    field(
      "starships",
      undefined as never,
      selectionSet(select(StarshipSelector))
    ),
};

export const human = <T extends ReadonlyArray<Selection>>(
  select: (t: IHumanSelector) => T
) =>
  new SelectionBuilder<ISchema, "Human", T>(
    SCHEMA as any,
    "Human",
    select(HumanSelector)
  );

interface IDroidSelector {
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

  readonly friends: <T extends ReadonlyArray<Selection>>(
    select: (t: ICharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  /**
   * @description The friends of the droid exposed as a connection with edges
   */

  readonly friendsConnection: <
    V extends {
      first?: Variable<string> | number;
      after?: Variable<string> | string;
    },
    T extends ReadonlyArray<Selection>
  >(
    variables: V,
    select: (t: IFriendsConnectionSelector) => T
  ) => Field<
    "friendsConnection",
    [Argument<"first", V["first"]>, Argument<"after", V["after"]>],
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

const DroidSelector: IDroidSelector = {
  __typename: () => field("__typename"),

  /**
   * @description The ID of the droid
   */
  id: () => field("id"),

  /**
   * @description What others call this droid
   */
  name: () => field("name"),

  /**
   * @description This droid's friends, or an empty list if they have none
   */

  friends: (select) =>
    field(
      "friends",
      undefined as never,
      selectionSet(select(CharacterSelector))
    ),

  /**
   * @description The friends of the droid exposed as a connection with edges
   */

  friendsConnection: (variables, select) =>
    field(
      "friendsConnection",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any,
      selectionSet(select(FriendsConnectionSelector))
    ),

  /**
   * @description The movies this droid appears in
   */
  appearsIn: () => field("appearsIn"),

  /**
   * @description This droid's primary function
   */
  primaryFunction: () => field("primaryFunction"),
};

export const droid = <T extends ReadonlyArray<Selection>>(
  select: (t: IDroidSelector) => T
) =>
  new SelectionBuilder<ISchema, "Droid", T>(
    SCHEMA as any,
    "Droid",
    select(DroidSelector)
  );

interface IFriendsConnectionSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description The total number of friends
   */

  readonly totalCount: () => Field<"totalCount">;

  /**
   * @description The edges for each of the character's friends.
   */

  readonly edges: <T extends ReadonlyArray<Selection>>(
    select: (t: IFriendsEdgeSelector) => T
  ) => Field<"edges", never, SelectionSet<T>>;

  /**
   * @description A list of the friends, as a convenience when edges are not needed.
   */

  readonly friends: <T extends ReadonlyArray<Selection>>(
    select: (t: ICharacterSelector) => T
  ) => Field<"friends", never, SelectionSet<T>>;

  /**
   * @description Information for paginating this connection
   */

  readonly pageInfo: <T extends ReadonlyArray<Selection>>(
    select: (t: IPageInfoSelector) => T
  ) => Field<"pageInfo", never, SelectionSet<T>>;
}

const FriendsConnectionSelector: IFriendsConnectionSelector = {
  __typename: () => field("__typename"),

  /**
   * @description The total number of friends
   */
  totalCount: () => field("totalCount"),

  /**
   * @description The edges for each of the character's friends.
   */

  edges: (select) =>
    field(
      "edges",
      undefined as never,
      selectionSet(select(FriendsEdgeSelector))
    ),

  /**
   * @description A list of the friends, as a convenience when edges are not needed.
   */

  friends: (select) =>
    field(
      "friends",
      undefined as never,
      selectionSet(select(CharacterSelector))
    ),

  /**
   * @description Information for paginating this connection
   */

  pageInfo: (select) =>
    field(
      "pageInfo",
      undefined as never,
      selectionSet(select(PageInfoSelector))
    ),
};

export const friendsConnection = <T extends ReadonlyArray<Selection>>(
  select: (t: IFriendsConnectionSelector) => T
) =>
  new SelectionBuilder<ISchema, "FriendsConnection", T>(
    SCHEMA as any,
    "FriendsConnection",
    select(FriendsConnectionSelector)
  );

interface IFriendsEdgeSelector {
  readonly __typename: () => Field<"__typename">;

  /**
   * @description A cursor used for pagination
   */

  readonly cursor: () => Field<"cursor">;

  /**
   * @description The character represented by this friendship edge
   */

  readonly node: <T extends ReadonlyArray<Selection>>(
    select: (t: ICharacterSelector) => T
  ) => Field<"node", never, SelectionSet<T>>;
}

const FriendsEdgeSelector: IFriendsEdgeSelector = {
  __typename: () => field("__typename"),

  /**
   * @description A cursor used for pagination
   */
  cursor: () => field("cursor"),

  /**
   * @description The character represented by this friendship edge
   */

  node: (select) =>
    field("node", undefined as never, selectionSet(select(CharacterSelector))),
};

export const friendsEdge = <T extends ReadonlyArray<Selection>>(
  select: (t: IFriendsEdgeSelector) => T
) =>
  new SelectionBuilder<ISchema, "FriendsEdge", T>(
    SCHEMA as any,
    "FriendsEdge",
    select(FriendsEdgeSelector)
  );

interface IPageInfoSelector {
  readonly __typename: () => Field<"__typename">;

  readonly startCursor: () => Field<"startCursor">;

  readonly endCursor: () => Field<"endCursor">;

  readonly hasNextPage: () => Field<"hasNextPage">;
}

const PageInfoSelector: IPageInfoSelector = {
  __typename: () => field("__typename"),
  startCursor: () => field("startCursor"),
  endCursor: () => field("endCursor"),
  hasNextPage: () => field("hasNextPage"),
};

export const pageInfo = <T extends ReadonlyArray<Selection>>(
  select: (t: IPageInfoSelector) => T
) =>
  new SelectionBuilder<ISchema, "PageInfo", T>(
    SCHEMA as any,
    "PageInfo",
    select(PageInfoSelector)
  );

interface IReviewSelector {
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

const ReviewSelector: IReviewSelector = {
  __typename: () => field("__typename"),

  /**
   * @description The number of stars this review gave, 1-5
   */
  stars: () => field("stars"),

  /**
   * @description Comment about the movie
   */
  commentary: () => field("commentary"),
};

export const review = <T extends ReadonlyArray<Selection>>(
  select: (t: IReviewSelector) => T
) =>
  new SelectionBuilder<ISchema, "Review", T>(
    SCHEMA as any,
    "Review",
    select(ReviewSelector)
  );

interface IStarshipSelector {
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

  readonly length: <V extends { unit?: Variable<string> | LengthUnit }>(
    variables: V
  ) => Field<"length", [Argument<"unit", V["unit"]>]>;

  readonly coordinates: () => Field<"coordinates">;
}

const StarshipSelector: IStarshipSelector = {
  __typename: () => field("__typename"),

  /**
   * @description The ID of the starship
   */
  id: () => field("id"),

  /**
   * @description The name of the starship
   */
  name: () => field("name"),

  /**
   * @description Length of the starship, along the longest axis
   */
  length: (variables) =>
    field(
      "length",
      Object.entries(variables).map(([k, v]) => argument(k, v)) as any
    ),
  coordinates: () => field("coordinates"),
};

export const starship = <T extends ReadonlyArray<Selection>>(
  select: (t: IStarshipSelector) => T
) =>
  new SelectionBuilder<ISchema, "Starship", T>(
    SCHEMA as any,
    "Starship",
    select(StarshipSelector)
  );

interface ISearchResultSelector {
  readonly __typename: () => Field<"__typename">;

  readonly on: <
    T extends ReadonlyArray<Selection>,
    F extends "Human" | "Droid" | "Starship"
  >(
    type: F,
    select: (
      t: F extends "Human"
        ? IHumanSelector
        : F extends "Droid"
        ? IDroidSelector
        : F extends "Starship"
        ? IStarshipSelector
        : never
    ) => T
  ) => InlineFragment<NamedType<F>, SelectionSet<T>>;
}

const SearchResultSelector: ISearchResultSelector = {
  __typename: () => field("__typename"),

  on: (type, select) => {
    switch (type) {
      case "Human": {
        return inlineFragment(
          namedType("Human"),
          selectionSet(select(HumanSelector as Parameters<typeof select>[0]))
        );
      }

      case "Droid": {
        return inlineFragment(
          namedType("Droid"),
          selectionSet(select(DroidSelector as Parameters<typeof select>[0]))
        );
      }

      case "Starship": {
        return inlineFragment(
          namedType("Starship"),
          selectionSet(select(StarshipSelector as Parameters<typeof select>[0]))
        );
      }

      default:
        throw new TypeConditionError({
          selectedType: type,
          abstractType: "SearchResult",
        });
    }
  },
};

export const searchResult = <T extends ReadonlyArray<Selection>>(
  select: (t: ISearchResultSelector) => T
) =>
  new SelectionBuilder<ISchema, "SearchResult", T>(
    SCHEMA as any,
    "SearchResult",
    select(SearchResultSelector)
  );
