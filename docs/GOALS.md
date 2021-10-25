# Goals

Here I define the guiding values of this project that can be used to test future designs and implementations against.

1. Ease-of defining type-safe GraphQL operations
    - Type-safe queries, mutations, and subscriptions should be trivial to define
1. Keep it light-weight and performant
    - Apply the minimal build-time and runtime facilities on-top-of graphql-js to achieve goal #1
1. Be transport and execution agnostic
    - Stick with being a query-builder and work with the widest range of clients possible.
