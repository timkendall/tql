use graphql_parser::schema::parse_schema;
use std::fs;
use std::path::PathBuf;
use structopt::StructOpt;

mod generator;
mod plugin;

pub use crate::generator::Generator;
pub use crate::plugin::Plugin;

fn string_to_static_str(s: String) -> &'static str {
    Box::leak(s.into_boxed_str())
}

#[derive(StructOpt, Debug)]
#[structopt(name = "tql")]
struct Opt {
    /// Files to process
    #[structopt(name = "FILE", parse(from_os_str))]
    file: PathBuf,
}

fn main() {
    let opt = Opt::from_args();

    let schema_path = opt.file;
    let err_msg = format!("Unable to read schema from file {:?}", schema_path);

    let schema = fs::read_to_string(schema_path).expect(&err_msg);
    let schema_clone = string_to_static_str(schema.to_string());
    let ast = parse_schema::<String>(&schema_clone).expect("Failed to parse schema.");

    let plugin = Plugin {
        name: String::from("typescript"),
    };

    let generator = Generator::new(&ast, &plugin);

    println!("{}", generator.gen());
}
