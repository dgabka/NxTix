module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'turbo',
    'prettier',
  ],
  rules: {
    'prefer-const': 'error',
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
