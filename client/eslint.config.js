import globals from "globals"
import pluginJs from "@eslint/js"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { fixupConfigRules } from "@eslint/compat"


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {languageOptions: { globals: globals.browser }},
  {
    "rules": {
      "semi": ["error", "never"]
    },
    "globals": {
      "Intl": "readonly",
    }
  },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
]