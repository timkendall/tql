import {
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLScalarType,
} from "graphql";

export function toUpper(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function toLower(word: string): string {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

export function inputType(type: GraphQLInputType): GraphQLInputType {
  if (type instanceof GraphQLNonNull) {
    return inputType(type.ofType);
  } else if (type instanceof GraphQLList) {
    return inputType(type.ofType);
  } else {
    return type;
  }
}

export function outputType(type: GraphQLOutputType): GraphQLOutputType {
  if (type instanceof GraphQLNonNull) {
    return outputType(type.ofType);
  } else if (type instanceof GraphQLList) {
    return outputType(type.ofType);
  } else {
    return type;
  }
}

export function listType(type: GraphQLOutputType): boolean {
  if (type instanceof GraphQLNonNull) {
    return listType(type.ofType);
  } else if (type instanceof GraphQLList) {
    return true;
  } else {
    return false;
  }
}

export const toPrimitive = (
  scalar: GraphQLScalarType
): "number" | "string" | "boolean" => {
  switch (scalar.name) {
    case "ID":
    case "String":
      return "string";
    case "Boolean":
      return "boolean";
    case "Int":
    case "Float":
      return "number";
    default:
      return "string";
  }
};
