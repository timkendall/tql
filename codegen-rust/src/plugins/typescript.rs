use graphql_tools::static_graphql::schema::ObjectType;
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
                    body: vec![],
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
