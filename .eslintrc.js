module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  plugins: [
    'json',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
