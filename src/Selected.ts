import { print } from "graphql/language";

import {
  Selection,
  SelectionSet,
  FragmentDefinition,
  InlineFragment,
  fragmentDefinition,
  inlineFragment,
  NamedType,
  namedType,
  selectionSet,
} from "./AST";

type Element<T> = T extends Array<infer U> ? U : never;

export class Selected<U extends Array<Selection>> extends Array<Element<U>> {
  constructor(public readonly type: string, public readonly selections: U) {
    super(...((selections as unknown) as Element<U>[]) /* seems wrong*/);
  }

  toSelectionSet(): SelectionSet<U> {
    return selectionSet(this.selections);
  }

  toFragment<Name extends string>(
    name: Name
  ): FragmentDefinition<
    Name,
    NamedType<this["type"]>,
    SelectionSet<this["selections"]>
  > {
    return fragmentDefinition(
      name,
      namedType(this.type),
      selectionSet(this.selections)
    );
  }

  toInlineFragment(): InlineFragment<
    NamedType<this["type"]>,
    SelectionSet<this["selections"]>
  > {
    return inlineFragment(namedType(this.type), selectionSet(this.selections));
  }

  toString() {
    return print(this.toSelectionSet());
  }
}
