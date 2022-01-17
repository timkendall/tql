use graphql_tools::ast::SchemaVisitor;
use graphql_tools::static_graphql::schema::{Document, ObjectType};

use crate::plugin::Codegen;
pub use crate::plugin::Plugin;

struct SchemaVistorContext;

pub struct Generator<'a> {
    schema: &'a Document,
    plugin: &'a Plugin,
}

impl<'a> Generator<'a> {
    pub fn new(schema: &'a Document, plugin: &'a Plugin) -> Generator<'a> {
        Generator { schema, plugin }
    }

    pub fn gen(&self) -> String {
        // visit the GraphQL schema AST (plugin will convert GraphQL AST nodes to TypeScript AST nodes)
        // @todo fold over nodes instead of visiting
        self.visit_schema_document(&self.schema, &mut SchemaVistorContext);
        // @todo collect TypeScript AST nodes (from fold) and pass to `plugin.render/1`
        String::from("console.log('test')")
    }
}

// @todo call each `self.plugin`s gen methods (ex. `object_type`)
impl<'a> SchemaVisitor<SchemaVistorContext> for Generator<'a> {
    fn enter_object_type(&self, node: &ObjectType, context: &mut SchemaVistorContext) {
        let module_item = self.plugin.object_type(node);

        if module_item.is_some() {
            let items = vec![module_item.unwrap()];
            let rendered = self.plugin.render(&items);

            println!("{}", rendered);
        }
    }
}
