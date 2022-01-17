use graphql_tools::ast::SchemaVisitor;
use graphql_tools::static_graphql::schema::{Document, ObjectType};

use crate::plugin::Plugin;

struct SchemaVistorContext;

pub struct Generator<'a, T: Plugin> {
    schema: &'a Document,
    plugin: &'a T,
}

impl<'a, T> Generator<'a, T>
where
    T: Plugin,
{
    pub fn new(schema: &'a Document, plugin: &'a T) -> Generator<'a, T> {
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
impl<'a, T> SchemaVisitor<SchemaVistorContext> for Generator<'a, T>
where
    T: Plugin,
{
    fn enter_object_type(&self, node: &ObjectType, context: &mut SchemaVistorContext) {
        // @todo push this onto `context` for now
        let module_item = self.plugin.object_type(node);

        if module_item.is_some() {
            let items = vec![module_item.unwrap()];
            let rendered = self.plugin.render(&items);

            println!("{}", rendered);
        }
    }
}