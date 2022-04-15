import { parse, buildSchema, visit, GraphQLEnumType, Kind, OperationTypeNode } from "graphql";
import type { Code } from "ts-poet";
import prettier from "prettier";

import { typeTransform, selectorInterfaceTransform } from "./transforms";
import { printType } from "./utils";

interface ASTNode {
  kind: string
}

export const render = (sdl: string): string => {
  const ast = parse(sdl, { noLocation: true });
  const schema = buildSchema(sdl);

  const transforms = [
    typeTransform(ast, schema),
    selectorInterfaceTransform(ast, schema),
  ];

  // additive transforms
  const results = transforms.map(
    (vistor) => visit(ast, vistor)
  ) as unknown as Array<{ readonly definitions: Code[] }> ;

  const types = Object.values(schema.getTypeMap()).filter(
    (type) => !type.name.startsWith("__")
  );

  const enumValues = new Set(
    Object.values(schema.getTypeMap())
      .filter((type) => type instanceof GraphQLEnumType)
      .flatMap((type) =>
        (type as GraphQLEnumType).getValues().map((value) => value.value)
      )
  );

  const ENUMS = `
    Object.freeze({
      ${Array.from(enumValues)
        .map((value) => `${value}: true`)
        .join(",\n")}
    } as const)
  `;

  const typeMap = `
    export interface ISchema {
      ${types.map(printType).join("\n")}
    }
  `;

  const source =
    `
    import { buildASTSchema, Kind, OperationTypeNode } from 'graphql'

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
      selectionSet
     } from '@timkendall/tql'

     export type { Result, Variables } from '@timkendall/tql'
     export { $ } from '@timkendall/tql'

     ` +
    `
    export const SCHEMA = buildASTSchema(${stringifyAST(ast)})

    export const ENUMS = ${ENUMS}

    ${typeMap}
  ` +
    results
      .flatMap((result) =>
        result.definitions.map((code) => code.toCodeString())
      )
      .join("\n");

  return prettier.format(source, { parser: "typescript" });
};

const stringifyAST = (ast: ASTNode) => {
  const acc: string[] = [];
  accumulateASTNode(ast, acc)
  return acc.join("\n")
}

const reverseRecord = <TRecord extends Record<string, string>>(input: TRecord) => Object.fromEntries(Object.entries(input).map(([k, v]) => [v, k]))

const kindRevMapping = reverseRecord(Kind)
const operationTypeRevMapping = reverseRecord(OperationTypeNode)

const accumulateASTNode = (
  astNode: ASTNode,
  acc: string[]
) => {
  acc.push('{')
  for (const [k,v] of Object.entries(astNode)) {
    if (v === undefined) continue
    acc.push(`${JSON.stringify(k)}: `)
    if (Array.isArray(v)) {
      acc.push(`[`)
      for (const childNode of v) {
        accumulateASTNode(childNode, acc)
        acc.push(',')
      }
      acc.push(']')
    } else if (typeof v === "object" && typeof v.kind === "string") {
      accumulateASTNode(v, acc)
    } else if (k === "kind" && kindRevMapping[v]) {
      acc.push(`Kind.${kindRevMapping[v]}`)
    } else if (k === "operation" && operationTypeRevMapping[v]) {
      acc.push(`OperationTypeNode.${operationTypeRevMapping[v]}`)
    } else {
      acc.push(JSON.stringify(v))
    }
    acc.push(',')
  }
  acc.push('}')
}

