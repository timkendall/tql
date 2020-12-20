import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLField,
  getNamedType,
  isListType,
  isNonNullType,
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLArgument,
  GraphQLInputObjectType,
  GraphQLOutputType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLEnumValue,
  GraphQLInputField,
  GraphQLUnionType,
  GraphQLInputType,
} from "graphql";
import * as ts from "typescript";
import prettier from "prettier";

import { getBaseOutputType, getBaseInputType } from "./codegen/typescript";

const toPrimitive = (
  scalar: GraphQLScalarType
): "number" | "string" | "boolean" | "unknown" => {
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
      return "unknown";
  }
};

const renderInterfaceField = (field: GraphQLField<any, any, any>): string => {
  const isList =
    field.type instanceof GraphQLList ||
    (field.type instanceof GraphQLNonNull &&
      field.type.ofType instanceof GraphQLList);
  const isNonNull = field.type instanceof GraphQLNonNull;
  const baseType = getBaseOutputType(field.type);

  if (baseType instanceof GraphQLScalarType) {
    return `${field.name}: ${toPrimitive(baseType)}` + (isList ? "[]" : "");
  } else if (baseType instanceof GraphQLEnumType) {
    return `${field.name}: ${baseType.name}` + (isList ? "[]" : "");
  } else if (
    baseType instanceof GraphQLInterfaceType ||
    baseType instanceof GraphQLUnionType ||
    baseType instanceof GraphQLObjectType
  ) {
    return `${field.name}: I${baseType.name}` + (isList ? "[]" : "");
  } else {
    throw new Error("Unable to render interface field.");
  }
};

// ex. F extends "Human" ? HumanSelector : DroidSelector
const renderConditionalSelectorArgument = (types: string[]) => {
  const [first, ...rest] = types;

  if (rest.length === 0) {
    return first;
  } else {
    return types
      .map((t) => `F extends "${t}" ? ${t}Selector : `)
      .join("")
      .concat(" never");
  }
};

export class Codegen {
  private readonly printer = ts.createPrinter();
  private readonly source: ts.SourceFile;

  constructor(
    public readonly schema: GraphQLSchema,
    public readonly target: ts.ScriptTarget = ts.ScriptTarget.ES2020
  ) {
    this.source = ts.createSourceFile("", "", target);
  }

  private get imports() {
    return [
      `
    import {
      NamedType,
      Argument,
      Value,
      Field,
      InlineFragment,
      Operation,
      Selection,
      SelectionSet,
      Variable,
    } from '../src'
    `,
    ];
  }

  private get query() {
    return `
      export const query = <T extends Array<Selection>>(
        name: string,
        select: (t: typeof Query) => T
      ): Operation<SelectionSet<T>> => new Operation(name, "query", new SelectionSet(select(Query)))
    `;
  }

  public render(): string {
    const types = Object.values(this.schema.getTypeMap()).filter(
      ({ name }) => !name.startsWith("__")
    ); // @note filter internal types

    const enums = types
      .filter((type) => type instanceof GraphQLEnumType)
      .map((type) => this.enumType(type as GraphQLEnumType));

    const interfaces = types
      .filter((type) => type instanceof GraphQLInputObjectType)
      .map((type) => this.inputObjectType(type as GraphQLInputObjectType));

    const unions = types
      .filter((type) => type instanceof GraphQLUnionType)
      .map((type) => this.unionType(type as GraphQLUnionType));

    const consts = types
      .filter(
        (type) =>
          type instanceof GraphQLInterfaceType ||
          type instanceof GraphQLObjectType
      )
      .map((type) => {
        if (type instanceof GraphQLInterfaceType) {
          return this.interfaceType(type);
        } else if (type instanceof GraphQLObjectType) {
          return this.objectType(type);
        } else {
          return "";
        }
      });

    const text = [
      ...this.imports,
      ...enums,
      ...interfaces,
      ...unions,
      ...consts,
      this.query,
    ];

    return prettier.format(text.join("\n\n"), { parser: "typescript" });
  }

  private enumType(type: GraphQLEnumType): string {
    const values = type.getValues();

    const renderMember = (enumValue: GraphQLEnumValue): string => {
      return `${enumValue.name} = "${enumValue.value}"`;
    };

    return `
      export enum ${type.name} {
        ${values.map(renderMember).join(",\n")}
      }
    `;
  }

