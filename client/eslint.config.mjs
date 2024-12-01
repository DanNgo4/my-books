import eslint from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {

    rules: {
      "no-unused-vars": 0,
      "no-prototype-builtins": 0,
      "no-console": 0,
      "getter-return": 0
    },

    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.nodeBuiltin,
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },

      parser: babelParser,
      ecmaVersion: 2019,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          legacyDecorators: true
        },
      },
    },
  }
];
