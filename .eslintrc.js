module.exports = {
    plugins: [
        'react',
        'jsx-a11y',
        'import',
        'jest',
        'react-hooks',
        'plugin:@typescript-eslint/recommended',
    ],
    extends: [
        'airbnb',
        'plugin:jest/recommended',
        'prettier',
        'prettier/react',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        'no-console': 'error',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': ['error', { allowShortCircuit: true }],
    },
};
