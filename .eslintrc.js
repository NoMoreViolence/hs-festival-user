module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/prefer-stateless-function': 0,
    'react/no-access-state-in-setstate': 0,
    'react/destructuring-assignment': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-filename-extension': 0,
    'max-len': [2, 130, 2],
    'no-param-reassign': 0,
  },
};
