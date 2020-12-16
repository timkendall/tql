// import * as TS from 'typescript'
// import { createSourceFile, ScriptTarget } from 'typescript'

// // const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

// // const source = createSourceFile('file.ts', 'interface Foo { readonly bar: string }', ts.ScriptTarget.ES2020)

// // source.forEachChild(child => {

// //   if (ts.isInterfaceDeclaration(child)) {
// //     const foo = child // ts.InterfaceDeclaration
// //     console.log(printer.printNode(ts.EmitHint.Unspecified, child, source)) + "\n";
// //   }

// //   console.log('########')
// // })

// // type Function = 'function'
// type Interface = 'interface'
// type Enum = 'enum'

// type Parse<T extends string> = T extends ` ${string}`
//     ? Parse<T>
//     : T extends `\n${string}`
//     ? Parse<T>
//     :T extends `${Interface} ${string}` ?
//   TS.InterfaceDeclaration
//   : T extends `${Enum} ${string}`
//   ? TS.EnumDeclaration
//   : unknown

// type B = Parse<'enum ff'>
// // export function tss(template: Template): any {

// // }

// // tss('interface f')

// export function parse<Template extends string>(template: Template): Parse<Template> {
//   const source = createSourceFile('file.ts', template, ScriptTarget.ES2020)

//   return source.getChildren().find(node => TS.isInterfaceDeclaration(node)) as  Parse<Template>
// }

// const interfaceDeclartion = parse(`
// interface User {
//     id: string
//   }
// `)

// // interface TemplateStringsArray extends ReadonlyArray<string> {
// //   readonly raw: readonly string[];
// // }

// // function foo(template: TemplateStringsArray) {}

// // foo`interface User { binfo: string }`

// // export function ts(strings: TemplateStringsArray, ...expr: string[]) {
// //   const source = createSourceFile('file.ts', 'todo', ScriptTarget.ES2020)

// //   console.log(strings)
// //   console.log(expr)

// //   // @todo run TypeScript parser
// //   return null
// // }

// // console.log(tst`
// // interface ${'User'} {
// //   ${['id'].map(field => `${field}: () => new Field<"${field}", [], string>("${field}")`).join('\n')}
// // }
// // `)

export function ts(strings: TemplateStringsArray, ...expr: any[]) {
  // const source = createSourceFile('file.ts', 'todo', ScriptTarget.ES2020)

  console.log(strings);
  console.log(expr);

  // @todo run TypeScript parser
  return null;
}

ts`
  enum %name {
    {% for member in members %}
    {{member.name}} = {{member.value}}
    {% end %}
    ${[
      { name: "admin", value: "ADMIN" },
      { name: "support", value: "SUPPORT" },
    ].map((value) => `${value.name} = ${value.value}`)}
  }
`;

type EnumTemplate = `
  enum ${string} {
    ${string} = ${string}
  }
`;

const enumOf = (template: EnumTemplate) => {
  // @todo
};

enumOf(`
  enum Foo {
    bar = baz
  }
`);
