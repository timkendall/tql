import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLScalarType,
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
} from "graphql";
import * as ts from "typescript";
import prettier from "prettier";

import {
  importOf,
  getBaseOutputType,
  buildSelectorScalarProperty,
  getScalarTSType,
  variablesParamater,
  buildSelectorObjectProperty,
} from "./codegen/typescript";

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
      {
        module: "@timkendall/tsgql",
        imports: [
          "Argument",
          "Value",
          "Field",
          "Operation",
          "SelectionSet",
          "Variable",
          "execute",
        ],
      },
    ].map(importOf);
  }

  public render(): string {
    const types = Object.values(this.schema.getTypeMap()).filter(
      ({ name }) => !name.startsWith("__")
    ); // @note filter internal types

    const enums = types
      .filter((type) => type instanceof GraphQLEnumType)
      .map((type) => this.enumType(type as GraphQLEnumType));

    const interfaces = types
      .filter((type) => type instanceof GraphQLObjectType)
      .map((type) => this.objectType(type as GraphQLObjectType));

    const nodes = [...this.imports, ...enums, ...interfaces];

    const text = nodes.map((node) =>
      this.printer.printNode(ts.EmitHint.Unspecified, node, this.source)
    );

    return prettier.format(text.join("\n\n"), { parser: "typescript" });
  }

  private enumType(type: GraphQLEnumType): ts.EnumDeclaration {
    const values = type.getValues();

    const members: ts.EnumMember[] = values.map((value) => {
      return ts.factory.createEnumMember(
        ts.factory.createIdentifier(value.name),
        ts.factory.createStringLiteral(value.value)
      );
    });

    return ts.factory.createEnumDeclaration(
      undefined,
      undefined,
      ts.factory.createIdentifier(type.name),
      members
    );
  }

  private objectType(type: GraphQLObjectType): ts.InterfaceDeclaration {
    const decorators = undefined;
    const modifiers = undefined;
    const name = type.name;
    const typeParameters = undefined;
    const heritageClauses = undefined;
    const members: ts.TypeElement[] = Object.values(type.getFields()).map(
      (field) => {
        const { name, args, type } = field;

        const isList =
          type instanceof GraphQLList ||
          (type instanceof GraphQLNonNull &&
            type.ofType instanceof GraphQLList);
        const isNonNull = type instanceof GraphQLNonNull;
        const baseType = getBaseOutputType(type);

        if (
          baseType instanceof GraphQLScalarType ||
          baseType instanceof GraphQLEnumType
        ) {
          return buildSelectorScalarProperty(
            name,
            getScalarTSType(baseType.name),
            args.length > 0 ? [variablesParamater(args)] : [],
            !isNonNull,
            isList
          );
        } else {
          // is an ObjectType?
          return buildSelectorObjectProperty(
            name,
            baseType.toString(),
            args.length > 0 ? [variablesParamater(args)] : [],
            !isNonNull,
            isList
          );
        }
      }
    );

    return ts.factory.createInterfaceDeclaration(
      decorators,
      modifiers,
      name,
      typeParameters,
      heritageClauses,
      members
    );
  }

  // private inputObjectType(type: GraphQLInputObjectType): ts.InterfaceDeclaration {

  // }
}
