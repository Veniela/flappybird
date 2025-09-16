import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  {
    rules: {
      "no-unused-vars": "warn",        // Warn about variables that are declared but never used.
      "no-undef": "warn",              // Warn about undefined variables.
      "no-console": "off",             // Allow console statements.
      "prefer-const": "warn",          // Suggest using const for variables that are never reassigned.
      "eqeqeq": "error",               // Enforce strict equality comparisons.
      "curly": "warn",                 // Require curly braces for all control statements.
      "semi": ["warn", "always"],      // Enforce semicolons at the end of statements.
      "no-debugger": "warn",           // Warn against leaving debugger statements.
      "no-shadow": "warn",             // Warn when a variable shadows another.
      "consistent-return": "warn"      // Enforce consistent return statements in functions.
    },
  },
]);