module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./backend/jest-setup.ts', 'jest-date-mock'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};
