export * from "./AST";
export * from "./Selector";
export * from "./Operation";
export * from "./Result";
export * from "./Variables";
export * from "./Client";
export * from "./Codegen";

// // or new Query({ ... })
// const operation = query({
//   name: 'Example',
//   variables: {
//     id: t.string,
//   },
//   selection: (t, v) => [
//     t.user({ id: v.id }, t => [
//       t.id,
//       t.name,
//       t.friends(t => [
//         t.id,
//         t.firstName,
//       ])
//     ])
//   ]
//   extensions: []
// })
// ```
