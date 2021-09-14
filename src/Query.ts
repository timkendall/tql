import { SelectionSet } from ".";
import { Selection, Variable, Operation } from "./Operation";
import { ISelector, selector } from "./Selector";

// // examples: $('id'), $('id!')
// export const $ = (literals: TemplateStringsArray, ...placeholders: string[]) => {
//   return new Variable<typeof literals[0]>(literals[0])
// }

export const $ = <T extends string>(name: T) => {
  return new Variable(name);
};

export function query<T extends Array<Selection>>(
  selections: T
): Operation<SelectionSet<T>>;
export function query<T>(
  select: (selector: ISelector<T>) => Array<Selection>
): Operation<SelectionSet<Array<Selection>>> {
  if (Array.isArray(arguments[0])) {
    return new Operation("", "query", new SelectionSet(arguments[0]));
  } else {
    return new Operation("", "query", new SelectionSet(select(selector())));
  }
}

// query<T, S extends Array<Selection>>(select: (selector: T) => S): TypeDocumentNode<Result<S>, Variables<S>>
// { definitions: ReadonlyArray<ExecutableDefinitionNode> }
