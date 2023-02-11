/* eslint-env node */

module.exports = {
  clearMocks: true,
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.(ts|tsx|mjs)$": [
      "@swc-node/jest",
      {
        target: "es2018",
        react: {
          runtime: "automatic",
          development: true,
        },
      },
    ],
  },
};
