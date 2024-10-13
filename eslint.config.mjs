import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly', // Include Node.js globals like __dirname, __filename
        __filename: 'readonly',
        module: 'readonly'
      },
      parser: tsParser,
      ecmaVersion: 2021, // Use ES2021 (es2021 equivalent)
      sourceType: 'module',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    },

    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      indent: ['error', 2],
      'max-lines': [
        'error',
        {
          max: 800,
          skipComments: true,
          skipBlankLines: true
        }
      ],
      quotes: ['off', 'single'],
      semi: ['error', 'always'],
      complexity: ['error', 10],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-empty': 'error',
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      'prefer-const': 'error',
      'no-shadow': 'error',
      'no-debugger': 'error',
      'object-curly-spacing': ['error', 'always']
    },
    ignores: ['eslint.config.mjs']
  }
];
