# Codegen (Rust)

Experimental port of `tql-gen` to Rust for speed and learning.

## Building the Executable

## for native

`cargo build --bin tql`

## for WASM

`cargo build --target wasm32-wasi --bin tql` or `cargo wasi build --bin tql`

## Building the Library

Wasm binary and JS bindings with `wasm-pack build` or the standalone Wasm with `cargo build --lib --target wasm32-unknown-unknown`

Manually optimize if on ARM Mac

`wasm-opt -Oz -o ../bin/tql.wasm target/wasm32-wasi/release/tql.wasm`