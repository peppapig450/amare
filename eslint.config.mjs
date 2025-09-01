// eslint.config.mjs
// @ts-check
import { FlatCompat } from "@eslint/eslintrc"
import eslint from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import prettierRecommended from "eslint-plugin-prettier/recommended"
import tseslint from "typescript-eslint"

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

export default tseslint.config(
  // 0) GLOBAL ignores — no `files` here so they always apply
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "eslint.config.mjs",
      "postcss.config.*",
      "tailwind.config.*",
      "vite.config.*",
    ],
  },

  // 1) Next.js rules (compat converts legacy `extends` to flat)
  ...compat.config({ extends: ["next/core-web-vitals"] }),
  // make the Next plugin available (some rules expect it registered)
  { plugins: { "@next/next": nextPlugin } },

  // 2) (Optional) Base JS rules for JS in src
  { files: ["src/**/*.{js,jsx}"], ...eslint.configs.recommended },

  // 3) Type-aware TS rules — ONLY for src TS/TSX
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      prettierRecommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // your rules:
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-implicit-coercion": "error",
    },
  },
)
