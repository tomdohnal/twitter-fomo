module.exports = {
    plugins: ['react', 'jsx-a11y', 'import', 'jest', 'react-hooks'],
    extends: [
        'airbnb',
        'plugin:jest/recommended',
        'prettier',
        'prettier/react',
        'plugin:react-hooks/recommended',
    ],
    parser: 'babel-eslint',
    rules: {},
}
