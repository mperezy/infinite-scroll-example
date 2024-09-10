import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      // FGL "indent": ["error", 2],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      //    "quotes": ["error", "single"],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'linebreak-style': ['error', 'unix'],
      'max-len': [
        'error',
        {
          code: 100,
          ignoreComments: true,
        },
      ],
      'react-hooks/exhaustive-deps': 'warn',
      semi: ['error', 'always'],
    },
  },
);