  private interfaceType(type: GraphQLInterfaceType): string {
    const fields = Object.values(type.getFields());

    // @note Get all implementors of this interface
    const implementations = this.schema
      .getPossibleTypes(type)
      .map((type) => type.name);

    return `
      export interface I${type.name} {
        __typename: string
        ${fields.map(renderInterfaceField).join("\n")}
      }

      interface ${type.name}Selector {
        __typename: () => Field<"__typename">
        
        ${fields.map((field) => this._fieldSignature(field)).join("\n")}

        on: <T extends Array<Selection>, F extends ${implementations
          .map((name) => `"${name}"`)
          .join(" | ")}>(
          type: F,
          select: (t: ${renderConditionalSelectorArgument(
            implementations.map((name) => name)
          )}) => T
        ) => InlineFragment<NamedType<F, any>, SelectionSet<T>>
      }

      export const ${type.name}: ${type.name}Selector = {
        __typename: () => new Field("__typename"),

        ${fields.map((field) => this.field(field)).join("\n")}

        on: (
          type,
          select,
        ) => {
          switch(type) {
            ${implementations
              .map(
                (name) => `
              case "${name}": {
                return new InlineFragment(
                  new NamedType("${name}") as any,
                  new SelectionSet(select(${name} as any)),
                )
              }
            `
              )
              .join("\n")}
            default:
              throw new Error("Unknown type!")
          }
        },
      }
    `;
  }

  private unionType(type: GraphQLUnionType): string {
    // @note Get all implementors of this union
    const implementations = this.schema
      .getPossibleTypes(type)
      .map((type) => type.name);

    return `
      type ${"I" + type.name} = ${implementations
      .map((type) => `I${type}`)
      .join(" | ")}

      interface ${type.name}Selector {
        __typename: () => Field<"__typename">

        on: <T extends Array<Selection>, F extends ${implementations
          .map((name) => `"${name}"`)
          .join(" | ")}>(
          type: F,
          select: (t: ${renderConditionalSelectorArgument(
            implementations.map((name) => name)
          )}) => T
        ) => InlineFragment<NamedType<F, any>, SelectionSet<T>>
      }

      export const ${type.name}: ${type.name}Selector = {
        __typename: () => new Field("__typename"),

        on: (
          type,
          select,
        ) => {
          switch(type) {
            ${implementations
              .map(
                (name) => `
              case "${name}": {
                return new InlineFragment(
                  new NamedType("${name}") as any,
                  new SelectionSet(select(${name} as any)),
                )
              }
            `
              )
              .join("\n")}
            default:
              throw new Error("Unknown type!")
          }
        },
      }
    `;
  }

  private objectType(type: GraphQLObjectType): string {
    const fields = Object.values(type.getFields());

    const interfaces = type.getInterfaces();

    if (interfaces.length > 0) {
      // @note TypeScript only requires new fields to be defined on interface extendors
      const interfaceFields = interfaces.flatMap((i) =>
        Object.values(i.getFields()).map((field) => field.name)
      );
      const uncommonFields = fields.filter(
        (field) => !interfaceFields.includes(field.name)
      );

      return `
        export interface I${type.name} extends ${interfaces
        .map((i) => "I" + i.name)
        .join(", ")} {
          __typename: "${type.name}"
          ${uncommonFields.map(renderInterfaceField).join("\n")}
        }

        interface ${type.name}Selector {
          __typename: () => Field<"__typename">
          
          ${fields.map((field) => this._fieldSignature(field)).join("\n")}
        }

        export const is${
          type.name
        } = (object: Record<string, any>): object is Partial<I${type.name}> => {
          return object.__typename === "${type.name}";
        };

        export const ${type.name}: ${type.name}Selector = {
          __typename: () => new Field("__typename"),

          ${fields.map((field) => this.field(field)).join("\n")}
        }
      `;
    } else {
      return `
        export interface I${type.name} {
          ${fields.map(renderInterfaceField).join("\n")}
        }

        interface ${type.name}Selector {
          __typename: () => Field<"__typename">
          
          ${fields.map((field) => this._fieldSignature(field)).join("\n")}
        }

        export const ${type.name}: ${type.name}Selector = {
          __typename: () => new Field("__typename"),

          ${fields.map((field) => this.field(field)).join("\n")}
        }
      `;
    }
  }

  private inputObjectType(type: GraphQLInputObjectType): string {
    const fields = Object.values(type.getFields());

    return `
      export interface ${type.name} {
        ${fields.map((field) => this.inputField(field)).join("\n")}
      }
    `;
  }

  private inputField(inputField: GraphQLInputField): string {
    const isList =
      inputField.type instanceof GraphQLList ||
      (inputField.type instanceof GraphQLNonNull &&
        inputField.type.ofType instanceof GraphQLList);
    const isNonNull = inputField.type instanceof GraphQLNonNull;

    const baseType = getBaseInputType(inputField.type);

    // @todo render correct TypeScript type

    return isNonNull
      ? `${inputField.name}: unknown`
      : `${inputField.name}?: unknown`;
  }

