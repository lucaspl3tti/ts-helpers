import eslintJs from '@eslint/js';
import eslintTs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/**/*',
      '**/dist/**/*',
    ],
  },

  eslintJs.configs.recommended,

  {
    files: ['**/*.{ts,js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintTs,
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'curly': ['error', 'all'],
      'indent': ['warn', 2, {
        'SwitchCase': 1,
      }],
      'linebreak-style': ['error', 'unix'],
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      'max-len': ['error', { code: 100 }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
      'one-var': ['error', 'never'],
      'prefer-const': ['error', {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      }],
      'prefer-destructuring': ['error', { object: true, array: false }],
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'id-length': ['error', {
        min: 3,
        properties: 'never',
      }],
      'semi': ['error', 'always'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': ['interface', 'typeAlias', 'class'],
          'format': ['PascalCase'],
        },
        {
          'selector': ['method', 'function', 'variable', 'parameter'],
          'format': ['camelCase'],
        },
      ],
    },
  },

  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
