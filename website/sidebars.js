/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  default: [
    {
      type: 'category',
      label: 'Quickstart',
      collapsed: false,
      items: [
        {
          type: 'doc',
          label: 'Installation',
          id: 'quickstart/installation'
        },
        {
          type: 'doc',
          label: 'Codegen',
          id: 'quickstart/codegen'
        },
        {
          type: 'doc',
          label: 'Demo',
          id: 'quickstart/demo'
        },
      ]
    },
    {
      type: 'doc',
      label: 'Operations',
      id: 'operations'
    },
    {
      type: 'doc',
      label: 'Variables',
      id: 'variables'
    },
    {
      type: 'category',
      label: 'Fragments',
      items: [
        {
          type: 'doc',
          label: 'Inline',
          id: 'fragments/inline'
        },
        {
          type: 'doc',
          label: 'Named',
          id: 'fragments/named'
        },
      ]
    },
    {
      type: 'doc',
      label: 'Directives',
      id: 'directives'
    },
    {
      type: 'category',
      label: 'Client Examples',
      collapsed: false,
      items: [
        {
          type: 'doc',
          label: '@apollo/client',
          id: 'client-examples/apollo'
        },
        {
          type: 'doc',
          label: 'graphql-request',
          id: 'client-examples/graphql-request'
        },
        {
          type: 'doc',
          label: 'urql',
          id: 'client-examples/urql'
        },
      ]
    },
    {
      type: 'category',
      label: 'API',
      items: [
        {
          type: 'doc',
          label: 'Selection',
          id: 'api/selection'
        },
      ]
    },
  ]
};

module.exports = sidebars;
