import { transformSync, ImportDeclaration } from "@swc/core";
import Visitor from "@swc/core/Visitor";

class QualifyImports extends Visitor {
  visitImportDeclaration(declaration: ImportDeclaration): ImportDeclaration {
    return {
      ...declaration,
      source: {
        ...declaration.source,
        value: declaration.source.value + ".ts",
      },
    };
  }
}

(async () => {
  const result = transformSync(`import { SelectionSet } from './AST'`, {
    plugin: (m: any) => new QualifyImports().visitProgram(m),
  });

  console.log(result);
})();
