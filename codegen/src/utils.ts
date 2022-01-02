import {
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLScalarType,
  GraphQLNamedType,
  GraphQLEnumType,
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

export function listType(type: GraphQLOutputType | GraphQLInputType): boolean {
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

export const printType = (type: GraphQLNamedType) => {
  if (type instanceof GraphQLScalarType) {
    return `${type.name}: ${toPrimitive(type)}`;
  } else if (type instanceof GraphQLEnumType) {
    return `${type.name}: ${type.name}`;
  } else {
    return `${type.name}: I${type.name}`;
  }
};
