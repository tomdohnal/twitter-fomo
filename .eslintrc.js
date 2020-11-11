module.exports = {
  plugins: ['react', 'jsx-a11y', 'jest', 'react-hooks', '@typescript-eslint'],
  extends: [
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    camelcase: 'off',
    'no-shadow': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/prop-types': 'off',
    'react/jsx-key': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'off',
    'no-nested-ternary': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-478389548
    '@typescript-eslint/no-for-in-array': 'off',
    '@typescript-eslint/no-unnecessary-qualifier': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
