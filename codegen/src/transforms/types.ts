import {
  GraphQLSchema,
  ASTVisitor,
  Kind,
  GraphQLArgument,
  isListType,
  isNonNullType,
  GraphQLField,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLNamedType,
  GraphQLUnionType,
  GraphQLInterfaceType,
  DocumentNode,
  GraphQLInputField,
} from "graphql";
import { code } from "ts-poet";
import { invariant } from "outvariant";

import { inputType, outputType, listType, toPrimitive } from "../utils";

const printInputType = (type: GraphQLInputType): string => {
  const _base = inputType(type);

  if (_base instanceof GraphQLScalarType) {
    return toPrimitive(_base);
  } else if (_base instanceof GraphQLEnumType) {
    return _base.name;
  } else if (_base instanceof GraphQLInputObjectType) {
    return "I" + _base.name;
  } else {
    throw new Error("Unable to render inputType.");
  }
};

const printVariable = (arg: GraphQLArgument): string => {
  return `${arg.name}: ${printInputType(arg.type)} ${
    arg.type instanceof GraphQLNonNull ? "" : "| undefined"
  }`;
};

const printField = (field: GraphQLField<any, any, any>): string => {
  const { name, args } = field;

  const isList = listType(field.type);
  const isNonNull = field.type instanceof GraphQLNonNull;
  const type = outputType(field.type);

  const printVariables = () => {
    return args.length > 0
      ? `(variables: { ${args.map(printVariable).join(", ")} })`
      : "";
  };

  if (type instanceof GraphQLScalarType) {
    return (
      `${args.length > 0 ? "" : "readonly"} ${field.name}${printVariables()}: ${
        isList ? `ReadonlyArray<${toPrimitive(type)}>` : `${toPrimitive(type)}`
      }` + (isNonNull ? "" : " | null")
    );
  } else if (type instanceof GraphQLEnumType) {
    return (
      `${args.length > 0 ? "" : "readonly"} ${field.name}${printVariables()}: ${
        isList ? `ReadonlyArray<${type.name}>` : `${type.name}`
      }` + (isNonNull ? "" : " | null")
    );
  } else if (
    type instanceof GraphQLInterfaceType ||
    type instanceof GraphQLUnionType ||
    type instanceof GraphQLObjectType
  ) {
    return (
      `${args.length > 0 ? "" : "readonly"} ${field.name}${printVariables()}: ${
        isList ? `ReadonlyArray<I${type.name}>` : `I${type.name}`
      }` + (isNonNull ? "" : " | null")
    );
  } else {
    throw new Error("Unable to print field.");
  }
};

export const transform = (
  ast: DocumentNode,
  schema: GraphQLSchema
): ASTVisitor => {
  // @note needed to serialize inline enum values correctly at runtime
  const enumValues = new Set<string>();

  return {
    [Kind.DIRECTIVE_DEFINITION]: () => null,

    [Kind.SCALAR_TYPE_DEFINITION]: () => null,

    [Kind.ENUM_TYPE_DEFINITION]: (node) => {
      const typename = node.name.value;
      const values = node.values?.map((v) => v.name.value) ?? [];

      const printMember = (member: string): string => {
        return `${member} = "${member}"`;
      };

      return code`
        export enum ${typename} {
          ${values.map(printMember).join(",\n")}
        }
      `;
    },

    [Kind.ENUM_VALUE_DEFINITION]: (node) => {
      enumValues.add(node.name.value);
      return null;
    },

    [Kind.INPUT_OBJECT_TYPE_DEFINITION]: (node) => {
      const typename = node.name.value;
      const type = schema.getType(typename);

      invariant(
        type instanceof GraphQLInputObjectType,
        `Type "${typename}" was not instance of expected class GraphQLInputObjectType.`
      );

      const fields = Object.values(type.getFields());

      const printField = (field: GraphQLInputField) => {
        const isList = isListType(field.type);
        const isNonNull = isNonNullType(field.type);
        const baseType = inputType(field.type);

        let tsType: string;

        if (baseType instanceof GraphQLScalarType) {
          tsType = toPrimitive(baseType);
        } else if (baseType instanceof GraphQLEnumType) {
          tsType = baseType.name;
        } else if (baseType instanceof GraphQLInputObjectType) {
          tsType = "I" + baseType.name;
        } else {
          throw new Error("Unable to render inputField!");
        }

        return [
          field.name,
          isNonNull ? ":" : "?:",
          " ",
          tsType,
          isList ? "[]" : "",
        ].join("");
      };

      return code`
        export interface I${typename} {
          ${fields.map(printField).join("\n")}
        }
      `;
    },

    [Kind.OBJECT_TYPE_DEFINITION]: (node) => {
      const typename = node.name.value;
      const type = schema.getType(typename);

      invariant(
        type instanceof GraphQLObjectType,
        `Type "${typename}" was not instance of expected class GraphQLObjectType.`
      );

      const fields = Object.values(type.getFields());
      const interfaces = type.getInterfaces();

      // @note TypeScript only requires new fields to be defined on interface extendors
      const interfaceFields = interfaces.flatMap((i) =>
        Object.values(i.getFields()).map((field) => field.name)
      );
      const uncommonFields = fields.filter(
        (field) => !interfaceFields.includes(field.name)
      );

      // @todo extend any implemented interfaces
      // @todo only render fields unique to this type
      const extensions =
        interfaces.length > 0
          ? `extends ${interfaces.map((i) => "I" + i.name).join(", ")}`
          : "";

      return code`
        export interface I${typename} ${extensions} {
          readonly __typename: ${`"${typename}"`}
          ${uncommonFields.map(printField).join("\n")}
        }
      `;
    },

    [Kind.INTERFACE_TYPE_DEFINITION]: (node) => {
      const typename = node.name.value;
      const type = schema.getType(typename);

      invariant(
        type instanceof GraphQLInterfaceType,
        `Type "${typename}" was not instance of expected class GraphQLInterfaceType.`
      );

      // @note Get all implementors of this union
      const implementations = schema
        .getPossibleTypes(type)
        .map((type) => type.name);

      const fields = Object.values(type.getFields());

      return code`
        export interface I${typename} {
          readonly __typename: ${implementations
            .map((type) => `"${type}"`)
            .join(" | ")}
          ${fields.map(printField).join("\n")}
        }
      `;
    },

    [Kind.UNION_TYPE_DEFINITION]: (node) => {
      const typename = node.name.value;
      const type = schema.getType(typename);

      invariant(
        type instanceof GraphQLUnionType,
        `Type "${typename}" was not instance of expected class GraphQLUnionType.`
      );

      // @note Get all implementors of this union
      const implementations = schema
        .getPossibleTypes(type)
        .map((type) => type.name);

      return code`
        export type ${"I" + type.name} = ${implementations
        .map((type) => `I${type}`)
        .join(" | ")}
      `;
    },

    [Kind.SCHEMA_DEFINITION]: (node) => {
      const types = Object.values(schema.getTypeMap()).filter(
        (type) => !type.name.startsWith("__")
      );

      const printType = (type: GraphQLNamedType) => {
        if (type instanceof GraphQLScalarType) {
          return `${type.name}: ${toPrimitive(type)}`;
        } else if (type instanceof GraphQLEnumType) {
          return `${type.name}: ${type.name}`;
        } else {
          return `${type.name}: I${type.name}`;
        }
      };

      return code`
        export interface ISchema {
          ${types.map(printType).join("\n")}
        }
      `;
    },
  };
};
