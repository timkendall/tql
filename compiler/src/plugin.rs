use graphql_tools::static_graphql::schema::{
    EnumType, InterfaceType, ObjectType, ScalarType, UnionType,
};
// @todo take a generic to represent `ModuleItem` (i.e the target language AST node type)
use swc_ecma_ast::ModuleItem;

pub trait Plugin {
    fn scalar_type(&self, scalar_type: &ScalarType) -> Option<ModuleItem>;

    fn enum_type(&self, enum_type: &EnumType) -> Option<ModuleItem>;

    fn interface_type(&self, interface_type: &InterfaceType) -> Option<ModuleItem>;

    fn object_type(&self, object_type: &ObjectType) -> Option<ModuleItem>;

    fn union_type(&self, union_type: &UnionType) -> Option<ModuleItem>;

    fn render(&self, items: &Vec<ModuleItem>) -> String;
}
