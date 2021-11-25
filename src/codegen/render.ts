import { parse, buildSchema, visit, GraphQLEnumType } from "graphql";
import type { Code } from "ts-poet";
import prettier from "prettier";

import { typeTransform, selectorInterfaceTransform } from "./transforms";

export const render = (sdl: string): string => {
  const ast = parse(sdl);
  const schema = buildSchema(sdl);

  const transforms = [
    typeTransform(ast, schema),
    selectorInterfaceTransform(ast, schema),
  ];

  // additive transforms
  const results: ReadonlyArray<{ definitions: Code[] }> = transforms.map(
    (vistor) => visit(ast, vistor)
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

  const source =
    `import { 
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
     } from './src'
     
     export { Result, Variables, $ } from './src'
     ` +
    `
    export const SCHEMA = ${JSON.stringify(ast)}
    
    export const ENUMS = ${ENUMS}
  ` +
    results
      .flatMap((result) =>
        result.definitions.map((code) => code.toCodeString())
      )
      .join("\n");

  return prettier.format(source, { parser: "typescript" });
};