  private _fieldSignature(field: GraphQLField<any, any, any>): string {
    const { name, args, type, deprecationReason } = field;

    const isList =
      type instanceof GraphQLList ||
      (type instanceof GraphQLNonNull && type.ofType instanceof GraphQLList);
    const isNonNull = type instanceof GraphQLNonNull;
    const baseType = getBaseOutputType(type);

    if (
      baseType instanceof GraphQLScalarType ||
      baseType instanceof GraphQLEnumType
    ) {
      const fieldType =
        baseType instanceof GraphQLScalarType
          ? toPrimitive(baseType)
          : baseType.name;

      // @todo render arguments correctly
      return args.length > 0
        ? `${name}: (variables: { ${args
            .map((a) => `${a.name}: unknown`)
            .join(", ")} }) => Field<"${name}", [/* @todo */]>`
        : `${name}: () => Field<"${name}">`;
    } else {
      const renderArgument = (arg: GraphQLArgument): string => {
        const _base = getBaseInputType(arg.type);

        // @note Janky enum value support
        return _base instanceof GraphQLEnumType
          ? `Argument<"${arg.name}", Variable<"${
              arg.name
            }"> | ${getBaseInputType(arg.type).toString()}>`
          : `Argument<"${arg.name}", Variable<"${
              arg.name
            }"> | ${renderInputType(arg.type)}>`;
      };

      const renderInputType = (type: GraphQLInputType): string => {
        const _base = getBaseInputType(type);

        if (_base instanceof GraphQLScalarType) {
          return toPrimitive(_base);
        } else if (_base instanceof GraphQLEnumType) {
          return _base.name;
        } else {
          return "unknown";
        }
      };

      const renderVariable = (arg: GraphQLArgument): string => {
        return arg instanceof GraphQLNonNull
          ? `${arg.name}: Variable<"${arg.name}"> | ${renderInputType(
              arg.type
            )}`
          : `${arg.name}?: Variable<"${arg.name}"> | ${renderInputType(
              arg.type
            )}`;
      };

      // @todo render arguments correctly
      // @todo restrict allowed Field types
      return args.length > 0
        ? `
        ${name}: <T extends Array<Selection>>(
          variables: { ${args.map(renderVariable).join(", ")} },
          select: (t: ${baseType.toString()}Selector) => T
        ) => Field<"${name}", [ ${args
            .map(renderArgument)
            .join(", ")} ], SelectionSet<T>>,
      `
        : `
        ${name}: <T extends Array<Selection>>(
          select: (t: ${baseType.toString()}Selector) => T
        ) => Field<"${name}", never, SelectionSet<T>>,
      `;
    }
  }

  private field(field: GraphQLField<any, any, any>): string {
    const { name, args, type, deprecationReason } = field;

    const isList =
      type instanceof GraphQLList ||
      (type instanceof GraphQLNonNull && type.ofType instanceof GraphQLList);
    const isNonNull = type instanceof GraphQLNonNull;
    const baseType = getBaseOutputType(type);

    // @todo If `GraphQLInterfaceType` or `GraphQLUnionType` define a new "merged" `Selector`?

    const deprecatedComment = deprecationReason
      ? `
    /**
     * @deprecated ${deprecationReason}
     */
    `
      : "";

    if (
      baseType instanceof GraphQLScalarType ||
      baseType instanceof GraphQLEnumType
    ) {
      const fieldType =
        baseType instanceof GraphQLScalarType
          ? toPrimitive(baseType)
          : baseType.name;

      // @todo render arguments correctly
      return args.length > 0
        ? deprecatedComment.concat(
            `${name}: (variables) => new Field("${name}"),`
          )
        : deprecatedComment.concat(`${name}: () => new Field("${name}"),`);
    } else {
      const renderArgument = (arg: GraphQLArgument): string => {
        const _base = getBaseInputType(arg.type);

        // @note Janky enum value support
        return _base instanceof GraphQLEnumType
          ? `new Argument("${arg.name}", variables.${arg.name}, ${_base.name})`
          : `new Argument("${arg.name}", variables.${arg.name})`;
      };

      const renderInputType = (type: GraphQLInputType): string => {
        const _base = getBaseInputType(type);

        if (_base instanceof GraphQLScalarType) {
          return toPrimitive(_base);
        } else if (_base instanceof GraphQLEnumType) {
          return _base.name;
        } else {
          return "unknown";
        }
      };

      const renderVariable = (arg: GraphQLArgument): string => {
        return arg instanceof GraphQLNonNull
          ? `${arg.name}: Variable<"${arg.name}"> | ${renderInputType(
              arg.type
            )}`
          : `${arg.name}?: Variable<"${arg.name}"> | ${renderInputType(
              arg.type
            )}`;
      };

      // @todo render arguments correctly
      // @todo restrict allowed Field types
      return args.length > 0
        ? `
        ${deprecatedComment}
        ${name}:(
          variables,
          select,
        ) => new Field("${name}", [ ${args
            .map(renderArgument)
            .join(", ")} ], new SelectionSet(select(${baseType.toString()}))),
      `
        : `
        ${deprecatedComment}
        ${name}: (
          select,
        ) => new Field("${name}", undefined as never, new SelectionSet(select(${baseType.toString()}))),
      `;
    }
  }
}
