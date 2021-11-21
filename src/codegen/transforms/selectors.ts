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
} from "graphql";
import { imp, code } from "ts-poet";
import { invariant } from "outvariant";

import {
  inputType,
  outputType,
  listType,
  toPrimitive,
  toLower,
} from "../utils";

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

const printArgument = (arg: GraphQLArgument): string => {
  const type = inputType(arg.type);
  const typename =
    type instanceof GraphQLScalarType
      ? toPrimitive(type)
      : type instanceof GraphQLEnumType
      ? type.toString()
      : "I" + type.toString();

  return `Argument<"${arg.name}", Variable<"${arg.name}"> | ${typename}>`;
};

const printVariable = (arg: GraphQLArgument): string => {
  return `${arg.name}${
    arg.type instanceof GraphQLNonNull ? "" : "?"
  }: Variable<"${arg.name}"> | ${printInputType(arg.type)}`;
};

const printMethod = (field: GraphQLField<any, any, any>): string => {
  const { name, args } = field;

  const type = outputType(field.type);

  const comments = [
    field.description && `@description ${field.description}`,
    field.deprecationReason && `@deprecated ${field.deprecationReason}`,
  ].filter(Boolean);

  const jsDocComment =
    comments.length > 0
      ? `
  /**
   ${comments.map((comment) => "* " + comment).join("\n")}
    */
  `
      : "";

  if (type instanceof GraphQLScalarType || type instanceof GraphQLEnumType) {
    // @todo render arguments correctly
    return args.length > 0
      ? jsDocComment.concat(`${name}: (variables) => field("${name}"),`)
      : jsDocComment.concat(`${name}: () => field("${name}"),`);
  } else {
    const renderArgument = (arg: GraphQLArgument): string => {
      return `argument("${arg.name}", variables.${arg.name})`;
    };

    // @todo restrict allowed Field types
    return args.length > 0
      ? `
      ${jsDocComment}
      ${name}:(
        variables,
        select,
      ) => field("${name}", [ ${args
          .map(renderArgument)
          .join(", ")} ], selectionSet(select(${type.toString()}Selector))),
    `
      : `
      ${jsDocComment}
      ${name}: (
        select,
      ) => field("${name}", undefined as never, selectionSet(select(${type.toString()}Selector))),
    `;
  }
};

const printSignature = (field: GraphQLField<any, any, any>): string => {
  const { name, args } = field;

  const type = outputType(field.type);

  const comments = [
    field.description && `@description ${field.description}`,
    field.deprecationReason && `@deprecated ${field.deprecationReason}`,
  ].filter(Boolean) as string[];

  const jsDocComment =
    comments.length > 0
      ? `
    /**
     ${comments.map((comment) => "* " + comment).join("\n")}
     */
    `
      : "";

  if (type instanceof GraphQLScalarType || type instanceof GraphQLEnumType) {
    return args.length > 0
      ? `${jsDocComment}\n readonly ${name}: (variables: { ${args
          .map(printVariable)
          .join(", ")} }) => Field<"${name}", [ ${args
          .map(printArgument)
          .join(", ")} ]>`
      : `${jsDocComment}\n readonly ${name}: () => Field<"${name}">`;
  } else {
    // @todo restrict allowed Field types
    return args.length > 0
      ? `
      ${jsDocComment}
      readonly ${name}: <T extends Array<Selection>>(
        variables: { ${args.map(printVariable).join(", ")} },
        select: (t: I${type.toString()}Selector) => T
      ) => Field<"${name}", [ ${args
          .map(printArgument)
          .join(", ")} ], SelectionSet<T>>,
    `
      : `
      ${jsDocComment}
      readonly ${name}: <T extends Array<Selection>>(
        select: (t: I${type.toString()}Selector) => T
      ) => Field<"${name}", never, SelectionSet<T>>,
    `;
  }
};

export const transform = (
  ast: DocumentNode,
  schema: GraphQLSchema
): ASTVisitor => {
  const Field = imp("Field@timkendall@tql");
  const Argument = imp("Argument@timkendall@tql");
  const Variable = imp("Variable@timkendall@tql");
  const InlineFragment = imp("InlineFragment@timkendall@tql");

  return {
    [Kind.ENUM_TYPE_DEFINITION]: (node) => {
      return null;
    },

    [Kind.ENUM_VALUE_DEFINITION]: (node) => {
      return null;
    },

    [Kind.INPUT_OBJECT_TYPE_DEFINITION]: (def) => {
      return null;
    },

    [Kind.OBJECT_TYPE_DEFINITION]: (node) => {
      const typename = node.name.value;
      const type = schema.getType(typename);

      invariant(
        type instanceof GraphQLObjectType,
        `Type "${typename}" was not instance of expected class GraphQLObjectType.`
      );

      const fields = Object.values(type.getFields());

      return code`
        ${/* selector interface */ ""}
        interface I${type.name}Selector {
          readonly __typename: () => Field<"__typename">
          ${fields.map(printSignature).join("\n")}
        }

        ${/* selector object */ ""}
        export const ${typename}Selector: I${typename}Selector = {
          __typename: () => field("__typename"),
          ${fields.map(printMethod).join("\n")}
        }

        ${/* select fn */ ""}
        export const ${toLower(
          typename
        )} = <T extends Array<Selection>>(select: (t: I${typename}Selector) => T) => new SelectionBuilder<ISchema, "${type}", T>(SCHEMA as any, "${typename}", select(${typename}Selector))
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
        ${/* selector interface */ ""}
        interface I${type.name}Selector {
          readonly __typename: () => Field<"__typename">
          ${fields.map(printSignature).join("\n")}
        }

        ${/* selector object */ ""}
        export const ${typename}Selector: I${typename}Selector = {
          __typename: () => field("__typename"),
          ${fields.map(printMethod).join("\n")}
        }

        ${/* select fn */ ""}
        export const ${toLower(
          typename
        )} = <T extends Array<Selection>>(select: (t: I${typename}Selector) => T) => new SelectionBuilder<ISchema, "${type}", T>(SCHEMA as any, "${typename}", select(${typename}Selector))
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
        ${/* selector interface */ ""}
        interface I${type.name}Selector {
          readonly __typename: () => Field<"__typename">

          ${/* @todo add `on` inline fragment selector */ ""}
        }

        ${/* selector object */ ""}
        export const ${typename}Selector: I${typename}Selector = {
          __typename: () => field("__typename"),
          ${/* @todo add `on` inline fragment selector */ ""}
        }

        ${/* select fn */ ""}
        export const ${toLower(
          typename
        )} = <T extends Array<Selection>>(select: (t: I${typename}Selector) => T) => new SelectionBuilder<ISchema, "${type}", T>(SCHEMA as any, "${typename}", select(${typename}Selector))
      `;
    },

    [Kind.SCHEMA_DEFINITION]: (node) => {
      return null;
    },
  };
};
