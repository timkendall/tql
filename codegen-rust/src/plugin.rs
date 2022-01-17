use graphql_tools::static_graphql::schema::ObjectType;
// @todo take a generic to represent `ModuleItem` (i.e the target language AST node type)
use swc_ecma_ast::ModuleItem;

pub trait Plugin {
    fn object_type(&self, object_type: &ObjectType) -> Option<ModuleItem>;

    fn render(&self, items: &Vec<ModuleItem>) -> String;
}
