module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['jest-date-mock'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
};
