use graphql_tools::ast::SchemaVisitor;
use graphql_tools::static_graphql::schema::{Document, EnumType, ObjectType, ScalarType};
// @todo take a generic to represent `ModuleItem` (i.e the target language AST node type)
use swc_ecma_ast::ModuleItem;

use crate::plugin::Plugin;

struct SchemaVistorContext {
    nodes: Vec<ModuleItem>,
}

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
        let mut context = SchemaVistorContext { nodes: Vec::new() };
        // visit the GraphQL schema AST (plugin will convert GraphQL AST nodes to TypeScript AST nodes)
        // @todo fold over nodes instead of visiting
        self.visit_schema_document(&self.schema, &mut context);
        // @todo collect TypeScript AST nodes (from fold) and pass to `plugin.render/1`
        self.plugin.render(&context.nodes)
    }
}

// @todo call each `self.plugin`s gen methods (ex. `object_type`)
impl<'a, T> SchemaVisitor<SchemaVistorContext> for Generator<'a, T>
where
    T: Plugin,
{
    fn enter_scalar_type(&self, node: &ScalarType, context: &mut SchemaVistorContext) {
        match self.plugin.scalar_type(node) {
            Some(node) => {
                context.nodes.push(node);
            }
            None => { /* @todo */ }
        }
    }

    fn enter_enum_type(&self, node: &EnumType, context: &mut SchemaVistorContext) {
        match self.plugin.enum_type(node) {
            Some(node) => {
                context.nodes.push(node);
            }
            None => { /* @todo */ }
        }
    }

    fn enter_object_type(&self, node: &ObjectType, context: &mut SchemaVistorContext) {
        // @todo push this onto `context` for now
        match self.plugin.object_type(node) {
            Some(node) => {
                context.nodes.push(node);
            }
            None => { /* @todo */ }
        }
    }
}
