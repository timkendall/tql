import { TypedQueryDocumentNode } from "graphql";

import { Codegen } from "../Codegen";

describe("Codegen", () => {
  // `interface Selectable TypedDocumentNode<Result<Schema, Query, SelectionSet<T>>>, Variables<Schema, Query, SelectionSet>`
  //
  // const OPERATION = operation({ name: '', selectionSet: QUERY.toSelectionSet(), directives: [], variableDefinitions: QUERY.getVariableDefs() })
  // const OPERATION2 = operation('query', t => []).directive('live', { if: $('if') })
  //
  // query/user/etc -> Selection (.toOperation(queryName, useVariables, dropNullInputValues), .toFragment)
  // (optional)
  //
  // const QUERY = query(t => [ t.viewer(t => [ t.id().skip({ if: $('skipIf') }) ])]).named('MyQuery') // TypedQueryDocumentNode (maybe have a `.configure()` escape-hatch?)
  // const FRAGMENT = user(t => [ t.id() ]).toInlineFragment() // InlineFragment
  // const FRAGMENT2 = on(type: Types<Schema>, select: <T>(selector: ) => ): InlineFragment<T, U>
  //
  // const NAMED_FRAGMENT = fragment(name: string, on: Types, select: (selector: A) => ) => NamedFragment<T, U>
  describe("schema", () => {
    describe("scalars", () => {
      it.todo("converts ScalarTypes to primitives"); // @todo what about custom scalars like DateTime
      it.todo("converts custom scalars to string types");
    });

    describe("enums", () => {
      it.todo("converts EnumTypes to enums");
    });

    describe("objects", () => {
      it.todo("converts ObjectTypes to interfaces");
    });

    describe("input objects", () => {
      it.todo("converts InputObjectTypes to interfaces");
    });

    describe("interfaces", () => {
      it.todo("converts InterfaceTypes to interfaces");
    });

    describe("unions", () => {
      it.todo("converts UnionTypes to unions");
    });
  });

  describe("selectors", () => {
    describe("scalars", () => {
      it.todo("generates a method for defining a `Field` selection");
    });

    describe("enums", () => {
      it.todo("generates a method for defining a `Field` selection");
    });

    describe("objects", () => {
      it.todo("generates a method for defining a `Field` selection");
    });

    describe("interfaces", () => {
      it.todo(
        "generates an `on` method for defining an `InlineFragment` selection"
      );
    });

    describe("unions", () => {
      it.todo(
        "generates an `on` method for defining an `InlineFragment` selection"
      );
    });
  });

  describe("utilities", () => {
    it.todo("generates a const `_ENUM_VALUES` object");
    it.todo("generates a const `SCHEMA_SHA` string");
  });
});
