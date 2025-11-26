import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
// @ts-expect-error -- no types for this plugin
import drizzle from "eslint-plugin-drizzle";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import("typescript-eslint").ConfigArray} */
// @ts-expect-error -- types between @eslint/compat and typescript-eslint are incompatible
const nextConfig = fixupConfigRules(compat.extends("next/core-web-vitals"));

export default tseslint.config(
  {
    ignores: [".next", "next-env.d.ts"],
  },
  ...nextConfig,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      drizzle,
    },
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
);
