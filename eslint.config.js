/* One rule matters here, and it is not style.

   A hooks-after-early-return regression took the live app down once: a
   useState added below `if (beat.t === "done") return <Done/>` meant the hook
   order changed on the last screen of a unit, React threw error #300, and
   finishing your first mission gave you a black page. Nothing in the build
   catches that, because it is valid JavaScript.

   So this config exists to make `rules-of-hooks` a build failure. The rest is
   deliberately minimal — there is no house style to enforce and a wall of
   formatting warnings would train everyone to ignore the output. */

import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  { ignores: ["dist/**", "node_modules/**"] },
  {
    files: ["src/**/*.{js,jsx}", "worker/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.serviceworker },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...js.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      /* Exhaustive-deps is a warning on purpose. Several effects here
         intentionally run once, and turning this into an error would mean
         either lying in the dependency array or disabling it line by line. */
      "react-hooks/exhaustive-deps": "warn",
      /* Off: this is a single-file React app with no module-level dead code
         worth policing, and JSX-only identifiers trip the default. */
      "no-unused-vars": ["warn", { args: "none", caughtErrors: "none", varsIgnorePattern: "^_" }],
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
];
