use std::path::PathBuf;
use structopt::StructOpt;
use std::fs;
use apollo_parser::{ast, Parser};


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
    // read graphql schema text from file
    // parse into AST with apollo_parser
    // switch on `ObjectTypeDefinition`
    // derive TypeScript AST for interface using `dprint`
    // print and format using `dprint`

    let opt = Opt::from_args();
    println!("{:#?}", opt);

    let schema_path = opt.file;

    match fs::read_to_string(schema_path) {
      Ok(schema) => {
        println!("With text:\n{}", schema);
        
        let parser = Parser::new(&schema.to_string());
        let ast = parser.parse();

        assert_eq!(0, ast.errors().len());

        let doc = ast.document();

        for def in doc.definitions() {
          if let ast::Definition::ObjectTypeDefinition(object_type) = def {
            println!("{}", object_type.name().unwrap().text());
            
            // for field_def in object_type.fields_definition().unwrap().field_definitions() {
            //     println!("{}", field_def.name().unwrap().text()); // size weight
            // }
          }
        }
      }
      Err(err) => println!("Error")
    }
}
