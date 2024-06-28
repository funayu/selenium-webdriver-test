const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  prettier,
  {
    ignores: ['node_modules/**'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        require: 'readonly',
        console: 'readonly',
        Key: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dir: 'readonly,',
      },
    },
    rules: {
      // 必要に応じてルールを追加
    },
  },
];
