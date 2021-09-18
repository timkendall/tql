import { Selection, SelectionSet, Variable, VariableDefinition } from "./AST";

export type Variables<T, U> = any; /* @todo */

export const buildVariables = <T extends SelectionSet<Array<Selection>>>(
  selectionSet: T
): Array<VariableDefinition<any, any>> => {
  // @todo walk selectionset tree extracting variable nodes from field arguments
  return [];
};
