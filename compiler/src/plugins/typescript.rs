use deno_ast::{parse_module, MediaType, ParseParams, SourceTextInfo};
use dprint_plugin_typescript::configuration::ConfigurationBuilder as DprintConfigurationBuilder;
use dprint_plugin_typescript::format_parsed_source;
use graphql_tools::static_graphql::schema::{
    EnumType, InputObjectType, InterfaceType, ObjectType, ScalarType, Type, UnionType,
};
use swc_atoms::*;
use swc_common::{sync::Lrc, FilePathMapping, SourceMap, DUMMY_SP};
use swc_ecma_ast::*;
use swc_ecma_codegen::{text_writer::JsWriter, Emitter};

use crate::plugin::Plugin;

pub struct TypeScript {
    pub es_version: EsVersion, // @todo readonly interfaces
}

trait AbstractType {
    fn possible_types(&self) -> Vec<String>;
}

// @todo this won't actually work since `InterfaceType` has no reference
// to the parent schema (for us to go find implementors of itself)
impl AbstractType for InterfaceType {
    fn possible_types(&self) -> Vec<String> {
        vec![String::from("Foo")]
    }
}

impl Plugin for TypeScript {
    fn scalar_type(&self, scalar_type: &ScalarType) -> Option<ModuleItem> {
        let scalar = ExportDecl {
            span: DUMMY_SP,
            decl: Decl::TsTypeAlias(TsTypeAliasDecl {
                span: DUMMY_SP,
                declare: false,
                id: Ident {
                    span: DUMMY_SP,
                    sym: JsWord::from(scalar_type.name.as_str()),
                    optional: false,
                },
                type_params: None,
                type_ann: Box::new(TsType::TsKeywordType(TsKeywordType {
                    span: DUMMY_SP,
                    kind: scalar_to_builtin(scalar_type.name.as_str()),
                })),
            }),
        };

        Some(ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(scalar)))
    }

    fn enum_type(&self, enum_type: &EnumType) -> Option<ModuleItem> {
        let enum_d = ExportDecl {
            span: DUMMY_SP,
            decl: Decl::TsEnum(TsEnumDecl {
                span: DUMMY_SP,
                declare: false,
                is_const: false,
                id: Ident {
                    span: DUMMY_SP,
                    sym: JsWord::from(enum_type.name.as_str()),
                    optional: false,
                },
                members: enum_type
                    .values
                    .iter()
                    .map(|val| TsEnumMember {
                        span: DUMMY_SP,
                        id: TsEnumMemberId::Ident(Ident {
                            span: DUMMY_SP,
                            sym: JsWord::from(val.name.as_str()),
                            optional: false,
                        }),
                        init: Some(Box::new(Expr::Lit(Lit::Str(Str {
                            span: DUMMY_SP,
                            value: JsWord::from(val.name.as_str()),
                            has_escape: false,
                            kind: StrKind::Normal {
                                contains_quote: false,
                            },
                        })))),
                    })
                    .collect(),
            }),
        };

        Some(ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(enum_d)))
    }

    fn interface_type(&self, interface_type: &InterfaceType) -> Option<ModuleItem> {
        let mut fields: Vec<TsTypeElement> = interface_type
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
            .collect();

        let typename = TsTypeElement::TsPropertySignature(TsPropertySignature {
            span: DUMMY_SP,
            readonly: true,
            key: Box::new(Expr::Ident(Ident {
                span: DUMMY_SP,
                sym: JsWord::from(String::from("__typename")),
                optional: false,
            })),
            computed: false,
            optional: false,
            init: None,
            params: vec![],
            type_ann: Some(TsTypeAnn {
                span: DUMMY_SP,
                type_ann: Box::new(TsType::TsUnionOrIntersectionType(
                    TsUnionOrIntersectionType::TsUnionType(TsUnionType {
                        span: DUMMY_SP,
                        // @todo we really want `possible_types`
                        types: interface_type
                            .possible_types()
                            .iter()
                            .map(|t| {
                                Box::new(TsType::TsLitType(TsLitType {
                                    span: DUMMY_SP,
                                    lit: TsLit::Str(Str {
                                        span: DUMMY_SP,
                                        value: JsWord::from(t.as_str()),
                                        has_escape: false,
                                        kind: StrKind::Normal {
                                            contains_quote: false,
                                        },
                                    }),
                                }))
                            })
                            .collect(),
                    }),
                )),
            }),
            type_params: None,
        });

        fields.push(typename);

        let interface = ExportDecl {
            span: DUMMY_SP,
            decl: Decl::TsInterface(TsInterfaceDecl {
                id: Ident {
                    span: DUMMY_SP,
                    sym: JsWord::from(String::from("I") + interface_type.name.as_str()),
                    optional: false,
                },
                span: DUMMY_SP,
                declare: false,
                type_params: None,
                extends: vec![],
                body: TsInterfaceBody {
                    span: DUMMY_SP,
                    body: fields,
                },
            }),
        };

        Some(ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(interface)))
    }

    fn object_type(&self, object_type: &ObjectType) -> Option<ModuleItem> {
        let mut fields: Vec<TsTypeElement> = object_type
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
                    optional: true,
                    init: None,
                    params: vec![],
                    type_ann: Some(TsTypeAnn {
                        span: DUMMY_SP,
                        // @todo lookup referenced `TypeDefinition` for additional metadata
                        type_ann: Box::new(to_ts_type(&f.field_type)),
                    }),
                    type_params: None,
                })
            })
            .collect();

        let typename = TsTypeElement::TsPropertySignature(TsPropertySignature {
            span: DUMMY_SP,
            readonly: true,
            key: Box::new(Expr::Ident(Ident {
                span: DUMMY_SP,
                sym: JsWord::from(String::from("__typename")),
                optional: false,
            })),
            computed: false,
            optional: false,
            init: None,     // Option<Box<Expr>>, // ?
            params: vec![], // only for functions
            type_ann: Some(TsTypeAnn {
                span: DUMMY_SP,
                type_ann: Box::new(TsType::TsLitType(TsLitType {
                    span: DUMMY_SP,
                    lit: TsLit::Str(Str {
                        span: DUMMY_SP,
                        value: JsWord::from(object_type.name.as_str()),
                        has_escape: false,
                        kind: StrKind::Normal {
                            contains_quote: false,
                        },
                    }),
                })),
            }),
            type_params: None, // only for functions
        });

        fields.push(typename);

        let interface = ExportDecl {
            span: DUMMY_SP,
            decl: Decl::TsInterface(TsInterfaceDecl {
                id: Ident {
                    span: DUMMY_SP,
                    sym: JsWord::from(String::from("I") + object_type.name.as_str()),
                    optional: false,
                },
                span: DUMMY_SP,
                declare: false,
                type_params: None,
                extends: vec![], // @todo extend the interfaces it implements
                body: TsInterfaceBody {
                    span: DUMMY_SP,
                    body: fields, // @todo only include fields not on the interfaces it implements
                },
            }),
        };

        Some(ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(interface)))
    }

    fn input_object_type(&self, input_object_type: &InputObjectType) -> Option<ModuleItem> {
        let fields: Vec<TsTypeElement> = input_object_type
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
                    optional: true, // @todo only if `value_type` is not `NonNullType`
                    init: None,
                    params: vec![],
                    type_ann: Some(TsTypeAnn {
                        span: DUMMY_SP,
                        type_ann: Box::new(to_ts_type(&f.value_type)),
                    }),
                    type_params: None,
                })
            })
            .collect();

        let interface = ExportDecl {
            span: DUMMY_SP,
            decl: Decl::TsInterface(TsInterfaceDecl {
                id: Ident {
                    span: DUMMY_SP,
                    sym: JsWord::from(String::from("I") + input_object_type.name.as_str()),
                    optional: false,
                },
                span: DUMMY_SP,
                declare: false,
                type_params: None,
                extends: vec![],
                body: TsInterfaceBody {
                    span: DUMMY_SP,
                    body: fields,
                },
            }),
        };

        Some(ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(interface)))
    }

    fn union_type(&self, union_type: &UnionType) -> Option<ModuleItem> {
        let union = ExportDecl {
            span: DUMMY_SP,
            decl: Decl::TsTypeAlias(TsTypeAliasDecl {
                span: DUMMY_SP,
                declare: false,
                id: Ident {
                    span: DUMMY_SP,
                    sym: JsWord::from(String::from("I") + union_type.name.as_str()),
                    optional: false,
                },
                type_params: None,
                type_ann: Box::new(TsType::TsUnionOrIntersectionType(
                    TsUnionOrIntersectionType::TsUnionType(TsUnionType {
                        span: DUMMY_SP,
                        types: union_type
                            .types
                            .iter()
                            .map(|t| {
                                Box::new(TsType::TsTypeRef(TsTypeRef {
                                    span: DUMMY_SP,
                                    type_name: TsEntityName::Ident(Ident {
                                        span: DUMMY_SP,
                                        sym: JsWord::from(String::from("I") + t.as_str()),
                                        optional: false,
                                    }),
                                    type_params: None,
                                }))
                            })
                            .collect(),
                    }),
                )),
            }),
        };

        Some(ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(union)))
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

        // let program = Program::Module(module.to_owned());
        // @todo instantiate the source directly from the AST
        //     let parsed_source = ParsedSource::new(
        //       "foo",
        //        MediaType::TypeScript,
        // SourceTextInfo::from_string(String::from("")),
        //     );
        let _ = emitter.emit_module(&module);

        // println!("{}", String::from_utf8_lossy(&buf).to_string());

        let parsed_source = parse_module(ParseParams {
            specifier: "my_file.ts".to_string(),
            source: SourceTextInfo::from_string(String::from_utf8_lossy(&buf).to_string()),
            media_type: MediaType::TypeScript,
            capture_tokens: true,
            maybe_syntax: None,
            scope_analysis: false,
        })
        .unwrap();
        // @todo load Dprint configuration from file or explicit CLI arg
        let config = DprintConfigurationBuilder::new().build();

        format_parsed_source(&parsed_source, &config)
            .unwrap()
            .to_string()
    }
}

fn scalar_to_builtin(name: &str) -> TsKeywordTypeKind {
    match name {
        "ID" => TsKeywordTypeKind::TsStringKeyword,
        "String" => TsKeywordTypeKind::TsStringKeyword,
        "Int" => TsKeywordTypeKind::TsNumberKeyword,
        "Float" => TsKeywordTypeKind::TsNumberKeyword,
        "Boolean" => TsKeywordTypeKind::TsBooleanKeyword,
        _ => TsKeywordTypeKind::TsStringKeyword,
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
                // @todo define a to_ts_ref -> TsTypeRef
                _ => TsType::TsTypeRef(TsTypeRef {
                    span: DUMMY_SP,
                    type_name: TsEntityName::Ident(Ident {
                        span: DUMMY_SP,
                        // @todo don't prepend "I" to enum types
                        sym: JsWord::from(String::from("I") + value.as_str()),
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
