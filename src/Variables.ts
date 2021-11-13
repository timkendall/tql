import type { GraphQLSchema } from "graphql";
import { Kind, visitWithTypeInfo, TypeInfo, visit } from "graphql";
import { O, U } from "ts-toolbelt";

import {
  SelectionSet,
  Selection,
  Field,
  InlineFragment,
  Argument,
  Variable,
  VariableDefinition,
  variable,
  variableDefinition,
} from "./AST";

export const $ = <Name extends string>(name: Name): Variable<Name> =>
  variable(name);

export const buildVariableDefinitions = <T extends SelectionSet<any>>(
  op: "query" | "mutation" | "subscription",
  schema: GraphQLSchema,
  selectionSet: T
): Array<VariableDefinition<any, any>> => {
  const variableDefinitions: VariableDefinition<any, any>[] = [];
  const typeInfo = new TypeInfo(schema);
  const visitor = visitWithTypeInfo(typeInfo, {
    [Kind.ARGUMENT]: (argNode) => {
      if (isVariable(argNode.value) && typeInfo.getArgument()?.astNode?.type) {
        // define the `VariableDefinition`
        variableDefinitions.push(
          variableDefinition(
            argNode.value,
            typeInfo.getArgument()?.astNode?.type!
          )
        );
      }
    },
  });

  // @todo return from here
  visit(selectionSet, visitor);

  return variableDefinitions;
};

export const isVariable = (value: any): value is Variable<string> =>
  typeof value === "object" && value.kind === Kind.VARIABLE;

// @note Traverse the AST extracting `Argument` nodes w/ values of `Variable`.
// Extract the type the Variable value needs to be against/the Schema.
export type Variables<
  Schema extends Record<string, any>,
  RootType extends Record<string, any>,
  S extends SelectionSet<ReadonlyArray<Selection>> | undefined
> = U.Merge<
  undefined extends S
    ? {}
    : S extends SelectionSet<ReadonlyArray<Selection>>
    ? S["selections"][number] extends infer Selection
      ? Selection extends Field<infer FieldName, infer FieldArgs, infer SS>
        ? O.Merge<
            FilterMapArguments<RootType, FieldName, FieldArgs>,
            Variables<Schema, RootType[FieldName], SS>
          >
        : // @todo InlineFragment's
        Selection extends InlineFragment<infer Typename, infer FragSelection>
        ? Variables<
            Schema,
            Typename extends string ? Schema[Typename] : {},
            FragSelection
          >
        : {}
      : {}
    : {}
>;

// @note filter on `Argument`'s that have values of `Variable`
// @todo replace with actual `Filter` type
type FilterMapArguments<
  Type extends Record<any, any>,
  FieldName extends string,
  FieldArgs extends Array<Argument<any, any>> | undefined
> = FieldArgs extends Array<Argument<infer ArgName, infer ArgValue>>
  ? ArgValue extends Variable<infer VName>
    ? Record<VName, VariableType<Type, FieldName, ArgName>>
    : {}
  : {};

type VariableType<
  Parent extends Record<any, any>,
  Field extends string,
  Arg extends string
> =
  // see if the field is parameterized
  Parent[Field] extends (variables: any) => any
    ? Parameters<Parent[Field]>[0] extends infer U // get the `variables`  arg
      ? // ensure the "variables" parameter is a Record
        // @note too-bad JavaScript doesn't support named arguments
        U extends Record<infer VarName, infer VarType>
        ? // exract the cooresponding type for the argument
          VarName extends Arg
          ? VarType
          : never
        : never
      : never
    : never;
