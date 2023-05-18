module.exports = {
  root: true,

  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier',
  ],

  env: {
    es6: true,
    node: true,
    browser: true,
  },

  parserOptions: {
    parser: '@babel/eslint-parser',
  },

  plugins: ['vue'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier',
  ],

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
