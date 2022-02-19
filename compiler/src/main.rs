use graphql_parser::schema::parse_schema;
use std::fs;
use std::path::PathBuf;
use structopt::StructOpt;
use swc_ecma_ast::EsVersion;

pub mod generator;
pub mod plugin;
pub mod plugins;

pub use generator::Generator;
pub use plugins::typescript::TypeScript;

fn string_to_static_str(s: String) -> &'static str {
    Box::leak(s.into_boxed_str())
}

/// Generate a fluent TypeScript client for your GraphQL API.
#[derive(StructOpt, Debug)]
#[structopt(name = "tql")]
struct Opt {
    /// GraphQL schema to compile
    #[structopt(name = "SCHEMA", parse(from_os_str))]
    file: PathBuf,
}

fn main() {
    let opt = Opt::from_args();

    let schema_path = opt.file;
    let err_msg = format!("Unable to read schema from file {:?}", schema_path);

    let schema = fs::read_to_string(schema_path).expect(&err_msg);
    let schema_clone = string_to_static_str(schema.to_string());
    let ast = parse_schema::<String>(&schema_clone).expect("Failed to parse schema.");

    let plugin = TypeScript {
        // @todo make configurable from CLI
        es_version: EsVersion::Es2020,
    };

    let generator = Generator::new(&ast, &plugin);

    println!("{}", generator.gen());
}
