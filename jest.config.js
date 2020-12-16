const pack = require('./package');

module.exports = {
  preset: "ts-jest",
  // disable type-checking (probably not what we actually want for this project ;)
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  },
  name: pack.name,
  displayName: pack.name,
  testEnvironment: "node",
  moduleDirectories: ['node_modules', 'resource', 'src', '__tests__'],
  testPathIgnorePatterns: ['build'],
  testRegex: "(/(__tests__|src)/.*(\\.|/)(test|spec))\\.(ts|tsx)$",
  moduleDirectories: ['node_modules', 'resource', 'src', '__tests__']
}