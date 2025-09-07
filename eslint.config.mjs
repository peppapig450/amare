// @ts-check
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import prettierRecommended from "eslint-plugin-prettier/recommended"
import tseslint from "typescript-eslint"

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

export default tseslint.config(
  // 0) global ignores (replacement for .eslintignore)
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
      "src/generated/**/*",
    ],
  },

  // 1) Next.js rules (via FlatCompat for the legacy shareable config)
  ...compat.config({ extends: ["next/core-web-vitals"] }),
  // Ensure the Next plugin is registered under the expected key
  { plugins: { "@next/next": nextPlugin } },

  // 2) Base JS for any plain JS files you might have
  { files: ["src/**/*.{js,jsx}"], ...js.configs.recommended },

  // 3) Type-aware TS/TSX
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      prettierRecommended, // keep last to avoid formatting rule conflicts
    ],
    languageOptions: {
      // tseslint.configs already wires parser+plugin; we only add parserOptions
      parserOptions: {
        // modern, faster way to enable type-aware linting across the project
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "prefer-const": "error",
      "no-implicit-coercion": "error",
    },
  },
)
