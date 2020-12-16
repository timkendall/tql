import * as ts from "typescript";
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
  GraphQLField,
  GraphQLInputType,
} from "graphql";

export const fieldToProperty = (
  field: GraphQLField<any, any>
) /*: ts.PropertyDeclaration*/ => {
  // @todo
};

export const scalarField = () => {
  const name = ts.factory.createIdentifier("id");

  return ts.factory.createPropertyAssignment(
    name,
    ts.factory.createArrowFunction(
      undefined,
      undefined,
      [],
      undefined,
      ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      ts.factory.createNewExpression(
        ts.factory.createIdentifier("Field"),
        [
          ts.factory.createLiteralTypeNode(
            ts.factory.createStringLiteral("id")
          ),
          ts.factory.createTupleTypeNode([]), // @note field arguments
          ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), // @note field TypeScript type
        ],
        [ts.factory.createStringLiteral("id")] // @note `Field` constructor arguments
      )
    )
  );
};

export const importOf = ({
  module,
  defaultImport,
  imports,
}: {
  module: string;
  defaultImport?: string;
  imports: string[];
}): ts.ImportDeclaration =>
  ts.factory.createImportDeclaration(
    undefined,
    undefined,
    ts.factory.createImportClause(
      false,
      defaultImport ? ts.factory.createIdentifier(defaultImport) : undefined,
      ts.factory.createNamedImports(
        imports.map((name) =>
          ts.factory.createImportSpecifier(
            undefined,
            ts.factory.createIdentifier(name)
          )
        )
      )
    ),
    ts.factory.createStringLiteral(module)
  );

export type ScalarTSType =
  | ts.SyntaxKind.StringKeyword
  | ts.SyntaxKind.NumberKeyword
  | ts.SyntaxKind.BooleanKeyword
  | ts.SyntaxKind.UnknownKeyword;

export const getScalarTSType = (graphqlScalarName: string): ScalarTSType => {
  switch (graphqlScalarName) {
    case "String":
      return ts.SyntaxKind.StringKeyword;
    case "Boolean":
      return ts.SyntaxKind.BooleanKeyword;
    case "Int":
    case "Float":
      return ts.SyntaxKind.NumberKeyword;
    default:
      return ts.SyntaxKind.StringKeyword;
  }
};

export const variablesParamater = (
  args: GraphQLArgument[]
): ts.ParameterDeclaration => {
  const properties: ts.PropertySignature[] = args.map((arg) => {
    const { name, type } = arg;

    const isList = isListType(type);
    const isNonNull = isNonNullType(type);
    const namedType = getNamedType(type);

    const typeNode =
      namedType instanceof GraphQLScalarType ||
      namedType instanceof GraphQLEnumType
        ? isList
          ? ts.createArrayTypeNode(
              ts.createKeywordTypeNode(getScalarTSType(namedType.name))
            )
          : ts.createKeywordTypeNode(getScalarTSType(namedType.name))
        : isList
        ? ts.createArrayTypeNode(
            ts.createTypeReferenceNode(
              ts.createIdentifier((namedType as GraphQLInputObjectType).name),
              undefined
            )
          )
        : ts.createTypeReferenceNode(
            ts.createIdentifier((namedType as GraphQLInputObjectType).name),
            undefined
          );

    return ts.createPropertySignature(
      undefined,
      ts.createIdentifier(name),
      isNonNull ? undefined : ts.createToken(ts.SyntaxKind.QuestionToken),
      typeNode,
      undefined
    );
  });

  return ts.createParameter(
    undefined,
    undefined,
    undefined,
    ts.createIdentifier("variables"),
    undefined,
    ts.createTypeLiteralNode([...properties]),
    undefined
  );
};

export const buildSelectorScalarProperty = (
  name: string,
  type: ScalarTSType,
  paramaters: ts.ParameterDeclaration[],
  nullable: boolean = false,
  array: boolean = false
) =>
  ts.createPropertySignature(
    undefined,
    ts.createIdentifier(name),
    undefined,
    ts.createFunctionTypeNode(
      undefined,
      [...paramaters],
      ts.createUnionTypeNode([
        // @todo Support native JS object types for custom scalars
        array
          ? ts.createTypeReferenceNode(ts.createIdentifier("Array"), [
              ts.createKeywordTypeNode(type),
            ])
          : ts.createKeywordTypeNode(type),
        ts.createNull() as any,
      ])
    ),
    undefined
  );

export const buildSelectorObjectProperty = (
  name: string,
  type: string,
  paramaters: ts.ParameterDeclaration[],
  nullable: boolean = false,
  array: boolean = false
) =>
  ts.createPropertySignature(
    undefined,
    ts.createIdentifier(name),
    undefined,
    ts.createFunctionTypeNode(
      [
        ts.createTypeParameterDeclaration(
          ts.createIdentifier("T"),
          undefined,
          undefined
        ),
      ],
      [
        ...paramaters,
        ts.createParameter(
          undefined,
          undefined,
          undefined,
          ts.createIdentifier("build"),
          undefined,
          ts.createFunctionTypeNode(
            undefined,
            [
              ts.createParameter(
                undefined,
                undefined,
                undefined,
                ts.createIdentifier("t"),
                undefined,
                ts.createTypeReferenceNode(
                  ts.createIdentifier(type),
                  undefined
                ),
                undefined
              ),
            ],
            ts.createUnionTypeNode([
              ts.createTypeReferenceNode(ts.createIdentifier("T"), undefined),
              ts.createNull() as any,
            ])
          ),
          undefined
        ),
      ],
      // @todo
      ts.createUnionTypeNode([
        array
          ? ts.createTypeReferenceNode(ts.createIdentifier("Array"), [
              ts.createTypeReferenceNode(ts.createIdentifier("T"), undefined),
            ])
          : ts.createTypeReferenceNode(ts.createIdentifier("T"), undefined),
        ts.createNull() as any,
      ])
    ),
    undefined
  );

export function getBaseOutputType(type: GraphQLOutputType): GraphQLOutputType {
  if (type instanceof GraphQLNonNull) {
    return getBaseOutputType(type.ofType);
  } else if (type instanceof GraphQLList) {
    return getBaseOutputType(type.ofType);
  } else {
    return type;
  }
}

export function getBaseInputType(type: GraphQLInputType): GraphQLInputType {
  if (type instanceof GraphQLNonNull) {
    return getBaseInputType(type.ofType);
  } else if (type instanceof GraphQLList) {
    return getBaseInputType(type.ofType);
  } else {
    return type;
  }
}
