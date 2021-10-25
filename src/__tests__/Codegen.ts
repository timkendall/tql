import { Codegen } from "../Codegen";

describe("Codegen", () => {
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
