module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ["eslint:recommended", "standard", "prettier"],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
