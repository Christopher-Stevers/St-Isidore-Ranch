/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ["eslint:recommended", "next",  "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
  }
};

module.exports = config;
