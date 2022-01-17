use graphql_tools::static_graphql::schema::{ObjectType, Type};
use swc_atoms::*;
use swc_common::{sync::Lrc, FilePathMapping, SourceMap, DUMMY_SP};
use swc_ecma_ast::*;
use swc_ecma_codegen::{text_writer::JsWriter, Emitter};

use crate::plugin::Plugin;

pub struct TypeScript {
    pub es_version: EsVersion, // @todo readonly interfaces
}

impl Plugin for TypeScript {
    fn object_type(&self, object_type: &ObjectType) -> Option<ModuleItem> {
        let interface = ExportDecl {
            span: DUMMY_SP,
            decl: Decl::TsInterface(TsInterfaceDecl {
                id: Ident {
                    span: DUMMY_SP,
                    sym: JsWord::from(object_type.name.as_str()),
                    optional: false,
                },
                span: DUMMY_SP,
                declare: false,
                type_params: None,
                extends: vec![],
                body: TsInterfaceBody {
                    span: DUMMY_SP,
                    body: object_type
                        .fields
                        .iter()
                        .map(|f| {
                            TsTypeElement::TsPropertySignature(TsPropertySignature {
                                span: DUMMY_SP,
                                readonly: true,
                                key: Box::new(Expr::Ident(Ident {
                                    span: DUMMY_SP,
                                    sym: JsWord::from(f.name.to_string()),
                                    optional: false,
                                })),
                                computed: false,
                                optional: true, // @todo
                                init: None,     // Option<Box<Expr>>, // ?
                                params: vec![], // only for functions
                                type_ann: Some(TsTypeAnn {
                                    span: DUMMY_SP,
                                    type_ann: Box::new(to_ts_type(&f.field_type)),
                                }),
                                type_params: None, // only for functions
                            })
                        })
                        .collect(),
                },
            }),
        };

        Some(ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(interface)))
    }

    fn render(&self, items: &Vec<ModuleItem>) -> String {
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

        let module = Module {
            span: DUMMY_SP,
            body: items.to_owned(),
            shebang: None,
        };

        let _ = emitter.emit_module(&module);

        String::from_utf8_lossy(&buf).to_string()
    }
}

fn to_ts_type(graphql_type: &Type) -> TsType {
    // @todo TsUnionOrIntersectionType

    match graphql_type {
        Type::NamedType(value) => {
            match value.as_str() {
                "Boolean" => TsType::TsKeywordType(TsKeywordType {
                    span: DUMMY_SP,
                    kind: TsKeywordTypeKind::TsBooleanKeyword,
                }),
                "Int" => TsType::TsKeywordType(TsKeywordType {
                    span: DUMMY_SP,
                    kind: TsKeywordTypeKind::TsNumberKeyword,
                }),
                "Float" => TsType::TsKeywordType(TsKeywordType {
                    span: DUMMY_SP,
                    kind: TsKeywordTypeKind::TsNumberKeyword,
                }),
                "ID" => TsType::TsKeywordType(TsKeywordType {
                    span: DUMMY_SP,
                    kind: TsKeywordTypeKind::TsStringKeyword,
                }),
                "String" => TsType::TsKeywordType(TsKeywordType {
                    span: DUMMY_SP,
                    kind: TsKeywordTypeKind::TsStringKeyword,
                }),
                // unknown scalars and complex types
                _ => TsType::TsTypeRef(TsTypeRef {
                    span: DUMMY_SP,
                    type_name: TsEntityName::Ident(Ident {
                        span: DUMMY_SP,
                        sym: JsWord::from(value.as_str()),
                        optional: false,
                    }),
                    type_params: None,
                }),
            }
        }
        Type::ListType(boxed_type) => TsType::TsArrayType(TsArrayType {
            span: DUMMY_SP,
            elem_type: Box::new(to_ts_type(&boxed_type)),
        }),
        Type::NonNullType(boxed_type) => {
            // @todo
            to_ts_type(&boxed_type)
        }
    }
}
