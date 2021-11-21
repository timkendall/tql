import { TypedQueryDocumentNode } from "graphql";

import { codegen } from "../Codegen2";

describe("Codegen", () => {
  describe("schema", () => {
    describe("scalars", () => {
      it("converts ScalarTypes to primitives", () => {
        const input = `
          scalar String
          scalar Int
          scalar Float
          scalar ID
          scalar Boolean
        `;

        const output = codegen(input);

        expect(output).toBe(
          expect.stringContaining(`
          interface ISchema {
            String: string
            Int: number
            Float: number
            ID: string
            Boolean: boolean
          }
        `)
        );
      });

      it("converts custom scalars to string types", () => {
        const input = `
          scalar DateTime
        `;

        const output = codegen(input);

        expect(output).toBe(
          expect.stringContaining(`
          interface ISchema {
            String: string
            Int: number
            Float: number
            ID: string
            Boolean: boolean
            DateTime: string
          }
        `)
        );
      });
    });

    describe("enums", () => {
      it("converts EnumTypes to enums", () => {
        const input = `
          enum Foo {
            BAR
            BAZ
          }
        `;

        const output = codegen(input);

        expect(output).toBe(
          expect.stringContaining(`
          interface ISchema {
            Foo: Foo
          }

          export enum Foo {
            BAR = 'BAR',
            BAZ = 'BAZ'
          }
        `)
        );
      });
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

  describe("top-level API", () => {
    // for defining variables
    it.todo("exposes a `$` fn");
    // for constructing inline-fragments
    it.todo("exposes a `on` selector fn");
  });

  describe("utilities", () => {
    it.todo("generates a const `_ENUM_VALUES` object");
    it.todo("generates a const `SCHEMA_SHA` string");
  });
});
