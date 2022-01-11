use apollo_parser::{ast, Parser};
use std::fs;
use std::path::PathBuf;
use structopt::StructOpt;
use swc_common::{sync::Lrc, FilePathMapping, SourceMap, DUMMY_SP};
use swc_ecma_ast::*;
use swc_ecma_codegen::{
    text_writer::{JsWriter, WriteJs},
    Emitter,
};

/// A basic example
#[derive(StructOpt, Debug)]
#[structopt(name = "basic")]
struct Opt {
    // A flag, true if used in the command line. Note doc comment will
    // be used for the help message of the flag. The name of the
    // argument will be, by default, based on the name of the field.
    /// Activate debug mode
    #[structopt(short, long)]
    debug: bool,

    /// Files to process
    #[structopt(name = "FILE", parse(from_os_str))]
    file: PathBuf,
}

fn main() {
    // 1. Read graphql schema text from file
    // 2. Parse into GraphQL AST with apollo_parser
    // 3. Visit AST mapping to TypeScript AST
    // 4. Print formatted AST with `dprint`
    // 5. Output to stdout

    let opt = Opt::from_args();
    println!("{:#?}", opt);

    // if opt.debug {
    //     println!("Debugging!")
    // }

    // let schema_path = opt.file;

    // match fs::read_to_string(schema_path) {
    //     Ok(schema) => {
    //         // println!("With text:\n{}", schema);

    //         let parser = Parser::new(&schema.to_string());
    //         let ast = parser.parse();

    //         // assert_eq!(0, ast.errors().len());

    //         let doc = ast.document();

    //         for def in doc.definitions() {
    //             if let ast::Definition::ObjectTypeDefinition(object_type) = def {
    //                 println!("{}", object_type.name().unwrap().text());

    //                 for field_def in object_type.fields_definition().unwrap().field_definitions() {
    //                     println!("{}", field_def.name().unwrap().text()); // size weight
    //                 }
    //             }
    //         }
    //     }
    //     Err(err) => println!("Error"),
    // }

    let mut buf = vec![];
    let cm = Lrc::new(SourceMap::new(FilePathMapping::empty()));

    let mut emitter = Emitter {
        cfg: swc_ecma_codegen::Config {
            ..Default::default()
        },
        cm: cm.clone(),
        comments: None,
        wr: JsWriter::new(cm.clone(), "\n", &mut buf, None),
    };

    // let export = ModuleItem::Stmt(Stmt::Expr(ExprStmt {
    //   span: DUMMY_SP,
    //   expr: Box::new(Expr::Assign(AssignExpr {
    //       span: DUMMY_SP,
    //       op: op!("="),
    //       left: PatOrExpr::Expr(Box::new(Expr::Member(MemberExpr {
    //           span: DUMMY_SP,
    //           obj: Box::new(Expr::Ident(Ident::new("module".into(), DUMMY_SP))),
    //           prop: MemberProp::Ident(Ident::new("exports".into(), DUMMY_SP)),
    //       }))),
    //       right: expr,
    //   })),
    // }));

    let stmt = ModuleItem::Stmt(Stmt::Debugger(DebuggerStmt { span: DUMMY_SP }));

    let module = Module {
        span: DUMMY_SP,
        body: vec![stmt],
        shebang: None,
    };

    emitter.emit_module(&module);

    println!("{:?}", String::from_utf8_lossy(&buf).to_string());
}
