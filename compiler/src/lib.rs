pub mod generator;
pub mod plugin;
pub mod plugins;

use generator::Generator;
use graphql_parser::schema::parse_schema;
use plugins::typescript::TypeScript;
use swc_ecma_ast::EsVersion;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

fn string_to_static_str(s: String) -> &'static str {
    Box::leak(s.into_boxed_str())
}

#[wasm_bindgen]
pub fn codegen(source: &str) -> String {
    let schema_clone = string_to_static_str(String::from(source));
    let ast = parse_schema::<String>(&schema_clone).expect("Failed to parse schema.");

    let plugin = TypeScript {
        // @todo make configurable from CLI
        es_version: EsVersion::Es2020,
    };

    let generator = Generator::new(&ast, &plugin);

    generator.gen()
}
