import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';
import paddingBeforeArrowConst from './eslint-rules/padding-before-arrow-const.js';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/.next/**', '**/node_modules/**'],
  },
  {
    files: ['{app,components,db,hooks,lib,__tests__}/**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
  },
  eslintPluginPrettier,
  {
    files: ['{app,components,db,hooks,lib,__tests__}/**/*.{ts,tsx}'],
    plugins: {
      custom: {
        rules: {
          'padding-before-arrow-const': paddingBeforeArrowConst,
        },
      },
      import: importPlugin,
    },
    rules: {
      curly: ['error', 'all'],
      'no-console': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'max-statements-per-line': ['error', { max: 1 }],
      'no-lonely-if': 'error',
      'custom/padding-before-arrow-const': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['for', 'while', 'do'], next: '*' },
        { blankLine: 'always', prev: 'if', next: '*' },
        { blankLine: 'always', prev: '*', next: ['for', 'while', 'if'] },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: 'return' },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    files: ['__tests__/**/*.{ts,tsx}'],
    rules: {
      'no-console': 'off',
    },
  },
);
