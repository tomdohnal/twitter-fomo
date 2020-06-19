module.exports = {
  plugins: ['react', 'jsx-a11y', 'jest', 'react-hooks', '@typescript-eslint'],
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    camelcase: 'off',
    'no-shadow': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
  },
};
