module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // is declared but its value is never read.
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
