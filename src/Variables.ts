import {
  Kind,
  TypeNode,
  parse,
  visit,
  visitWithTypeInfo,
  TypeInfo,
  buildSchema,
  GraphQLSchema,
} from "graphql";

import { namedType, variableDefinition, Operation } from "./AST";

import {
  Field,
  Argument,
  Selection,
  SelectionSet,
  Variable,
  VariableDefinition,
  Value,
} from "./AST";

type VariableType<
  Parent extends Record<any, any>,
  Field extends string,
  Arg extends string
> = Parent[Field] extends (variables: any) => any
  ? Parameters<Parent[Field]>[0] extends infer U // get the `variables`  arg
    ? U extends Record<any, infer V>
      ? U[Arg]
      : never //Parameters<Parent[Field]>[0][Arg]
    : never
  : never;

type MapReturnType<
  Parent extends Record<any, any>,
  Field extends string
> = Parent[Field] extends (...args: any[]) => any
  ? ReturnType<Parent[Field]>
  : never;

export type Variables<
  Type /* type is really a map of resolvers w/inline variable defs */,
  S extends SelectionSet<Array<Selection>>
> = S["selections"][number] extends infer U
  ? U extends Field<infer Key, Array<Argument<infer N, infer V>>, infer SS>
    ? V extends Variable<infer VName>
      ? {
          [_ in VName]: VariableType<
            Type,
            Key,
            VName
          > /* @question why does this turn into a union? */;
        }
      : undefined extends SS
      ? never
      : Variables<MapReturnType<Type, Key> /*Type*/, SS> // @todo recurse...
    : never
  : never;

export const isVariable = (value: any): value is Variable<string> =>
  typeof value === "object" && value.kind === Kind.VARIABLE;

export interface ArgumentTypeMap {
  [field: string]: { [arg: string]: TypeNode };
}

export const buildVariableDefinitions = <T extends Operation<any>>(
  schema: GraphQLSchema,
  operation: T
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

  visit(operation, visitor);

  return variableDefinitions;
};
