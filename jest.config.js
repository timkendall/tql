const pack = require('./package');

module.exports = {
  name: pack.name,
  displayName: pack.name,
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest'],
  },
  testEnvironment: "node",
  moduleDirectories: ['node_modules', 'resource', 'src', '__tests__'],
  testPathIgnorePatterns: ['build'],
  testRegex: "(/(__tests__|src)/.*(\\.|/)(test|spec))\\.(ts|tsx)$",
  moduleDirectories: ['node_modules', 'resource', 'src', '__tests__']
}